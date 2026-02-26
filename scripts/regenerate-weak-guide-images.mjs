import fs from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://cloud.leonardo.ai/api/rest/v1';
const MODEL_ID = 'b2614463-296c-462a-9586-aafdb8f00e36'; // Leonardo Phoenix
const KEY = process.env.LEONARDO_API_KEY;

if (!KEY) {
  throw new Error('LEONARDO_API_KEY is required');
}

const projectRoot = process.cwd();
const contentPath = path.join(projectRoot, 'src', 'lib', 'content.ts');
const outputDir = path.join(projectRoot, 'public', 'images', 'guides');
const maxBytes = Number(process.env.MAX_BYTES || 120000);

const source = fs.readFileSync(contentPath, 'utf8');
const guidesSectionMatch = source.match(/export const guides:\s*Guide\[\]\s*=\s*\[([\s\S]*?)\n\];/);
if (!guidesSectionMatch) {
  throw new Error('Guides section not found in content.ts');
}

const titleBySlug = new Map(
  [...guidesSectionMatch[1].matchAll(/slug:\s*'([^']+)'\s*,[\s\S]*?title:\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
);

const targets = fs
  .readdirSync(outputDir)
  .filter((name) => name.endsWith('-2.jpg'))
  .map((name) => {
    const filePath = path.join(outputDir, name);
    const size = fs.statSync(filePath).size;
    const slug = name.replace(/-2\.jpg$/, '');
    return { name, filePath, size, slug, title: titleBySlug.get(slug) };
  })
  .filter((item) => item.size <= maxBytes && item.title);

if (!targets.length) {
  console.log(`No weak guide images found (<= ${maxBytes} bytes).`);
  process.exit(0);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(json)}`);
  }
  return json;
};

const createGeneration = async (prompt) => {
  const payload = {
    alchemy: false,
    height: 768,
    width: 1024,
    modelId: MODEL_ID,
    num_images: 1,
    prompt,
    negative_prompt:
      'flat gradient, empty background, abstract-only scene, blurry, low detail, duplicate face, text, logo, watermark, extra fingers',
    presetStyle: 'CINEMATIC',
    guidance_scale: 10
  };

  const data = await api(`${API_BASE}/generations`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const generationId = data?.sdGenerationJob?.generationId ?? data?.generationId;
  if (!generationId) {
    throw new Error(`No generationId in response: ${JSON.stringify(data)}`);
  }
  return generationId;
};

const waitForImage = async (generationId) => {
  for (let i = 0; i < 50; i += 1) {
    const data = await api(`${API_BASE}/generations/${generationId}`, { method: 'GET' });
    const generation = data?.generations_by_pk ?? data?.generation_by_pk;
    const status = generation?.status ?? generation?.state ?? 'UNKNOWN';
    const img = generation?.generated_images?.[0]?.url;
    if (img) return img;
    if (status === 'FAILED') throw new Error(`Generation failed: ${generationId}`);
    await sleep(2500);
  }
  throw new Error(`Timeout waiting for generation ${generationId}`);
};

const download = async (url, filePath) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);
  const bytes = await res.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(bytes));
};

const makePrompt = (title) =>
  `Photorealistic B2B business scene for article "${title}", diverse team of professionals in modern office, laptops with CRM dashboard charts, active discussion, sales strategy meeting, natural lighting, high detail, premium SaaS editorial style, people-focused, no text, no logo`;

let ok = 0;
for (const target of targets) {
  try {
    const generationId = await createGeneration(makePrompt(target.title));
    const url = await waitForImage(generationId);
    await download(url, target.filePath);
    const newSize = fs.statSync(target.filePath).size;
    ok += 1;
    console.log(`OK ${target.name}: ${target.size} -> ${newSize}`);
  } catch (error) {
    console.error(`FAIL ${target.name}:`, error instanceof Error ? error.message : error);
  }
  await sleep(1200);
}

console.log(`Replaced ${ok}/${targets.length} weak images`);
