import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const articles = [
  { slug: 'b2b-lead-generation-for-distributors', prompts: ['Wholesale distribution warehouse with forklift moving palletized goods, logistics manager checking inventory on tablet, bright modern facility, professional photography, 4K', 'Distribution company sales team reviewing wholesale account pipeline and regional sales map on screen, modern office, professional photography, 4K'] },
  { slug: 'lead-generation-for-security-companies', prompts: ['Security company operations center with guard scheduling dashboard on multiple monitors, professional dispatch office, 4K', 'Security services company owner reviewing commercial client contracts and patrol routes on laptop, modern office, 4K'] },
  { slug: 'cold-email-to-cfos', prompts: ['CFO reviewing financial dashboard with budget and ROI charts on screen in executive office, professional corporate setting, 4K', 'Business professional drafting executive outreach email on laptop with financial reports on desk, modern office, 4K'] },
  { slug: 'how-many-cold-emails-per-day', prompts: ['Email marketing dashboard showing daily send volume and deliverability metrics on screen, modern office desk setup, 4K', 'Sales professional managing multiple email inbox folders for cold outreach on laptop, organized workspace, 4K'] },
  { slug: 'what-is-a-good-cold-email-reply-rate', prompts: ['Sales analytics dashboard showing email reply rate statistics and campaign performance charts on screen, 4K', 'Sales team reviewing cold email campaign results and reply metrics on large monitor in modern office, 4K'] },
  { slug: 'apollo-vs-lusha', prompts: ['Sales professional comparing two B2B data platform dashboards side by side on dual monitors, modern office, 4K', 'Business analyst reviewing contact data accuracy comparison charts on laptop screen, clean workspace, 4K'] },
  { slug: 'apollo-vs-rocketreach', prompts: ['Sales operations manager evaluating contact lookup tools on computer screen with data tables, modern office, 4K', 'Business team comparing B2B contact database pricing plans on screen with charts, professional setting, 4K'] },
  { slug: 'how-to-calculate-pipeline-coverage', prompts: ['Sales manager calculating pipeline coverage ratio with calculator and CRM dashboard on screen, modern office, 4K', 'Revenue operations team reviewing pipeline coverage charts and quota tracking on multiple monitors, modern office, 4K'] },
  { slug: 'b2b-sales-cycle-length-by-industry', prompts: ['Business analyst reviewing sales cycle timeline charts across industries on screen, professional office setting, 4K', 'Sales director examining deal progression timeline dashboard with calendar planning on screen, modern office, 4K'] },
  { slug: 'sales-pipeline-vs-sales-funnel', prompts: ['Sales trainer explaining pipeline and funnel diagrams on whiteboard to team in modern office, 4K', 'Sales manager reviewing deal stages pipeline board and conversion funnel chart on screen, modern workspace, 4K'] }
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateImage(prompt) {
  const response = await fetch(LEONARDO_API_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${LEONARDO_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'flux-schnell',
      parameters: { prompt, width: 1024, height: 1024, quantity: 1, style_ids: ['111dc692-d470-4eec-b791-3475abac4c46'], prompt_enhance: 'OFF' },
      public: false
    }),
  });
  if (!response.ok) throw new Error(`API error: ${response.status} - ${await response.text()}`);
  const data = await response.json();
  const generationId = data.generate?.generationId || data.generationId;
  if (!generationId) throw new Error('No generationId returned');
  const pollUrl = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
  for (let i = 0; i < 60; i++) {
    await delay(2000);
    const pollRes = await fetch(pollUrl, { headers: { accept: 'application/json', authorization: `Bearer ${LEONARDO_API_KEY}` } });
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
  console.log(`=== Batch5 Images: ${articles.length} articles x2 ===\n`);
  let success = 0, failed = 0;
  for (const article of articles) {
    for (let i = 0; i < 2; i++) {
      const filename = `${article.slug}-${i + 1}.jpg`;
      const filepath = resolve(OUTPUT_DIR, filename);
      if (existsSync(filepath)) { success++; continue; }
      try {
        const url = await generateImage(article.prompts[i]);
        const res = await fetch(url);
        const inputBuffer = Buffer.from(await res.arrayBuffer());
        const outputBuffer = await addTextOverlay(inputBuffer, article.slug.replace(/-/g, ' '));
        writeFileSync(filepath, outputBuffer);
        console.log(`OK ${filename}`);
        success++;
      } catch (err) {
        console.error(`FAIL ${filename} — ${err.message}`);
        failed++;
      }
      if (i === 0) await delay(1000);
    }
    await delay(1500);
  }
  console.log(`\nDone: ${success}/${articles.length * 2}, failed: ${failed}`);
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
