import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const articles = [
  {
    slug: 'apollo-io-credits-explained',
    prompts: [
      'Sales operations manager reviewing B2B contact database usage and credit consumption dashboard on laptop, modern office, professional photography, 4K',
      'Marketing team planning prospect list budget with spreadsheets and CRM analytics on screen, bright office, professional photography, 4K'
    ]
  },
  {
    slug: 'apollo-io-vs-outreach',
    prompts: [
      'Two sales engagement software dashboards compared side by side on dual monitors, sales ops manager evaluating, modern office, 4K',
      'B2B sales team reviewing sequence performance and email analytics on large screen, professional office, 4K'
    ]
  },
  {
    slug: 'apollo-io-alternatives',
    prompts: [
      'Business team comparing B2B lead database tools on a large screen with pricing tables, modern office, 4K',
      'Sales operations analyst testing multiple prospecting platforms on laptop with notes and charts, clean desk, 4K'
    ]
  },
  {
    slug: 'spf-dkim-dmarc-cold-email',
    prompts: [
      'Email deliverability specialist configuring DNS records on laptop with authentication checklist on screen, modern office, 4K',
      'IT administrator reviewing email authentication and domain security settings in server dashboard, professional workspace, 4K'
    ]
  },
  {
    slug: 'cold-email-bounce-rate-benchmarks',
    prompts: [
      'Sales analyst reviewing cold email bounce rate and deliverability metrics dashboard on monitor, modern office, 4K',
      'Marketing team examining email list quality report with bounce charts and verification status, bright office, 4K'
    ]
  },
  {
    slug: 'cold-email-to-ceos',
    prompts: [
      'Executive assistant reviewing a short personalized email to a CEO on laptop in modern office, professional, 4K',
      'Business founder reading a concise cold email on laptop with calendar and company research notes, 4K'
    ]
  },
  {
    slug: 'ai-sdr-vs-human-sdr',
    prompts: [
      'AI sales assistant interface working alongside a human SDR at a dual monitor workstation, modern office, 4K',
      'Sales team comparing automated outreach dashboard with human-written email performance reports, 4K'
    ]
  },
  {
    slug: 'meddpicc-sales-methodology',
    prompts: [
      'Sales trainer explaining MEDDPICC deal qualification framework on whiteboard to B2B team, modern office, 4K',
      'Account executive reviewing enterprise deal scorecard with stakeholders and metrics on screen, 4K'
    ]
  },
  {
    slug: 'discovery-call-questions-b2b',
    prompts: [
      'B2B sales rep on a discovery video call taking notes with a qualification checklist on screen, modern office, 4K',
      'Sales manager coaching a rep on discovery call structure with notes and CRM open on laptop, 4K'
    ]
  },
  {
    slug: 'mutual-action-plan-template',
    prompts: [
      'Sales team reviewing a mutual action plan timeline with milestones on a large monitor, professional office, 4K',
      'Account executive and client reviewing a deal timeline and responsibilities on a laptop during a video call, 4K'
    ]
  }
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateImage(prompt) {
  const response = await fetch(LEONARDO_API_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${LEONARDO_API_KEY}`,
      'content-type': 'application/json'
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
    })
  });
  if (!response.ok) throw new Error(`API error: ${response.status} - ${await response.text()}`);
  const data = await response.json();
  const generationId = data.generate?.generationId || data.generationId;
  if (!generationId) throw new Error('No generationId returned');

  const pollUrl = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
  for (let i = 0; i < 60; i++) {
    await delay(2000);
    const pollRes = await fetch(pollUrl, {
      headers: { accept: 'application/json', authorization: `Bearer ${LEONARDO_API_KEY}` }
    });
    if (!pollRes.ok) continue;
    const pollData = await pollRes.json();
    const gen = pollData?.generations_by_pk;
    if (gen?.status === 'COMPLETE' && gen?.generated_images?.[0]?.url) return gen.generated_images[0].url;
    if (gen?.status === 'FAILED') throw new Error('Generation failed');
  }
  throw new Error('Timeout waiting for image');
}

async function addTextOverlay(inputBuffer, title) {
  const width = 1024;
  const bannerHeight = 80;
  const fontSize = title.length > 34 ? 18 : title.length > 24 ? 21 : 24;
  const svgBanner = `<svg width="${width}" height="${bannerHeight}">
    <rect width="${width}" height="${bannerHeight}" fill="white"/>
    <text x="${width / 2}" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#1a1a1a">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
  </svg>`;
  return sharp(inputBuffer)
    .resize(width, width - bannerHeight)
    .extend({ top: bannerHeight, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .composite([{ input: Buffer.from(svgBanner), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`=== Batch6 Images: ${articles.length} articles x2 ===\n`);
  let success = 0;
  let failed = 0;

  for (const article of articles) {
    for (let i = 0; i < 2; i++) {
      const filename = `${article.slug}-${i + 1}.jpg`;
      const filepath = resolve(OUTPUT_DIR, filename);
      if (existsSync(filepath)) {
        success++;
        continue;
      }
      try {
        const url = await generateImage(article.prompts[i]);
        const res = await fetch(url);
        const inputBuffer = Buffer.from(await res.arrayBuffer());
        const outputBuffer = await addTextOverlay(inputBuffer, article.slug.replace(/-/g, ' '));
        writeFileSync(filepath, outputBuffer);
        console.log(`OK ${filename}`);
        success++;
      } catch (err) {
        console.error(`FAIL ${filename} - ${err.message}`);
        failed++;
      }
      if (i === 0) await delay(1000);
    }
    await delay(1500);
  }

  console.log(`\nDone: ${success}/${articles.length * 2}, failed: ${failed}`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
