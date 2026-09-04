import sharp from 'sharp';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const OUTPUT_DIR = resolve(process.cwd(), 'public', 'images', 'guides');

const articles = [
  { slug: 'cold-email-templates-for-accounting-firms', prompt: 'Professional business team reviewing cold email templates on laptop screen, modern office setting, accounting documents visible, clean minimalist style, blue and white color scheme' },
  { slug: 'linkedin-lead-generation-for-cybersecurity-companies', prompt: 'Cybersecurity professional analyzing LinkedIn profile data on multiple monitors, dark modern office, blue digital security graphics, professional tech aesthetic' },
  { slug: 'referral-system-for-consulting-firms', prompt: 'Business professionals shaking hands in modern conference room, referral partnership concept, warm professional lighting, corporate networking scene' },
  { slug: 'apollo-for-architecture-firms', prompt: 'Architecture firm team reviewing building designs and project plans, modern studio with blueprints, clean professional workspace, blue accent colors' },
  { slug: 'outbound-sales-for-government-contractors', prompt: 'Professional team reviewing government contract documents, American flag in background, formal office setting, compliance and security concept' },
  { slug: 'inbound-lead-generation-for-b2b-saas', prompt: 'Marketing team analyzing inbound lead metrics on large dashboard screen, modern SaaS office, growth charts and analytics visible, blue and purple accents' },
  { slug: 'can-spam-compliance-checklist-for-cold-email', prompt: 'Compliance checklist document on tablet screen, legal documents and email icons, professional business setting, blue and green trust colors' },
  { slug: 'multi-channel-outreach-for-manufacturing', prompt: 'Manufacturing sales team coordinating multi-channel outreach, factory background, digital communication icons overlay, professional industrial setting' },
  { slug: 'customer-retention-strategies-for-b2b-agencies', prompt: 'Customer success team celebrating client retention metrics, modern agency office, happiness and growth charts, warm professional atmosphere' },
  { slug: 'cold-calling-scripts-for-insurance-agents', prompt: 'Insurance agent making professional phone call, modern office with client data on screen, friendly business communication, warm professional lighting' }
];

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function createGeneration(prompt) {
  const response = await fetch('https://cloud.leonardo.ai/api/rest/v2/generations', {
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
        width: 1400,
        height: 784,
        quantity: 1,
        style_ids: ['111dc692-d470-4eec-b791-3475abac4c46'],
        prompt_enhance: 'OFF'
      },
      public: false
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Create generation failed: ${response.status} - ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const generationId = data.generate?.generationId;
  if (!generationId) {
    throw new Error(`No generation ID returned: ${JSON.stringify(data)}`);
  }
  return generationId;
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

async function generateImage(prompt, slug) {
  console.log(`Generating: ${slug}`);

  const generationId = await createGeneration(prompt);
  console.log(`  Generation ID: ${generationId}`);

  const imageUrl = await pollGeneration(generationId);
  console.log(`  Image URL: ${imageUrl}`);

  // Download image
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Save hero image
  const heroPath = resolve(OUTPUT_DIR, `${slug}-1.jpg`);
  await sharp(imageBuffer).jpeg({ quality: 85 }).toFile(heroPath);
  console.log(`  Saved: ${heroPath}`);

  // Create second image with text overlay
  const secondBuffer = await sharp(imageBuffer)
    .resize(1400, 780)
    .composite([{
      input: Buffer.from(`<svg width="1400" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="1400" height="100" fill="white" opacity="0.9"/>
        <text x="700" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1e293b">Step-by-Step Strategy</text>
      </svg>`),
      top: 680,
      left: 0
    }])
    .jpeg({ quality: 85 })
    .toBuffer();

  const secondPath = resolve(OUTPUT_DIR, `${slug}-2.jpg`);
  writeFileSync(secondPath, secondBuffer);
  console.log(`  Saved: ${secondPath}`);

  return true;
}

async function main() {
  console.log('=== Leonardo.ai Image Generation ===\n');
  console.log(`Generating ${articles.length} article images...\n`);

  let success = 0;
  let failed = 0;

  for (const article of articles) {
    try {
      await generateImage(article.prompt, article.slug);
      success++;
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
      failed++;
    }

    // Rate limiting
    await delay(2000);
  }

  console.log(`\n---`);
  console.log(`Done: ${success}/${articles.length} success, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
