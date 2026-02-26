import fs from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://cloud.leonardo.ai/api/rest/v1';
const MODEL_ID = 'b2614463-296c-462a-9586-aafdb8f00e36';
const KEY = process.env.LEONARDO_API_KEY;

if (!KEY) {
  throw new Error('LEONARDO_API_KEY is required');
}

const outputDir = path.join(process.cwd(), 'public', 'images', 'menu');
fs.mkdirSync(outputDir, { recursive: true });

const prompts = [
  {
    name: 'find-clients.jpg',
    prompt:
      'Modern B2B sales team researching target clients in office, people reviewing company profiles on screens, realistic business photo style, blue-white palette, no text, no logos'
  },
  {
    name: 'outreach.jpg',
    prompt:
      'Business development team preparing cold outreach campaign, people discussing email strategy around laptop, realistic professional photo, modern SaaS mood, no text, no logos'
  },
  {
    name: 'sales-pipeline.jpg',
    prompt:
      'Sales manager and team analyzing pipeline dashboard and revenue charts, realistic office environment with people, premium B2B look, no text, no logos'
  },
  {
    name: 'by-industry.jpg',
    prompt:
      'Diverse business professionals from different industries in strategy workshop, people collaborating around table, realistic corporate scene, no text, no logos'
  },
  {
    name: 'for-startups.jpg',
    prompt:
      'Startup founders in coworking space planning first customer acquisition, people with laptop and whiteboard, realistic modern photo, no text, no logos'
  },
  {
    name: 'guides.jpg',
    prompt:
      'Marketing and sales team learning from playbooks and tutorials, people reviewing documents and dashboard, realistic B2B training session, no text, no logos'
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
  try {
    const generationId = await createGeneration(item.prompt);
    const imageUrl = await waitForImage(generationId);
    const outPath = path.join(outputDir, item.name);
    await download(imageUrl, outPath);
    console.log(`OK ${item.name}: ${imageUrl}`);
  } catch (error) {
    console.error(`FAIL ${item.name}:`, error instanceof Error ? error.message : error);
  }
  await sleep(1200);
}

console.log('Menu images generation finished');
