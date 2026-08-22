import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const LEONARDO_API_KEY = 'ddd44f0a-859b-4a86-825f-ce423d121277';
const LEONARDO_API_URL = 'https://cloud.leonardo.ai/api/rest/v2/generations';
const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');

const guides = [
  {
    slug: 'best-lead-generation-tools-for-small-business',
    title: 'Best Lead Generation Tools for Small Business',
    prompts: [
      'Professional B2B SaaS dashboard showing multiple lead generation tools comparison with charts metrics and KPIs, clean modern interface, blue white color scheme, business software screenshot, 4K quality',
      'Small business owner analyzing lead generation tools on modern laptop, bright office workspace, professional atmosphere, clean minimal design, 4K quality'
    ]
  },
  {
    slug: 'b2b-lead-generation-services-vs-software',
    title: 'B2B Lead Generation Services vs Software',
    prompts: [
      'Split screen illustration showing professional sales team working on left side and modern software dashboard on right side, B2B outbound lead generation concept, clean modern flat design, 4K quality',
      'Business decision crossroads concept, two diverging paths, modern minimalist illustration with professional blue tones, corporate style, 4K quality'
    ]
  },
  {
    slug: 'how-to-build-a-b2b-client-acquisition-system',
    title: 'How to Build a B2B Client Acquisition System',
    prompts: [
      'Modern flowchart diagram showing B2B client acquisition pipeline stages from prospect to qualified lead to customer, clean flat infographic design, blue and white color scheme, 4K quality',
      'Business system blueprint with interconnected nodes representing outreach qualification conversion and retention, modern technical illustration style, 4K quality'
    ]
  },
  {
    slug: 'apollo-vs-linkedin-sales-navigator',
    title: 'Apollo vs LinkedIn Sales Navigator',
    prompts: [
      'Two modern laptop screens side by side displaying different B2B prospecting tools interfaces, clean workspace desk setup, comparison concept, professional design, 4K quality',
      'B2B tools versus comparison concept with VS symbol between two platform logos, modern flat illustration with blue and orange accent colors, 4K quality'
    ]
  },
  {
    slug: 'apollo-vs-zoominfo-for-small-business',
    title: 'Apollo vs ZoomInfo for Small Business',
    prompts: [
      'Cost comparison concept for B2B software tools, small business owner reviewing pricing plans on modern monitor, bright office, clean professional design, 4K quality',
      'Two pricing tier cards side by side showing affordable plan versus enterprise plan, modern SaaS comparison visual, clean minimalist design, 4K quality'
    ]
  },
  {
    slug: 'how-to-choose-a-lead-generation-tool',
    title: 'How to Choose a Lead Generation Tool',
    prompts: [
      'Checklist clipboard with lead generation tool evaluation criteria and green checkmarks, modern flat illustration, professional business concept, clean design, 4K quality',
      'Business person evaluating multiple software options on multiple screens, decision making concept, modern workspace, clean professional atmosphere, 4K quality'
    ]
  },
  {
    slug: 'lead-generation-cost-for-small-business',
    title: 'Lead Generation Cost for Small Business',
    prompts: [
      'Calculator coins and charts concept for small business budget planning, modern flat illustration with blue and green tones, financial planning visual, 4K quality',
      'Small business owner reviewing ROI metrics and cost analysis on modern dashboard screen, clean professional design, 4K quality'
    ]
  },
  {
    slug: 'best-crm-for-lead-generation',
    title: 'Best CRM for Lead Generation',
    prompts: [
      'Modern CRM dashboard with sales pipeline view showing leads moving through deal stages, clean SaaS interface, professional B2B software design, blue theme, 4K quality',
      'Sales pipeline visualization with deal stages cards metrics charts and conversion rates, modern business software interface, clean minimal design, 4K quality'
    ]
  },
  {
    slug: 'how-to-get-b2b-clients-without-paid-ads',
    title: 'How to Get B2B Clients Without Paid Ads',
    prompts: [
      'Organic business growth concept with handshake referral network diagram, modern flat illustration showing connected business nodes, blue and green color scheme, 4K quality',
      'B2B growth channels wheel diagram with outbound referrals partnerships content and events, modern infographic style, clean professional design, 4K quality'
    ]
  },
  {
    slug: 'outbound-sales-strategy-for-local-service-businesses',
    title: 'Outbound Sales Strategy for Local Service Businesses',
    prompts: [
      'Local service business owner making professional outreach phone calls in modern office, friendly and confident expression, clean photography style, 4K quality',
      'Map showing local business territory coverage with connected client nodes, outreach strategy concept, modern illustration style, 4K quality'
    ]
  },
  {
    slug: 'b2b-sales-prospecting-for-founders',
    title: 'B2B Sales Prospecting for Founders',
    prompts: [
      'Startup founder at modern minimalist desk researching prospects on laptop computer, focused and determined expression, clean workspace, professional atmosphere, 4K quality',
      'Founder led sales concept showing single entrepreneur managing full sales pipeline on screen, modern flat illustration, entrepreneurial vibe, 4K quality'
    ]
  },
  {
    slug: 'lead-generation-for-b2b-service-businesses',
    title: 'Lead Generation for B2B Service Businesses',
    prompts: [
      'B2B service business team collaborating around whiteboard planning client acquisition strategy, modern office environment, professional team meeting, 4K quality',
      'Service business pipeline concept diagram showing progression from initial prospect to long term retainer client, modern infographic, clean blue tones, 4K quality'
    ]
  },
  {
    slug: 'how-to-generate-qualified-b2b-leads',
    title: 'How to Generate Qualified B2B Leads',
    prompts: [
      'Qualified lead funnel diagram with filtering stages showing many prospects narrowing to few qualified leads, modern flat illustration, blue gradient colors, 4K quality',
      'Lead scoring concept dashboard with quality indicators traffic lights and metrics, professional B2B analytics interface, clean modern design, 4K quality'
    ]
  },
  {
    slug: 'outbound-email-vs-cold-calling',
    title: 'Outbound Email vs Cold Calling',
    prompts: [
      'Email inbox and phone call split screen concept, modern communication channels comparison, clean flat illustration with blue and orange accents, 4K quality',
      'Salesperson using both email and phone for multi channel outreach in modern workspace, professional business environment, 4K quality'
    ]
  },
  {
    slug: 'sales-pipeline-metrics-for-small-business',
    title: 'Sales Pipeline Metrics for Small Business',
    prompts: [
      'Pipeline metrics dashboard showing KPI charts conversion rates and revenue funnels, modern analytics interface, clean SaaS design with blue theme, 4K quality',
      'Small business sales metrics visualization with bar charts funnel diagram and growth arrows, modern infographic style, professional design, 4K quality'
    ]
  },
  {
    slug: 'client-acquisition-channels-for-b2b',
    title: 'Client Acquisition Channels for B2B',
    prompts: [
      'Multi channel client acquisition wheel diagram showing outbound referrals content partnerships and events, modern infographic design, clean professional style, 4K quality',
      'B2B client acquisition ecosystem diagram with interconnected channels and arrows, modern flat illustration, professional business concept, 4K quality'
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
    throw new Error(`Create generation failed: ${response.status} - ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.generate?.generationId || data.generationId;
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
    .resize(width, 1024 - bannerHeight)
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
  const total = guides.length * 2;
  console.log(`Generating ${total} images for ${guides.length} guides`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`API: Leonardo.ai (flux-schnell)`);
  console.log('---');

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let success = 0;
  let failed = 0;

  for (const guide of guides) {
    for (let i = 0; i < guide.prompts.length; i++) {
      const imageNum = i + 1;
      const filename = `${guide.slug}-${imageNum}.jpg`;
      const filepath = resolve(OUTPUT_DIR, filename);

      if (existsSync(filepath)) {
        console.log(`SKIP ${filename} (exists)`);
        success++;
        continue;
      }

      console.log(`\n[${success + failed + 1}/${total}] ${filename}`);
      console.log(`  Prompt: ${guide.prompts[i].slice(0, 60)}...`);

      try {
        const generationId = await createGeneration(guide.prompts[i]);
        console.log(`  Generation ID: ${generationId}`);

        const imageUrl = await pollGeneration(generationId);
        console.log(`  Image URL: ${imageUrl.slice(0, 80)}...`);

        const imageResponse = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        const tempPath = resolve(OUTPUT_DIR, `${guide.slug}-${imageNum}-temp.jpg`);
        writeFileSync(tempPath, imageBuffer);
        console.log(`  Downloaded: ${(imageBuffer.length / 1024).toFixed(0)}KB`);

        await addTextOverlay(tempPath, filepath, guide.title);

        const { size } = await import('fs').then(f => f.statSync(filepath));
        console.log(`  Final: ${(size / 1024).toFixed(0)}KB`);

        const fsp = await import('fs/promises');
        await fsp.unlink(tempPath);

        console.log(`  ✅ ${filename} complete`);
        success++;
      } catch (err) {
        console.error(`  ❌ ${filename} failed: ${err.message}`);
        failed++;
      }

      await delay(1000);
    }
  }

  console.log('\n---');
  console.log(`Done: ${success}/${total} success, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
