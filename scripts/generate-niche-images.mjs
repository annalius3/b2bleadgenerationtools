import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const articles = [
  { slug: 'lead-generation-for-veterinary-clinics', prompts: ['Veterinary clinic reception with modern client booking dashboard on screen, friendly pet owner checking in, bright clean clinic interior, professional photography, 4K', 'Veterinary practice team reviewing client growth charts and appointment schedule on laptop, modern clinic office, warm lighting, 4K'] },
  { slug: 'how-dental-practices-get-new-patients', prompts: ['Modern dental practice reception with new patient welcome desk and booking screen, bright welcoming interior, professional photography, 4K', 'Dental office team reviewing patient growth statistics on tablet, modern clinic setting, clean design, 4K'] },
  { slug: 'outbound-sales-for-medical-device-companies', prompts: ['Medical device sales professional presenting surgical equipment to hospital committee, modern hospital meeting room, professional setting, 4K', 'Hospital procurement team evaluating medical device specifications on screen, clinical environment, clean modern design, 4K'] },
  { slug: 'how-property-managers-get-clients', prompts: ['Property manager reviewing apartment portfolio and owner contracts on multiple monitors, modern office, professional photography, 4K', 'Property management team discussing residential building portfolio with ownership documents, modern workspace, 4K'] },
  { slug: 'how-cleaning-companies-get-commercial-clients', prompts: ['Commercial cleaning crew working in modern office building at dawn, professional equipment, bright glass building interior, 4K', 'Facility manager reviewing cleaning contract proposals on laptop in office lobby, professional setting, 4K'] },
  { slug: 'how-landscaping-companies-get-clients', prompts: ['Professional landscaping team maintaining commercial office park grounds, manicured green landscape, sunny day, 4K', 'Landscaping company owner reviewing commercial contract on tablet at beautiful garden property, 4K'] },
  { slug: 'how-pest-control-companies-get-clients', prompts: ['Pest control technician inspecting commercial building with tablet checklist, professional uniform, modern facility, 4K', 'Pest control company owner reviewing annual service contracts at desk with inspection reports, 4K'] },
  { slug: 'outbound-for-freight-brokers', prompts: ['Freight broker coordinating shipments on logistics dashboard with trucks on highway visible through window, modern office, 4K', 'Logistics operations team reviewing shipping routes and carrier rates on large monitor, modern control room, 4K'] },
  { slug: 'lead-generation-for-event-management-companies', prompts: ['Corporate event production team planning conference stage setup with checklist on screen, modern venue, 4K', 'Event management company reviewing corporate event pipeline and budgets on laptop, stylish office, 4K'] },
  { slug: 'client-acquisition-for-translation-agencies', prompts: ['Localization agency team reviewing multilingual website content on screen with world map, modern office, 4K', 'Translation agency owner planning international market expansion strategy with language documents, 4K'] },
  { slug: 'cold-email-for-pr-agencies', prompts: ['PR agency team crafting media outreach emails on laptop with press coverage headlines on screen, modern office, 4K', 'Public relations professional reviewing press placement results dashboard, stylish agency workspace, 4K'] },
  { slug: 'outbound-for-executive-search-firms', prompts: ['Executive search consultant reviewing C-suite candidate profiles on multiple screens, premium office setting, 4K', 'Headhunter preparing leadership search mandate presentation in modern boardroom, professional atmosphere, 4K'] },
  { slug: 'lead-generation-for-corporate-training-companies', prompts: ['Corporate training company team designing leadership development program on screen, modern office, 4K', 'L and D director reviewing training ROI metrics and employee skill gap dashboard, professional setting, 4K'] },
  { slug: 'client-acquisition-for-fractional-executives', prompts: ['Fractional executive working with startup founder team in modern office, strategy session with whiteboard, 4K', 'Fractional CMO reviewing client pipeline and marketing strategy on laptop in co-working space, 4K'] },
  { slug: 'member-acquisition-for-coworking-spaces', prompts: ['Bright modern coworking space with startup teams collaborating, natural light, plants, professional photography, 4K', 'Coworking space manager reviewing corporate membership inquiries on tablet in stylish lounge, 4K'] },
  { slug: 'lead-generation-for-nonprofit-organizations', prompts: ['Nonprofit development team reviewing corporate partnership proposals and donor pipeline on screen, warm office, 4K', 'Nonprofit fundraising staff planning donor outreach strategy with impact reports on table, 4K'] },
  { slug: 'outbound-sales-for-biotech-startups', prompts: ['Biotech business development team reviewing pharma partnership pipeline in modern lab office, 4K', 'Scientist entrepreneur presenting molecular research data to pharmaceutical partner on screen, 4K'] },
  { slug: 'lead-generation-for-telecom-companies', prompts: ['Telecom sales team reviewing enterprise connectivity contracts and network dashboard, modern office, 4K', 'IT director evaluating business internet service proposals on screen with network maps, 4K'] },
  { slug: 'b2b-lead-generation-for-waste-management', prompts: ['Waste management company fleet of recycling trucks at modern facility, sustainability concept, 4K', 'Facility manager reviewing waste diversion reports and recycling contracts on laptop, green office, 4K'] },
  { slug: 'lead-generation-for-hr-tech-startups', prompts: ['HR technology sales team reviewing CHRO outreach pipeline on dashboard, modern startup office, 4K', 'People operations leader evaluating HR software demo on screen with employee onboarding flow, 4K'] },
  { slug: 'outbound-for-fintech-startups', prompts: ['Fintech sales professional presenting payment infrastructure security to CFO on screen, modern office, 4K', 'Finance team reviewing fintech platform compliance dashboard with encryption visuals, 4K'] },
  { slug: 'lead-generation-for-proptech-companies', prompts: ['PropTech startup team demonstrating property management software to real estate operator, modern office, 4K', 'Property operations manager reviewing proptech dashboard with building analytics on screen, 4K'] },
  { slug: 'lead-generation-for-construction-tech-startups', prompts: ['Construction technology team showing project management software on tablet at construction site office, 4K', 'General contractor reviewing RFI and project margin dashboard on screen, jobsite trailer office, 4K'] },
  { slug: 'client-acquisition-for-web-development-agencies', prompts: ['Web development agency team reviewing client project pipeline on multiple monitors, modern studio, 4K', 'Developer presenting e-commerce website redesign case study to client on screen, modern office, 4K'] },
  { slug: 'how-design-agencies-get-clients', prompts: ['UX design agency team reviewing product design case studies and user research findings on screen, 4K', 'Product designer presenting mobile app redesign with conversion metrics to stakeholder, modern office, 4K'] },
  { slug: 'outbound-for-peo-companies', prompts: ['PEO sales professional reviewing small business HR compliance pipeline on laptop, modern office, 4K', 'Founder of growing company reviewing payroll and benefits outsourcing proposal, startup office, 4K'] },
  { slug: 'cold-email-for-insurtech-companies', prompts: ['Insurtech sales team crafting outreach to insurance carrier CTO with digital transformation dashboard, 4K', 'Insurance technology professional reviewing claims automation software demo on screen, corporate office, 4K'] },
  { slug: 'outbound-for-supply-chain-tech', prompts: ['Supply chain technology team reviewing logistics visibility dashboard with global shipping routes, 4K', 'Logistics director evaluating supply chain software pilot results on screen in operations center, 4K'] },
  { slug: 'cold-email-for-commercial-real-estate-brokers', prompts: ['Commercial real estate broker reviewing market intelligence and investor email outreach on screen, 4K', 'CRE professional analyzing industrial property cap rate charts on multiple monitors, modern office, 4K'] },
  { slug: 'fundraising-outreach-for-nonprofits', prompts: ['Nonprofit fundraiser drafting corporate partnership proposal with CSR strategy on screen, warm office, 4K', 'Development director reviewing employee engagement program deck for corporate sponsor, modern workspace, 4K'] }
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
  console.log(`=== Niche Images: ${articles.length} articles x2 ===\n`);
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
