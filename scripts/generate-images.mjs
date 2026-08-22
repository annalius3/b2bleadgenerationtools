import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const OUTPUT_DIR = resolve(process.cwd(), 'public/images/guides');
const WIDTH = 1024;
const HEIGHT = 1024;

const guides = [
  {
    slug: 'best-lead-generation-tools-for-small-business',
    prompts: [
      'Professional B2B SaaS dashboard showing multiple lead generation tools comparison with charts metrics and KPIs, clean modern interface, blue white color scheme, business software screenshot, 4K quality',
      'Small business owner analyzing lead generation tools on modern laptop, bright office workspace, professional atmosphere, clean minimal design, 4K quality'
    ]
  },
  {
    slug: 'b2b-lead-generation-services-vs-software',
    prompts: [
      'Split screen illustration showing professional sales team working on left side and modern software dashboard on right side, B2B outbound lead generation concept, clean modern flat design, 4K quality',
      'Business decision crossroads concept, two diverging paths, modern minimalist illustration with professional blue tones, corporate style, 4K quality'
    ]
  },
  {
    slug: 'how-to-build-a-b2b-client-acquisition-system',
    prompts: [
      'Modern flowchart diagram showing B2B client acquisition pipeline stages from prospect to qualified lead to customer, clean flat infographic design, blue and white color scheme, 4K quality',
      'Business system blueprint with interconnected nodes representing outreach qualification conversion and retention, modern technical illustration style, 4K quality'
    ]
  },
  {
    slug: 'apollo-vs-linkedin-sales-navigator',
    prompts: [
      'Two modern laptop screens side by side displaying different B2B prospecting tools interfaces, clean workspace desk setup, comparison concept, professional design, 4K quality',
      'B2B tools versus comparison concept with VS symbol between two platform logos, modern flat illustration with blue and orange accent colors, 4K quality'
    ]
  },
  {
    slug: 'apollo-vs-zoominfo-for-small-business',
    prompts: [
      'Cost comparison concept for B2B software tools, small business owner reviewing pricing plans on modern monitor, bright office, clean professional design, 4K quality',
      'Two pricing tier cards side by side showing affordable plan versus enterprise plan, modern SaaS comparison visual, clean minimalist design, 4K quality'
    ]
  },
  {
    slug: 'how-to-choose-a-lead-generation-tool',
    prompts: [
      'Checklist clipboard with lead generation tool evaluation criteria and green checkmarks, modern flat illustration, professional business concept, clean design, 4K quality',
      'Business person evaluating multiple software options on multiple screens, decision making concept, modern workspace, clean professional atmosphere, 4K quality'
    ]
  },
  {
    slug: 'lead-generation-cost-for-small-business',
    prompts: [
      'Calculator coins and charts concept for small business budget planning, modern flat illustration with blue and green tones, financial planning visual, 4K quality',
      'Small business owner reviewing ROI metrics and cost analysis on modern dashboard screen, clean professional design, 4K quality'
    ]
  },
  {
    slug: 'best-crm-for-lead-generation',
    prompts: [
      'Modern CRM dashboard with sales pipeline view showing leads moving through deal stages, clean SaaS interface, professional B2B software design, blue theme, 4K quality',
      'Sales pipeline visualization with deal stages cards metrics charts and conversion rates, modern business software interface, clean minimal design, 4K quality'
    ]
  },
  {
    slug: 'how-to-get-b2b-clients-without-paid-ads',
    prompts: [
      'Organic business growth concept with handshake referral network diagram, modern flat illustration showing connected business nodes, blue and green color scheme, 4K quality',
      'B2B growth channels wheel diagram with outbound referrals partnerships content and events, modern infographic style, clean professional design, 4K quality'
    ]
  },
  {
    slug: 'outbound-sales-strategy-for-local-service-businesses',
    prompts: [
      'Local service business owner making professional outreach phone calls in modern office, friendly and confident expression, clean photography style, 4K quality',
      'Map showing local business territory coverage with connected client nodes, outreach strategy concept, modern illustration style, 4K quality'
    ]
  },
  {
    slug: 'b2b-sales-prospecting-for-founders',
    prompts: [
      'Startup founder at modern minimalist desk researching prospects on laptop computer, focused and determined expression, clean workspace, professional atmosphere, 4K quality',
      'Founder led sales concept showing single entrepreneur managing full sales pipeline on screen, modern flat illustration, entrepreneurial vibe, 4K quality'
    ]
  },
  {
    slug: 'lead-generation-for-b2b-service-businesses',
    prompts: [
      'B2B service business team collaborating around whiteboard planning client acquisition strategy, modern office environment, professional team meeting, 4K quality',
      'Service business pipeline concept diagram showing progression from initial prospect to long term retainer client, modern infographic, clean blue tones, 4K quality'
    ]
  },
  {
    slug: 'how-to-generate-qualified-b2b-leads',
    prompts: [
      'Qualified lead funnel diagram with filtering stages showing many prospects narrowing to few qualified leads, modern flat illustration, blue gradient colors, 4K quality',
      'Lead scoring concept dashboard with quality indicators traffic lights and metrics, professional B2B analytics interface, clean modern design, 4K quality'
    ]
  },
  {
    slug: 'outbound-email-vs-cold-calling',
    prompts: [
      'Email inbox and phone call split screen concept, modern communication channels comparison, clean flat illustration with blue and orange accents, 4K quality',
      'Salesperson using both email and phone for multi channel outreach in modern workspace, professional business environment, 4K quality'
    ]
  },
  {
    slug: 'sales-pipeline-metrics-for-small-business',
    prompts: [
      'Pipeline metrics dashboard showing KPI charts conversion rates and revenue funnels, modern analytics interface, clean SaaS design with blue theme, 4K quality',
      'Small business sales metrics visualization with bar charts funnel diagram and growth arrows, modern infographic style, professional design, 4K quality'
    ]
  },
  {
    slug: 'client-acquisition-channels-for-b2b',
    prompts: [
      'Multi channel client acquisition wheel diagram showing outbound referrals content partnerships and events, modern infographic design, clean professional style, 4K quality',
      'B2B client acquisition ecosystem diagram with interconnected channels and arrows, modern flat illustration, professional business concept, 4K quality'
    ]
  }
];

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function downloadImage(prompt, filepath, retries = 3) {
  const encoded = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 999999);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${WIDTH}&height=${HEIGHT}&nologo=true&seed=${seed}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { redirect: 'follow' });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());

      if (buffer.length < 1000) {
        throw new Error(`Image too small (${buffer.length} bytes), likely an error`);
      }

      writeFileSync(filepath, buffer);
      return buffer.length;
    } catch (err) {
      console.error(`  Attempt ${attempt} failed: ${err.message}`);
      if (attempt < retries) {
        console.log(`  Retrying in 10 seconds...`);
        await delay(10000);
      } else {
        throw err;
      }
    }
  }
}

async function main() {
  const total = guides.length * 2;
  console.log(`Generating ${total} images for ${guides.length} guides`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`API: Pollinations.ai (free, no auth)`);
  console.log('---');

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

      console.log(`GEN ${filename}...`);

      try {
        const size = await downloadImage(guide.prompts[i], filepath);
        console.log(`  OK ${filename} (${(size / 1024).toFixed(0)}KB)`);
        success++;
      } catch (err) {
        console.error(`  FAIL ${filename}: ${err.message}`);
        failed++;
      }

      await delay(2000);
    }
  }

  console.log('---');
  console.log(`Done: ${success}/${total} success, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
