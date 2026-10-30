import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'lib', 'content.ts');
let source = fs.readFileSync(file, 'utf8');

// [current description, expanded meta description]
const pairs = [
  [
    'A practical framework to identify target companies with the highest probability of buying.',
    'A practical framework to identify target companies with the highest probability of buying: ICP filters, buying signals, and account scoring in Apollo.'
  ],
  [
    'How to design a predictable B2B sales pipeline from first reply to closed-won opportunity.',
    'How to design a predictable B2B sales pipeline from first reply to closed-won opportunity, with stage definitions, SLAs, and weekly inspection.'
  ],
  [
    'A zero-to-first-clients framework using Apollo lists, outreach, and conversion discipline.',
    'A zero-to-first-clients framework using Apollo lists, outreach, and conversion discipline, plus the metrics that tell you when to change course.'
  ],
  [
    'Improve close rates by controlling multistakeholder deals with clear next-step architecture.',
    'Improve close rates by controlling multistakeholder deals with clear next-step architecture, objection maps, and mutual action plans.'
  ],
  [
    'Agency-focused workflow for finding clients, running campaigns, and converting to retainers.',
    'Agency-focused workflow for finding clients, running campaigns, and converting to retainers, from niche selection to reporting and renewals.'
  ],
  [
    'A complete outreach campaign setup guide in Apollo from list prep to sequence launch and QA.',
    'A complete outreach campaign setup guide in Apollo from list prep to sequence launch and QA, including deliverability checks and stop rules.'
  ],
  [
    'A practical multi-step outreach playbook for consistent B2B replies and pipeline conversion.',
    'A practical multi-step outreach playbook for consistent B2B replies and pipeline conversion, with channel order, timing, and message intent.'
  ],
  [
    'A founder-first method to book early calls and close the first paying customers using Apollo.',
    'A founder-first method to book early calls and close the first paying customers using Apollo: narrow ICP, short sequences, and direct follow-up.'
  ],
  [
    'A practical outbound framework for small businesses to find and win B2B clients consistently.',
    'A practical outbound framework for small businesses to find and win B2B clients consistently without a large sales team or big tool budget.'
  ],
  [
    'Use a lightweight ABM motion with Apollo to prioritize high-value accounts and decision paths.',
    'Use a lightweight ABM motion with Apollo to prioritize high-value accounts and decision paths, from account tiering to personalized first touches.'
  ],
  [
    'A startup-focused Apollo playbook for lean teams that need fast, practical outbound execution.',
    'A startup-focused Apollo playbook for lean teams that need fast, practical outbound execution with limited credits, time, and headcount.'
  ],
  [
    'How consultants use Apollo to identify ideal buyers, start conversations, and close retainers.',
    'How consultants use Apollo to identify ideal buyers, start conversations, and close retainers, with positioning and follow-up cadences that fit.'
  ],
  [
    'How better lead quality improves close rates and shortens sales cycles in B2B outbound motions.',
    'How better lead quality improves close rates and shortens sales cycles in B2B outbound, with qualification criteria and handoff checks.'
  ],
  [
    'Turn lead flow into predictable revenue with clear pipeline stages, SLAs, and inspection rhythm.',
    'Turn lead flow into predictable revenue with clear pipeline stages, SLAs, and inspection rhythm, plus the reports that surface stalled deals.'
  ],
  [
    'Step-by-step list building in Apollo with account filters, contact mapping, and quality control.',
    'Step-by-step list building in Apollo with account filters, contact mapping, and quality control before the first email ever goes out.'
  ],
  [
    'A modern prospecting system in Apollo.io from account selection to first qualified conversation.',
    'A modern prospecting system in Apollo.io from account selection to first qualified conversation, including buying signals and sequencing logic.'
  ],
  [
    'A proven agency workflow in Apollo for niche targeting, outreach execution, and retainer growth.',
    'A proven agency workflow in Apollo for niche targeting, outreach execution, and retainer growth, with repeatable processes for every client.'
  ],
  [
    'A practical process to build high-fit prospect lists quickly using Apollo filters and enrichment.',
    'A practical process to build high-fit prospect lists quickly using Apollo filters and enrichment, without burning credits on the wrong accounts.'
  ],
  [
    'How Apollo.io pricing works in practice: plan logic, credit usage, and cost control by team type.',
    'How Apollo.io pricing works in practice: plan logic, credit usage, and cost control by team type, plus a simple way to estimate the monthly bill.'
  ],
  [
    'A repeatable lead generation workflow in Apollo for teams that need steady top-of-funnel pipeline.',
    'A repeatable lead generation workflow in Apollo for teams that need steady top-of-funnel pipeline without sacrificing list quality or reply rates.'
  ],
  [
    'A method to identify high-quality leads in Apollo based on fit, intent, and likelihood to convert.',
    'A method to identify high-quality leads in Apollo based on fit, intent, and likelihood to convert, with scoring rules you can actually maintain.'
  ],
  [
    'A practical performance tracking framework for outbound campaigns and lead-to-pipeline conversion.',
    'A practical performance tracking framework for outbound campaigns and lead-to-pipeline conversion, with the metrics worth reviewing weekly.'
  ],
  [
    'A practical account-based prospecting workflow with Apollo for high-value B2B account penetration.',
    'A practical account-based prospecting workflow with Apollo for high-value B2B account penetration, from account tiering to multithreading.'
  ],
  [
    'How to plan Apollo follow-up timing so sequences stay persistent without feeling random or spammy.',
    'How to plan Apollo follow-up timing so sequences stay persistent without feeling random or spammy, including gap patterns and stop rules.'
  ],
  [
    'A cold email framework for agencies that need more qualified conversations with ideal-fit clients.',
    'A cold email framework for agencies that need more qualified conversations with ideal-fit clients, including offer angles and reply handling.'
  ],
  [
    'Balance relevance and volume by combining segmentation rules with practical personalization tokens.',
    'Balance relevance and volume by combining segmentation rules with practical personalization tokens, without slowing campaigns down to a crawl.'
  ],
  [
    'A startup outbound sales framework using Apollo for prospecting, messaging, and meeting generation.',
    'A startup outbound sales framework using Apollo for prospecting, messaging, and meeting generation, sized for a small founder-led team.'
  ],
  [
    'A repeatable framework for building clean B2B contact lists with Apollo account and role targeting.',
    'A repeatable framework for building clean B2B contact lists with Apollo account and role targeting, deduplication, and verification steps.'
  ],
  [
    'How to find CEOs and founders in Apollo for founder-led and executive-level B2B outreach campaigns.',
    'How to find CEOs and founders in Apollo for founder-led and executive-level B2B outreach campaigns, with filters and verification checks.'
  ],
  [
    'How to manage a B2B sales pipeline with clear ownership, stage rules, and weekly inspection cadence.',
    'How to manage a B2B sales pipeline with clear ownership, stage rules, and a weekly inspection cadence that keeps late-stage deals moving.'
  ],
  [
    'A practical method to find and verify business emails in Apollo for high-fit B2B outreach campaigns.',
    'A practical method to find and verify business emails in Apollo for high-fit B2B outreach campaigns, plus what to do when coverage is thin.'
  ],
  [
    'How to target specific industries in Apollo with niche segmentation and tailored outbound messaging.',
    'How to target specific industries in Apollo with niche segmentation and tailored outbound messaging that survives real buyer scrutiny.'
  ],
  [
    'A decision framework to evaluate Apollo ROI by team size, sales motion, and expected pipeline output.',
    'A decision framework to evaluate Apollo ROI by team size, sales motion, and expected pipeline output before you commit to an annual plan.'
  ],
  [
    'Step-by-step setup for sending cold emails in Apollo with better deliverability and response quality.',
    'Step-by-step setup for sending cold emails in Apollo with better deliverability and response quality, including domain warm-up basics.'
  ],
  [
    'A complete setup guide for Apollo.io including account structure, campaign foundations, and QA checks.',
    'A complete setup guide for Apollo.io including account structure, campaign foundations, and QA checks before launching your first sequence.'
  ],
  [
    'Use Apollo outreach to validate startup ideas with real buyer feedback before scaling build and spend.',
    'Use Apollo outreach to validate startup ideas with real buyer feedback before scaling build and spend, including the questions that matter most.'
  ],
  [
    'How small business teams use Apollo to build targeted lists, run outreach, and create steady pipeline.',
    'How small business teams use Apollo to build targeted lists, run outreach, and create steady pipeline without hiring a full sales team.'
  ],
  [
    'A repeatable growth model for consulting businesses using Apollo for acquisition and pipeline control.',
    'A repeatable growth model for consulting businesses using Apollo for acquisition and pipeline control, from niche focus to referral loops.'
  ],
  [
    'A practical features walkthrough of Apollo.io with context on what matters for real outbound execution.',
    'A practical features walkthrough of Apollo.io with context on what matters for real outbound execution and what you can safely ignore.'
  ],
  [
    'An honest breakdown of Apollo.io strengths and tradeoffs for startups, agencies, and scaling B2B teams.',
    'An honest breakdown of Apollo.io strengths and tradeoffs for startups, agencies, and scaling B2B teams, including where it falls short.'
  ],
  [
    'How to build a practical B2B sales funnel in Apollo from first outreach touch to qualified opportunity.',
    'How to build a practical B2B sales funnel in Apollo from first outreach touch to qualified opportunity, with conversion points to watch.'
  ],
  [
    'A full workflow showing how Apollo supports the path from lead sourcing to closed-won deal progression.',
    'A full workflow showing how Apollo supports the path from lead sourcing to closed-won deal progression, including handoffs and CRM hygiene.'
  ],
  [
    'How to enrich B2B lead data in Apollo to improve targeting, personalization, and qualification quality.',
    'How to enrich B2B lead data in Apollo to improve targeting, personalization, and qualification quality without overpaying for credits.'
  ],
  [
    'Practical personalization methods for cold outreach that improve replies without killing campaign speed.',
    'Practical personalization methods for cold outreach that improve replies without killing campaign speed, from segment level to first-line detail.'
  ],
  [
    'A practical explanation of the Apollo workflow from targeting to outreach execution and pipeline handoff.',
    'A practical explanation of the Apollo workflow from targeting to outreach execution and pipeline handoff, with the parts that actually matter.'
  ],
  [
    'How to identify true decision-makers, champions, and buying influencers using Apollo filters and context.',
    'How to identify true decision-makers, champions, and buying influencers using Apollo filters and context, then sequence them correctly.'
  ],
  [
    'How early-stage B2B teams can build a predictable pipeline before a full inbound marketing engine exists.',
    'How early-stage B2B teams can build a predictable pipeline before a full inbound marketing engine exists, using outbound and referrals.'
  ],
  [
    'How to find decision-maker phone numbers in Apollo and use them responsibly in multichannel B2B outreach.',
    'How to find decision-maker phone numbers in Apollo and use them responsibly in multichannel B2B outreach, plus the compliance basics.'
  ],
  [
    'A beginner-friendly Apollo.io guide to launch your first outbound workflow without unnecessary complexity.',
    'A beginner-friendly Apollo.io guide to launch your first outbound workflow without unnecessary complexity, from setup to the first replies.'
  ],
  [
    'A strategic lead generation framework using Apollo for consistent pipeline growth across outbound motions.',
    'A strategic lead generation framework using Apollo for consistent pipeline growth across outbound motions, with metrics and a review cadence.'
  ],
  [
    'A practical framework for running effective cold email campaigns in Apollo.io from list to reply handling.',
    'A practical framework for running effective cold email campaigns in Apollo.io from list building to reply handling, including sequence structure.'
  ],
  [
    'A focused outbound plan for accounting firms that need first recurring clients and faster market feedback.',
    'A focused outbound plan for accounting firms that need first recurring clients and faster market feedback, with niche and offer guidance.'
  ],
  [
    'A step-by-step Apollo tutorial from first list to first booked meeting with practical execution checkpoints.',
    'A step-by-step Apollo tutorial from first list to first booked meeting with practical execution checkpoints and common mistakes to avoid.'
  ],
  [
    'A practical customer acquisition system for startups using outbound, qualification, and fast feedback loops.',
    'A practical customer acquisition system for startups using outbound, qualification, and fast feedback loops instead of channel guesswork.'
  ],
  [
    'How SaaS teams use Apollo to find target accounts, reach operators, and create repeatable outbound pipeline.',
    'How SaaS teams use Apollo to find target accounts, reach operators, and create repeatable outbound pipeline across several market segments.'
  ],
  [
    'A practical playbook to find high-fit B2B leads in Apollo.io using ICP filters, enrichment, and segmentation.',
    'A practical playbook to find high-fit B2B leads in Apollo.io using ICP filters, enrichment, and segmentation that holds up in real campaigns.'
  ],
  [
    'A practical scale-up model for client acquisition using Apollo workflows, process controls, and team cadence.',
    'A practical scale-up model for client acquisition using Apollo workflows, process controls, and a team cadence that survives headcount growth.'
  ],
  [
    'How to build a startup growth strategy around Apollo with clear segmentation, outreach, and pipeline metrics.',
    'How to build a startup growth strategy around Apollo with clear segmentation, outreach, and pipeline metrics, plus what to fix first.'
  ],
  [
    'A strategic email outreach model for B2B teams using segmentation, messaging clarity, and response workflows.',
    'A strategic email outreach model for B2B teams using segmentation, messaging clarity, and response workflows instead of volume alone.'
  ],
  [
    'A founder-led outbound system for consulting firms that need their first clients and cleaner market feedback.',
    'A founder-led outbound system for consulting firms that need their first clients and cleaner market feedback, from niche choice to first calls.'
  ]
];

let applied = 0;
const problems = [];

for (const [oldText, newText] of pairs) {
  const needle = `'${oldText}'`;
  const occurrences = source.split(needle).length - 1;
  if (occurrences !== 1) {
    problems.push(`expected 1 occurrence, found ${occurrences}: ${oldText.slice(0, 60)}...`);
    continue;
  }
  source = source.replace(needle, `'${newText}'`);
  applied++;
}

if (problems.length > 0) {
  console.error('ABORTED — no changes written:');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}

fs.writeFileSync(file, source, 'utf8');
console.log(`Applied ${applied}/${pairs.length} description expansions`);
