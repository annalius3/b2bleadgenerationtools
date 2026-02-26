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
fs.mkdirSync(outputDir, { recursive: true });

const source = fs.readFileSync(contentPath, 'utf8');
const guidesSectionMatch = source.match(/export const guides:\s*Guide\[\]\s*=\s*\[([\s\S]*?)\n\];/);
if (!guidesSectionMatch) {
  throw new Error('Guides section not found in content.ts');
}

const guides = [...guidesSectionMatch[1].matchAll(/slug:\s*'([^']+)'\s*,[\s\S]*?title:\s*'([^']+)'/g)].map((m) => ({
  slug: m[1],
  title: m[2]
}));

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
    presetStyle: 'DYNAMIC',
    guidance_scale: 8,
    highContrast: false
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
  for (let i = 0; i < 45; i += 1) {
    const data = await api(`${API_BASE}/generations/${generationId}`, { method: 'GET' });
    const generation = data?.generations_by_pk ?? data?.generation_by_pk;
    const status = generation?.status ?? generation?.state ?? 'UNKNOWN';
    const img = generation?.generated_images?.[0]?.url;
    if (img) {
      return img;
    }
    if (status === 'FAILED') {
      throw new Error(`Generation failed: ${generationId}`);
    }
    await sleep(2500);
  }
  throw new Error(`Timeout waiting for generation ${generationId}`);
};

const download = async (url, filePath) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status}`);
  }
  const bytes = await res.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(bytes));
};

const makePrompt = (title, index) =>
  index === 1
    ? `Modern B2B SaaS editorial hero image for article: "${title}". Clean dashboard scene, blue-white palette, data-driven, premium, realistic, no text, no logos, high detail.`
    : `Modern B2B outbound strategy visualization for article: "${title}". Team planning campaign metrics, charts and pipeline dashboard, professional, blue-white palette, realistic style, no text, no logos.`;

let completed = 0;
for (const guide of guides) {
  for (const index of [1, 2]) {
    const outPath = path.join(outputDir, `${guide.slug}-${index}.jpg`);
    if (fs.existsSync(outPath)) {
      completed += 1;
      console.log(`SKIP ${guide.slug}-${index}: already exists`);
      continue;
    }
    const prompt = makePrompt(guide.title, index);
    try {
      const generationId = await createGeneration(prompt);
      const url = await waitForImage(generationId);
      await download(url, outPath);
      completed += 1;
      console.log(`OK ${guide.slug}-${index}: ${url}`);
    } catch (error) {
      console.error(`FAIL ${guide.slug}-${index}:`, error instanceof Error ? error.message : error);
    }
    await sleep(1200);
  }
}

console.log(`Completed ${completed}/${guides.length * 2} image downloads`);
