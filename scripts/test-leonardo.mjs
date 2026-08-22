import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const testGuides = [
  {
    slug: 'what-is-apollo-io',
    title: 'What Is Apollo.io?',
    prompts: [
      'Professional B2B SaaS dashboard showing Apollo.io interface with lead generation tools, contact database, and email sequences, clean modern design, blue and white color scheme, business software screenshot',
      'Business team reviewing Apollo.io analytics dashboard on large monitor, modern office setting, professional atmosphere, data visualization, clean minimal design'
    ]
  }
];

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function createGeneration(prompt) {
  const response = await fetch(LEONARDO_API_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'authorization': `Bearer ${LEONARDO_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'flux-schnell',
      parameters: {
        prompt,
        width: 1024,
        height: 1024,
        quantity: 1,
        style_ids: ['111dc692-d470-4eec-b791-3475abac4c46'],
        prompt_enhance: 'OFF'
      },
      public: false
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Create generation failed: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  console.log('  API response:', JSON.stringify(data, null, 2));
  return data.generate?.generationId || data.generationId || data.id;
}

async function pollGeneration(generationId, maxAttempts = 60) {
  const pollUrl = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetch(pollUrl, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${LEONARDO_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Poll failed: ${response.status} - ${errText.slice(0, 200)}`);
    }

    const data = await response.json();
    const gen = data.generations_by_pk;
    const status = gen?.status;
    const imageUrl = gen?.generated_images?.[0]?.url;

    if (status === 'COMPLETE' && imageUrl) {
      return imageUrl;
    }

    if (status === 'FAILED') {
      throw new Error('Generation failed');
    }

    await delay(2000);
  }

  throw new Error('Polling timeout');
}

async function addTextOverlay(inputPath, outputPath, title) {
  const width = 1024;
  const height = 1024;
  const bannerHeight = 80;

  const textSvg = `
    <svg width="${width}" height="${bannerHeight}">
      <rect width="${width}" height="${bannerHeight}" fill="white"/>
      <text x="${width / 2}" y="50" text-anchor="middle" 
            font-family="Arial, sans-serif" font-size="28" font-weight="bold" 
            fill="#1a1a1a">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    </svg>
  `;

  const bannerBuffer = Buffer.from(textSvg);

  await sharp(inputPath)
    .resize(width, height - bannerHeight)
    .extend({
      top: bannerHeight,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .composite([{
      input: bannerBuffer,
      top: 0,
      left: 0
    }])
    .jpeg({ quality: 85 })
    .toFile(outputPath);
}

async function main() {
  console.log('=== Leonardo.ai Image Generation Test ===');
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Test guide: ${testGuides[0].slug}`);
  console.log('---');

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const guide of testGuides) {
    for (let i = 0; i < guide.prompts.length; i++) {
      const imageNum = i + 1;
      const filename = `${guide.slug}-${imageNum}.jpg`;
      const filepath = resolve(OUTPUT_DIR, filename);

      console.log(`\n[${imageNum}/2] Creating generation for: ${filename}`);
      console.log(`  Prompt: ${guide.prompts[i].slice(0, 80)}...`);

      try {
        const generationId = await createGeneration(guide.prompts[i]);
        console.log(`  Generation ID: ${generationId}`);

        console.log('  Polling for completion...');
        const imageUrl = await pollGeneration(generationId);
        console.log(`  Image URL: ${imageUrl}`);

        console.log('  Downloading image...');
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        const tempPath = resolve(OUTPUT_DIR, `${guide.slug}-${imageNum}-temp.jpg`);
        writeFileSync(tempPath, imageBuffer);
        console.log(`  Downloaded: ${(imageBuffer.length / 1024).toFixed(0)}KB`);

        console.log('  Adding text overlay...');
        await addTextOverlay(tempPath, filepath, guide.title);

        const { size } = await import('fs').then(f => f.statSync(filepath));
        console.log(`  Final: ${(size / 1024).toFixed(0)}KB`);

        // Cleanup temp
        const fsp = await import('fs/promises');
        await fsp.unlink(tempPath);

        console.log(`  ✅ ${filename} complete`);
      } catch (err) {
        console.error(`  ❌ ${filename} failed: ${err.message}`);
      }

      await delay(2000);
    }
  }

  console.log('\n---');
  console.log('Test complete! Check the generated images.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
