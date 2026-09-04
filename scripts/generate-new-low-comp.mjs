import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const articles = [
  {
    slug: 'find-companies-using-competitor-software-apollo',
    prompts: [
      'Competitor displacement strategy concept with Apollo.io tech stack filters showing company logos and data analysis, modern B2B sales dashboard, blue white color scheme, 4K quality',
      'Business professional analyzing competitor software usage data on multiple monitors, modern office setting, strategic analysis concept, clean design, 4K quality'
    ]
  },
  {
    slug: 'apollo-intent-signals-find-buying-companies',
    prompts: [
      'Intent signals dashboard showing real-time buying behavior data with graphs and company indicators, Apollo.io style interface, modern B2B analytics, blue tones, 4K quality',
      'Sales team reviewing intent signal data on large screen, identifying companies ready to buy, modern conference room, data-driven decision making, 4K quality'
    ]
  },
  {
    slug: 'ai-personalized-cold-emails-at-scale',
    prompts: [
      'AI-powered email personalization concept with ChatGPT interface generating customized cold emails, modern SaaS workflow, blue and purple tones, 4K quality',
      'Sales professional using AI tools to write personalized outreach emails at scale, modern workspace with multiple screens, productivity concept, 4K quality'
    ]
  },
  {
    slug: 'cold-email-domain-warmup-strategy',
    prompts: [
      'Email domain warm-up strategy concept with deliverability metrics and sender reputation dashboard, modern email marketing interface, green indicators, 4K quality',
      'Email infrastructure setup concept with SPF DKIM DMARC records and warm-up schedule calendar, technical illustration, clean modern design, 4K quality'
    ]
  },
  {
    slug: 'b2b-objection-handling-framework',
    prompts: [
      'LAER framework concept for handling sales objections with Listen Acknowledge Explore Respond steps, modern infographic design, blue and white, 4K quality',
      'Sales professional confidently handling objections during a meeting, modern office setting, professional body language, clean corporate style, 4K quality'
    ]
  },
  {
    slug: 'b2b-proposal-template-that-closes',
    prompts: [
      'B2B proposal template concept with three pricing options Good Better Best, modern document design, professional business proposal on tablet screen, 4K quality',
      'Business proposal signing concept with e-signature on digital document, modern office desk with laptop and documents, closing deals concept, 4K quality'
    ]
  },
  {
    slug: 'hire-first-sdr-startup',
    prompts: [
      'Startup hiring concept with first SDR Business Development Representative job posting on screen, modern HR recruitment, young professional, 4K quality',
      'SDR ramp program timeline concept with 60-day onboarding schedule, modern startup workspace, team training, clean infographic style, 4K quality'
    ]
  },
  {
    slug: 'product-led-growth-outbound-hybrid',
    prompts: [
      'PLG and outbound hybrid strategy concept with product-led growth funnel combined with outbound sales arrows, modern SaaS growth diagram, blue and green, 4K quality',
      'Product-qualified leads dashboard showing free trial users converting to paid customers through outbound outreach, modern analytics interface, 4K quality'
    ]
  },
  {
    slug: 'b2b-sales-playbook-template',
    prompts: [
      'Sales playbook concept with 8 chapters covering prospecting outreach qualification demo proposal close objections, modern document layout, blue tones, 4K quality',
      'Sales team reviewing playbook documentation together in modern conference room, consistent process execution, professional corporate setting, 4K quality'
    ]
  },
  {
    slug: 'apollo-vs-seamless-ai-comparison',
    prompts: [
      'Apollo.io vs Seamless.AI comparison concept with two platform interfaces side by side, B2B data platform evaluation, modern SaaS comparison, 4K quality',
      'Data accuracy comparison concept between two B2B contact data providers, modern analytics dashboard, feature comparison chart, clean design, 4K quality'
    ]
  }
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateImage(prompt) {
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
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const generationId = data.generate?.generationId || data.generationId;
  if (!generationId) throw new Error('No generationId returned');

  const pollUrl = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
  for (let i = 0; i < 60; i++) {
    await delay(2000);
    const pollRes = await fetch(pollUrl, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${LEONARDO_API_KEY}`,
      },
    });
    if (!pollRes.ok) continue;
    const pollData = await pollRes.json();
    const gen = pollData?.generations_by_pk;
    const status = gen?.status;
    const imageUrl = gen?.generated_images?.[0]?.url;
    if (status === 'COMPLETE' && imageUrl) {
      return imageUrl;
    }
    if (status === 'FAILED') {
      throw new Error('Generation failed');
    }
  }
  throw new Error('Timeout waiting for image');
}

async function addTextOverlay(inputBuffer, title) {
  const width = 1024;
  const bannerHeight = 80;

  const svgBanner = `
    <svg width="${width}" height="${bannerHeight}">
      <rect width="${width}" height="${bannerHeight}" fill="white"/>
      <text x="${width / 2}" y="50" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="28" font-weight="bold"
        fill="#1a1a1a">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    </svg>`;

  return sharp(inputBuffer)
    .resize(width, width - bannerHeight)
    .extend({
      top: bannerHeight,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .composite([{ input: Buffer.from(svgBanner), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('=== Leonardo.ai Image Generation (Low Competition Articles) ===\n');
  console.log(`Generating ${articles.length * 2} images for ${articles.length} articles...\n`);

  let success = 0;
  let failed = 0;

  for (const article of articles) {
    for (let i = 0; i < 2; i++) {
      const filename = `${article.slug}-${i + 1}.jpg`;
      const filepath = resolve(OUTPUT_DIR, filename);

      if (existsSync(filepath)) {
        console.log(`SKIP ${filename} (exists)`);
        success++;
        continue;
      }

      try {
        console.log(`Generating: ${article.slug} (${i + 1}/2)`);
        const url = await generateImage(article.prompts[i]);
        const res = await fetch(url);
        const arrayBuf = await res.arrayBuffer();
        const inputBuffer = Buffer.from(arrayBuf);
        const outputBuffer = await addTextOverlay(inputBuffer, article.slug.replace(/-/g, ' '));
        writeFileSync(filepath, outputBuffer);
        console.log(`  Saved: ${filename}`);
        success++;
      } catch (err) {
        console.error(`  FAILED: ${filename} — ${err.message}`);
        failed++;
      }

      if (i === 0) await delay(1000);
    }
    await delay(2000);
  }

  console.log(`\n---\nDone: ${success}/${articles.length * 2} success, ${failed} failed`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
