import fs from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://cloud.leonardo.ai/api/rest/v1';
const MODEL_ID = 'b2614463-296c-462a-9586-aafdb8f00e36';
const KEY = process.env.LEONARDO_API_KEY;

if (!KEY) {
  throw new Error('LEONARDO_API_KEY is required');
}

const outputDir = path.join(process.cwd(), 'public', 'images', 'home');
fs.mkdirSync(outputDir, { recursive: true });

const prompts = [
  {
    name: 'hero-team.jpg',
    prompt:
      'Modern B2B sales team in a bright office reviewing outbound dashboard on laptop, professional business people, premium SaaS aesthetic, blue and white palette, realistic photography, no text, no logos'
  },
  {
    name: 'industry-business.jpg',
    prompt:
      'Business consultants and founders discussing growth strategy at office table, charts on screen, B2B meeting context, clean realistic style, premium lighting, no text, no logos'
  },
  {
    name: 'cta-founder.jpg',
    prompt:
      'Confident startup founder at workstation analyzing pipeline metrics, modern workspace, growth mindset, realistic professional portrait style, blue accent lighting, no text, no logos'
  }
];

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
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(data)}`);
  }
  return data;
};

const createGeneration = async (prompt) => {
  const data = await api(`${API_BASE}/generations`, {
    method: 'POST',
    body: JSON.stringify({
      alchemy: false,
      modelId: MODEL_ID,
      width: 1024,
      height: 768,
      num_images: 1,
      prompt,
      presetStyle: 'DYNAMIC'
    })
  });
  const generationId = data?.sdGenerationJob?.generationId ?? data?.generationId;
  if (!generationId) {
    throw new Error(`No generationId: ${JSON.stringify(data)}`);
  }
  return generationId;
};

const waitForImage = async (generationId) => {
  for (let i = 0; i < 45; i += 1) {
    const data = await api(`${API_BASE}/generations/${generationId}`, { method: 'GET' });
    const generation = data?.generations_by_pk ?? data?.generation_by_pk;
    const img = generation?.generated_images?.[0]?.url;
    if (img) {
      return img;
    }
    await sleep(2500);
  }
  throw new Error(`Timeout: ${generationId}`);
};

const download = async (url, filePath) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed ${res.status}`);
  }
  const bytes = await res.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(bytes));
};

for (const item of prompts) {
  const generationId = await createGeneration(item.prompt);
  const imageUrl = await waitForImage(generationId);
  const outPath = path.join(outputDir, item.name);
  await download(imageUrl, outPath);
  console.log(`OK ${item.name}: ${imageUrl}`);
}

console.log('Homepage images generated');
