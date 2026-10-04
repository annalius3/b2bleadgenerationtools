import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const articles = [
  { slug: 'apollo-vs-clay', prompts: ['Split screen comparison concept of two B2B sales software dashboards, one simple database interface and one complex automation workflow with connecting nodes, blue and white color scheme, modern SaaS design, 4K quality', 'Business analyst evaluating two software platforms side by side on dual monitors, decision making concept, modern office, clean professional photography, 4K quality'] },
  { slug: 'apollo-vs-cognism', prompts: ['Global B2B contact data comparison with Europe and North America maps and phone verification icons, modern data platform interface, blue tones, 4K quality', 'Sales operations manager comparing two data provider dashboards on screen, European office setting, professional photography, 4K quality'] },
  { slug: 'apollo-io-chrome-extension-guide', prompts: ['Browser extension overlay interface on a professional social network profile showing contact details panel, Chrome browser concept, blue accent colors, clean design, 4K quality', 'Salesperson prospecting on laptop with browser extension sidebar showing saved contacts list, modern workspace, professional photography, 4K quality'] },
  { slug: 'apollo-io-api-tutorial', prompts: ['Software developer integrating REST API with code editor showing JSON endpoints and authentication tokens, modern development environment, blue syntax highlighting, 4K quality', 'Engineer working on data pipeline integration across multiple screens with API documentation and CRM dashboard, modern tech office, 4K quality'] },
  { slug: 'apollo-sequences-vs-instantly', prompts: ['Email sequence automation flowchart with multiple steps and inbox rotation concept, cold email sending infrastructure visualization, blue and white scheme, 4K quality', 'Marketing operations professional managing email campaign sequence builder on screen, modern office, professional photography, 4K quality'] },
  { slug: 'how-to-build-an-email-list-legally', prompts: ['Email subscriber list growth concept with consent checkboxes and legal compliance icons, GDPR and CAN-SPAM shield symbols, clean modern design, 4K quality', 'Marketing team reviewing subscriber list growth analytics and email consent records on dashboard, modern office, 4K quality'] },
  { slug: 'b2b-lead-generation-checklist', prompts: ['Detailed checklist clipboard with checked items next to B2B lead generation funnel dashboard, organized planning concept, blue accents, 4K quality', 'Sales manager reviewing pre-launch campaign checklist on tablet with pipeline metrics on background screen, modern office, 4K quality'] },
  { slug: 'cold-email-deliverability-tools-compared', prompts: ['Email deliverability dashboard showing inbox placement, spam folder routing, SPF DKIM DMARC authentication records and sender reputation score, 4K quality', 'Email marketer analyzing inbox placement test results and domain reputation metrics on multiple monitors, modern office, 4K quality'] },
  { slug: 'apollo-vs-hunter-io', prompts: ['Email address finder interface with domain search results and verification confidence scores, contact lookup concept, blue and white design, 4K quality', 'Recruiter searching email addresses of candidates using web tool on laptop screen, modern workspace, professional photography, 4K quality'] },
  { slug: 'candidate-sourcing-with-apollo', prompts: ['Recruiter building candidate shortlist with filter panel showing skills, seniority and location criteria, talent sourcing dashboard concept, 4K quality', 'Talent acquisition specialist reviewing candidate profiles pipeline on screen with resume cards, modern HR office, professional photography, 4K quality'] }
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
  const svgBanner = `<svg width="${width}" height="${bannerHeight}">
    <rect width="${width}" height="${bannerHeight}" fill="white"/>
    <text x="${width / 2}" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1a1a1a">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
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
  console.log(`=== Batch 4 Images: ${articles.length} articles x2 ===\n`);
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
