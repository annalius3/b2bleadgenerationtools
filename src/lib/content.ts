export type HubKey =
  | 'find-clients'
  | 'outreach'
  | 'sales-pipeline'
  | 'by-industry'
  | 'for-startups'
  | 'guides';

export type Industry = {
  slug: string;
  name: string;
  description: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  hub: Exclude<HubKey, 'by-industry'>;
  industries: string[];
  steps: string[];
  useCases: string[];
  tips: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
};

export const hubContent: Record<HubKey, { title: string; description: string; subtopics: string[] }> = {
  'find-clients': {
    title: 'Find Clients',
    description: 'Lead generation and prospecting systems to identify the right accounts and decision-makers.',
    subtopics: [
      'Find B2B leads',
      'Build lead lists',
      'Find decision makers',
      'Find companies to sell to',
      'Data enrichment',
      'Account-based prospecting'
    ]
  },
  outreach: {
    title: 'Outreach',
    description: 'How to contact prospects with cold email and multistep campaigns that produce replies.',
    subtopics: [
      'Cold email',
      'Email sequences',
      'Follow-ups',
      'Personalization',
      'Outreach campaigns',
      'Reply strategies'
    ]
  },
  'sales-pipeline': {
    title: 'Sales Pipeline',
    description: 'Tactical playbooks to convert leads into meetings, deals, and recurring revenue.',
    subtopics: [
      'Build sales funnel',
      'Lead qualification',
      'Deal closing strategies',
      'Conversion optimization',
      'Revenue growth',
      'Pipeline management'
    ]
  },
  'by-industry': {
    title: 'By Industry',
    description: 'Lead generation playbooks adapted to each vertical with practical outbound examples.',
    subtopics: [
      'SaaS companies',
      'Marketing agencies',
      'Consulting firms',
      'IT services',
      'Recruiters',
      'Healthcare',
      'Financial services',
      'Manufacturing'
    ]
  },
  'for-startups': {
    title: 'For Startups',
    description: 'Early-stage customer acquisition systems for founder-led and lean GTM teams.',
    subtopics: [
      'Get first customers',
      'Low-budget lead generation',
      'Growth strategies',
      'Outbound sales for startups',
      'Validate startup ideas'
    ]
  },
  guides: {
    title: 'Guides',
    description: 'Tutorials, templates, case studies, and Apollo workflows for repeatable outbound growth.',
    subtopics: ['Tutorials', 'Case studies', 'Templates', 'Best practices', 'Apollo guides']
  }
};

export const industries: Industry[] = [
  { slug: 'saas-companies', name: 'SaaS Companies', description: 'Target ICP accounts and scale outbound for subscription products.' },
  { slug: 'marketing-agencies', name: 'Marketing Agencies', description: 'Build client pipeline with offer-led outreach and better positioning.' },
  { slug: 'consulting-firms', name: 'Consulting Firms', description: 'Use expert authority messaging and warm outbound frameworks.' },
  { slug: 'it-services', name: 'IT Services', description: 'Find technical buyers and create intent-based outreach offers.' },
  { slug: 'recruiters', name: 'Recruiters', description: 'Map hiring teams and reach decision-makers with candidate-centric value.' },
  { slug: 'healthcare', name: 'Healthcare', description: 'Design compliant outreach motions for healthcare buyers and operators.' },
  { slug: 'financial-services', name: 'Financial Services', description: 'Generate qualified meetings in regulated and trust-heavy markets.' },
  { slug: 'manufacturing', name: 'Manufacturing', description: 'Find operations and procurement contacts for long-cycle B2B deals.' }
];

export const guides: Guide[] = [
  {
    slug: 'how-to-find-b2b-leads-fast',
    title: 'How to Find B2B Leads Fast Without Wasting Credits',
    description: 'A practical process to build high-fit prospect lists quickly using Apollo filters and enrichment.',
    hub: 'find-clients',
    industries: ['saas-companies', 'marketing-agencies', 'it-services'],
    steps: [
      'Define your ICP with clear revenue, company size, and geography boundaries.',
      'Build account lists first, then map contacts by role seniority and buying influence.',
      'Use Apollo filters for tech stack, hiring intent, and recent growth signals.',
      'Run enrichment and remove weak-fit records before outreach.',
      'Score leads into Tier 1, 2, and 3 segments for campaign priority.'
    ],
    useCases: [
      'SaaS founder building first outbound list',
      'Agency expanding into a new niche',
      'IT services team launching ABM pilot'
    ],
    tips: [
      'Start with narrow segments before scaling list size.',
      'Measure meetings per 100 contacts, not only open rates.',
      'Refresh list quality every 2 weeks.'
    ],
    faqs: [
      {
        question: 'How many leads should I collect before outreach?',
        answer: 'Start with 150 to 300 high-fit records per segment so you can iterate quickly.'
      },
      {
        question: 'Should I prioritize company or contact filters first?',
        answer: 'Company filters first. Better account selection usually improves downstream response quality.'
      }
    ],
    relatedSlugs: ['account-based-prospecting-framework', 'apollo-cold-email-sequence-template']
  },
  {
    slug: 'account-based-prospecting-framework',
    title: 'Account-Based Prospecting Framework for Small B2B Teams',
    description: 'Use a lightweight ABM motion with Apollo to prioritize high-value accounts and decision paths.',
    hub: 'find-clients',
    industries: ['saas-companies', 'consulting-firms', 'manufacturing'],
    steps: [
      'Select 50 target accounts per quarter.',
      'Map champions, decision-makers, and blockers in each account.',
      'Personalize value proposition by account context.',
      'Launch multithread outreach by role and pain point.',
      'Track progression from first reply to pipeline creation.'
    ],
    useCases: ['Founder-led sales', 'Consulting retainers', 'Enterprise pilot deals'],
    tips: ['Do not exceed 10 active accounts per rep.', 'Keep messaging different by role, not by first-name tokens.'],
    faqs: [
      { question: 'Is ABM only for enterprise?', answer: 'No. Small teams can run ABM with a focused account set and clear ownership.' },
      { question: 'What metric matters most?', answer: 'Meetings booked with target accounts, then account-level opportunity rate.' }
    ],
    relatedSlugs: ['how-to-find-b2b-leads-fast', 'pipeline-management-playbook']
  },
  {
    slug: 'apollo-cold-email-sequence-template',
    title: 'Apollo Cold Email Sequence Template That Gets Replies',
    description: 'A sequence structure with timing and message intent for first-touch outbound campaigns.',
    hub: 'outreach',
    industries: ['marketing-agencies', 'it-services', 'recruiters'],
    steps: [
      'Write one core offer message with clear problem and outcome.',
      'Create 4 to 6 touches with varied angles.',
      'Use Apollo sequence logic to pause on reply and branch by response type.',
      'Add one credibility element in each follow-up.',
      'Review reply quality weekly and rewrite weak steps.'
    ],
    useCases: ['Agency outbound sprint', 'Recruiting client acquisition', 'IT service lead capture'],
    tips: ['Keep first email below 120 words.', 'One CTA per message improves clarity.'],
    faqs: [
      { question: 'How long should a sequence be?', answer: 'Most teams see best performance between 4 and 7 touches.' },
      { question: 'How often should I follow up?', answer: 'A 2-2-3 day cadence is a reliable starting point for B2B outbound.' }
    ],
    relatedSlugs: ['reply-strategy-for-b2b-outreach', 'personalization-at-scale-with-apollo']
  },
  {
    slug: 'personalization-at-scale-with-apollo',
    title: 'Personalization at Scale With Apollo Workflows',
    description: 'Balance relevance and volume by combining segmentation rules with practical personalization tokens.',
    hub: 'outreach',
    industries: ['saas-companies', 'financial-services', 'healthcare'],
    steps: [
      'Create 3 segmentation layers: industry, role, and maturity.',
      'Build message variants for each segment.',
      'Use Apollo variables for contextual snippets only.',
      'Insert one research-based line for top-tier targets.',
      'Benchmark positive reply rate by segment.'
    ],
    useCases: ['Vertical outreach campaigns', 'Mid-market SDR teams', 'Multi-offer outbound motions'],
    tips: ['Token spam reduces credibility.', 'Segment quality matters more than personalization volume.'],
    faqs: [
      { question: 'Can I personalize without manual research?', answer: 'Yes, for most campaigns. Reserve deep research for strategic accounts.' },
      { question: 'What should I personalize first?', answer: 'Pain point and offer fit. Generic offers underperform even with name/company tokens.' }
    ],
    relatedSlugs: ['apollo-cold-email-sequence-template', 'how-to-find-b2b-leads-fast']
  },
  {
    slug: 'pipeline-management-playbook',
    title: 'Pipeline Management Playbook for Outbound Teams',
    description: 'Turn lead flow into predictable revenue with clear pipeline stages, SLAs, and inspection rhythm.',
    hub: 'sales-pipeline',
    industries: ['saas-companies', 'consulting-firms', 'financial-services'],
    steps: [
      'Define stage exit criteria before scaling volume.',
      'Set response-time SLA for new positive replies.',
      'Score opportunities by fit and urgency.',
      'Create weekly pipeline hygiene and risk review.',
      'Run conversion experiments per stage.'
    ],
    useCases: ['New SDR team buildout', 'RevOps cleanup project', 'Founder to sales manager handoff'],
    tips: ['Stage definitions should be binary, not subjective.', 'Track time-in-stage to spot process bottlenecks.'],
    faqs: [
      { question: 'What is the first pipeline metric to fix?', answer: 'Speed-to-first-response on qualified inbound/outbound replies.' },
      { question: 'How often should pipeline reviews happen?', answer: 'Weekly at minimum for outbound-heavy teams.' }
    ],
    relatedSlugs: ['deal-closing-strategies-b2b', 'lead-qualification-system']
  },
  {
    slug: 'lead-qualification-system',
    title: 'Lead Qualification System to Focus on Revenue Potential',
    description: 'A practical qualification framework to prioritize high-value opportunities.',
    hub: 'sales-pipeline',
    industries: ['it-services', 'manufacturing', 'saas-companies'],
    steps: [
      'Define qualification dimensions: fit, pain, timing, and buying process.',
      'Assign numeric score ranges for each dimension.',
      'Use Apollo notes and tags to enforce qualification discipline.',
      'Route low-score leads into nurture path.',
      'Review qualification accuracy monthly against closed-won data.'
    ],
    useCases: ['SDR to AE handoff', 'Outbound quality control', 'Enterprise account targeting'],
    tips: ['Do not pass unqualified meetings to AEs.', 'Qualification should improve close rate, not volume.'],
    faqs: [
      { question: 'How many criteria are enough?', answer: 'Four to six criteria are usually enough for consistent decisions.' },
      { question: 'Can startups use formal qualification?', answer: 'Yes. A lightweight model is better than no model.' }
    ],
    relatedSlugs: ['pipeline-management-playbook', 'deal-closing-strategies-b2b']
  },
  {
    slug: 'deal-closing-strategies-b2b',
    title: 'Deal Closing Strategies for Mid-Market B2B Sales',
    description: 'Improve close rates by controlling multistakeholder deals with clear next-step architecture.',
    hub: 'sales-pipeline',
    industries: ['financial-services', 'healthcare', 'manufacturing'],
    steps: [
      'Map stakeholders and decision sequence early.',
      'Create a mutual action plan after discovery.',
      'Address commercial and implementation risks proactively.',
      'Anchor outcomes with quantified business impact.',
      'Use structured follow-up cadence until signature.'
    ],
    useCases: ['Long sales cycles', 'Procurement-heavy deals', 'Complex buyer committees'],
    tips: ['Every call needs a scheduled next step.', 'Unclear ownership is a top reason deals slip.'],
    faqs: [
      { question: 'How do I reduce end-of-quarter slippage?', answer: 'Qualify timeline realism and stakeholder commitment earlier.' },
      { question: 'Should discounts be used to close faster?', answer: 'Only with clear trade-offs and mutual commitments.' }
    ],
    relatedSlugs: ['pipeline-management-playbook', 'lead-qualification-system']
  },
  {
    slug: 'startup-outbound-first-customers',
    title: 'Startup Outbound Playbook to Win First 20 Customers',
    description: 'A lean outbound system for early-stage founders with limited budget and time.',
    hub: 'for-startups',
    industries: ['saas-companies', 'consulting-firms'],
    steps: [
      'Narrow to one ICP and one problem statement.',
      'Build first 200 prospects in Apollo.',
      'Launch 2-message test sequence with one clear offer.',
      'Book discovery calls and document objections.',
      'Use feedback loops to refine offer and messaging.'
    ],
    useCases: ['Pre-seed SaaS founder', 'Solo consultant', 'New agency launch'],
    tips: ['One segment beats five weak segments.', 'Speed of learning is your biggest startup advantage.'],
    faqs: [
      { question: 'What budget is enough to start?', answer: 'Many teams begin with Apollo plus one email infrastructure setup.' },
      { question: 'How quickly can startup outbound work?', answer: 'Most teams get meaningful signal in 2 to 4 weeks with focused execution.' }
    ],
    relatedSlugs: ['low-budget-lead-generation-startups', 'how-to-find-b2b-leads-fast']
  },
  {
    slug: 'low-budget-lead-generation-startups',
    title: 'Low-Budget Lead Generation Strategies for Startups',
    description: 'Reduce tool sprawl and build a compact GTM stack that still produces pipeline.',
    hub: 'for-startups',
    industries: ['saas-companies', 'marketing-agencies'],
    steps: [
      'Prioritize one database and one sending workflow.',
      'Allocate effort to segmentation and offer quality.',
      'Automate list building and campaign launch inside Apollo.',
      'Track core metrics weekly: positive reply, meeting rate, show rate.',
      'Reinvest only after channel economics are proven.'
    ],
    useCases: ['Bootstrap growth', 'Early product-market fit', 'Small team expansion'],
    tips: ['Avoid adding tools before process clarity.', 'Compounding process wins beat feature-heavy stacks.'],
    faqs: [
      { question: 'What is the minimum outbound stack?', answer: 'Apollo, domain/email setup, and a simple CRM process.' },
      { question: 'When should I add more tools?', answer: 'After consistent meeting volume and clear bottleneck diagnosis.' }
    ],
    relatedSlugs: ['startup-outbound-first-customers', 'apollo-cold-email-sequence-template']
  },
  {
    slug: 'apollo-guide-for-agencies',
    title: 'Apollo Guide for Agencies: From Prospect to Retainer',
    description: 'Agency-focused workflow for finding clients, running campaigns, and converting to retainers.',
    hub: 'guides',
    industries: ['marketing-agencies', 'consulting-firms', 'it-services'],
    steps: [
      'Define service-specific ICP and retainer offer.',
      'Create segmented lists in Apollo by niche and buyer role.',
      'Run outreach sequences tied to case-study proof.',
      'Qualify inbound replies against project scope and budget.',
      'Move qualified leads into proposal pipeline.'
    ],
    useCases: ['Performance agency growth', 'B2B content agency lead gen', 'RevOps consulting sales'],
    tips: ['Case studies are stronger than generic credentials.', 'Qualify for recurring fit, not only first project fit.'],
    faqs: [
      { question: 'Can agencies run multi-client campaigns in Apollo?', answer: 'Yes, with clear workspace and list governance per offer.' },
      { question: 'What outreach angle works best for agencies?', answer: 'Problem-specific outcomes backed by relevant proof.' }
    ],
    relatedSlugs: ['apollo-cold-email-sequence-template', 'reply-strategy-for-b2b-outreach']
  },
  {
    slug: 'reply-strategy-for-b2b-outreach',
    title: 'Reply Strategy for B2B Outreach Conversations',
    description: 'Turn replies into qualified calls with structured response playbooks.',
    hub: 'guides',
    industries: ['recruiters', 'saas-companies', 'it-services'],
    steps: [
      'Classify replies into interested, neutral, and objection buckets.',
      'Use response templates by objection type.',
      'Ask one qualification question before booking.',
      'Confirm business pain and next-step value in writing.',
      'Automate reminders for unresponsive warm replies.'
    ],
    useCases: ['SDR inbox management', 'Founder-led outbound follow-up', 'Agency campaign triage'],
    tips: ['Speed matters: answer warm replies within business hours.', 'Do not send calendar links before qualification context.'],
    faqs: [
      { question: 'How fast should I answer replies?', answer: 'Within the same day whenever possible for warm prospects.' },
      { question: 'Should every positive reply get a meeting?', answer: 'No. Qualify first to protect calendar quality and close rate.' }
    ],
    relatedSlugs: ['apollo-cold-email-sequence-template', 'pipeline-management-playbook']
  },
  {
    slug: 'what-is-apollo-io',
    title: 'What is Apollo.io',
    description: 'A plain-English breakdown of what Apollo.io does, who it is for, and where it fits in a B2B GTM stack.',
    hub: 'find-clients',
    industries: ['saas-companies', 'marketing-agencies', 'it-services'],
    steps: [
      'Define Apollo as a prospecting and outbound execution platform.',
      'Map its role in your stack: data, enrichment, sequencing, and workflow speed.',
      'Identify core jobs-to-be-done for your sales motion.',
      'Compare Apollo use by team stage: founder-led, SDR team, and RevOps-led.',
      'Run a 14-day pilot with one segment before broader rollout.'
    ],
    useCases: [
      'New SaaS team building first outbound process',
      'Agency owner creating repeatable lead sourcing',
      'IT services team improving decision-maker coverage'
    ],
    tips: [
      'Start with one ICP and one offer before scaling.',
      'Use Apollo as an operating layer, not only a contact list.',
      'Track meeting quality, not just activity volume.'
    ],
    faqs: [
      {
        question: 'Is Apollo.io only a lead database?',
        answer: 'No. It combines contact data, enrichment, and outbound execution workflows.'
      },
      {
        question: 'Who should use Apollo first?',
        answer: 'Startup and SMB teams that need speed and clear outbound process ownership.'
      }
    ],
    relatedSlugs: ['apollo-io-review-2026', 'how-apollo-io-works', 'apollo-io-features-overview']
  },
  {
    slug: 'apollo-io-review-2026',
    title: 'Apollo.io Review (2026)',
    description: 'A practical Apollo.io review for US B2B teams: performance, data quality, workflow fit, and execution tradeoffs.',
    hub: 'find-clients',
    industries: ['saas-companies', 'consulting-firms', 'financial-services'],
    steps: [
      'Define review criteria: fit, workflow speed, data quality, and scalability.',
      'Evaluate data quality by segment and region.',
      'Test list-building and sequence launch time.',
      'Review team adoption and process overhead.',
      'Summarize strengths, weaknesses, and best-fit scenarios.'
    ],
    useCases: [
      'Founder-led outbound review before annual tool decisions',
      'RevOps audit for SDR efficiency',
      'Agency tool recommendation benchmark'
    ],
    tips: [
      'Judge Apollo by pipeline outcomes, not feature checklists.',
      'Segment-level data quality matters more than global averages.',
      'Re-test performance every quarter as process changes.'
    ],
    faqs: [
      {
        question: 'Is Apollo.io good for startups in 2026?',
        answer: 'For many startups, yes. It often balances speed, usability, and cost better than enterprise-heavy stacks.'
      },
      {
        question: 'What is Apollo weakest at?',
        answer: 'It can underperform when teams lack segmentation discipline or process QA.'
      }
    ],
    relatedSlugs: ['is-apollo-io-worth-it', 'apollo-io-pros-and-cons', 'apollo-io-pricing-explained']
  },
  {
    slug: 'is-apollo-io-worth-it',
    title: 'Is Apollo.io Worth It',
    description: 'A decision framework to evaluate Apollo ROI by team size, sales motion, and expected pipeline output.',
    hub: 'for-startups',
    industries: ['saas-companies', 'marketing-agencies', 'consulting-firms'],
    steps: [
      'Set baseline outbound metrics before using Apollo.',
      'Estimate expected ROI from list quality and workflow speed.',
      'Model credit usage and team process capacity.',
      'Run 30-day pilot and compare against baseline.',
      'Decide keep, adjust, or replace based on measured results.'
    ],
    useCases: [
      'Bootstrapped startup deciding first outbound platform',
      'Agency reducing tool sprawl',
      'Consulting firm validating outbound economics'
    ],
    tips: [
      'Worth is context-dependent: segment fit and process quality drive outcomes.',
      'If your offer is weak, no tool can fix conversion.',
      'Use one KPI set across the full pilot window.'
    ],
    faqs: [
      {
        question: 'When is Apollo not worth it?',
        answer: 'When team execution discipline is low or ICP is undefined.'
      },
      {
        question: 'What is a realistic trial period?',
        answer: 'At least 30 days with weekly iteration and quality checks.'
      }
    ],
    relatedSlugs: ['apollo-io-review-2026', 'apollo-io-pricing-explained', 'apollo-io-for-beginners']
  },
  {
    slug: 'apollo-io-pricing-explained',
    title: 'Apollo.io Pricing Explained',
    description: 'How Apollo.io pricing works in practice: plan logic, credit usage, and cost control by team type.',
    hub: 'sales-pipeline',
    industries: ['saas-companies', 'marketing-agencies', 'manufacturing'],
    steps: [
      'Map plan tiers to your workflow needs.',
      'Estimate monthly credit burn by segment volume.',
      'Build cost-control rules for exports and enrichment.',
      'Align seat allocation with campaign ownership.',
      'Review spend against pipeline contribution each month.'
    ],
    useCases: [
      'CFO + RevOps budgeting discussion',
      'Startup GTM stack planning',
      'Agency scaling campaign accounts'
    ],
    tips: [
      'Most overspend comes from weak segmentation and duplicate workflows.',
      'Set simple credit governance before team expansion.',
      'Tie spend review to meeting quality and pipeline velocity.'
    ],
    faqs: [
      {
        question: 'What drives Apollo cost the most?',
        answer: 'Credit consumption and team process quality usually drive total cost more than headline plan price.'
      },
      {
        question: 'How often should pricing fit be re-evaluated?',
        answer: 'Monthly for fast-growing teams and quarterly for stable teams.'
      }
    ],
    relatedSlugs: ['is-apollo-io-worth-it', 'apollo-io-review-2026', 'pipeline-management-playbook']
  },
  {
    slug: 'apollo-io-features-overview',
    title: 'Apollo.io Features Overview',
    description: 'A practical features walkthrough of Apollo.io with context on what matters for real outbound execution.',
    hub: 'find-clients',
    industries: ['saas-companies', 'recruiters', 'it-services'],
    steps: [
      'Review core modules: search, enrichment, sequencing, and reporting.',
      'Prioritize features by your current bottleneck.',
      'Configure only what is needed for first campaign launch.',
      'Test feature usage against process speed and quality.',
      'Document feature decisions for team consistency.'
    ],
    useCases: [
      'SDR onboarding and enablement',
      'Founder-led setup before first campaign',
      'Recruiting outreach process design'
    ],
    tips: [
      'Feature depth matters less than operational clarity.',
      'Choose fewer workflows and run them consistently.',
      'Treat setup as GTM operations, not just UI clicks.'
    ],
    faqs: [
      {
        question: 'What Apollo features matter most at the start?',
        answer: 'Search filters, list quality control, and sequence execution are usually the highest-impact early features.'
      },
      {
        question: 'Should every feature be enabled immediately?',
        answer: 'No. Start narrow and expand only when process maturity supports it.'
      }
    ],
    relatedSlugs: ['what-is-apollo-io', 'how-apollo-io-works', 'apollo-io-setup-guide']
  },
  {
    slug: 'apollo-io-pros-and-cons',
    title: 'Apollo.io Pros and Cons',
    description: 'An honest breakdown of Apollo.io strengths and tradeoffs for startups, agencies, and scaling B2B teams.',
    hub: 'find-clients',
    industries: ['saas-companies', 'marketing-agencies', 'consulting-firms'],
    steps: [
      'List strengths by direct business impact.',
      'Document limitations by team stage and motion.',
      'Compare tradeoffs against alternatives and budget.',
      'Map known risks to mitigation steps.',
      'Decide fit by your current bottleneck.'
    ],
    useCases: [
      'Buyer committee evaluation before procurement',
      'Agency internal stack review',
      'Startup tool migration assessment'
    ],
    tips: [
      'Pros and cons are motion-dependent, not universal.',
      'Strong process can reduce most common Apollo drawbacks.',
      'Review tradeoffs quarterly as GTM model changes.'
    ],
    faqs: [
      {
        question: 'What is Apollo strongest at?',
        answer: 'Speed from list-building to campaign launch for lean outbound teams.'
      },
      {
        question: 'What is Apollo weakest at?',
        answer: 'It can become noisy when teams over-export and under-qualify leads.'
      }
    ],
    relatedSlugs: ['apollo-io-review-2026', 'is-apollo-io-worth-it', 'apollo-io-features-overview']
  },
  {
    slug: 'apollo-io-for-beginners',
    title: 'Apollo.io for Beginners',
    description: 'A beginner-friendly Apollo.io guide to launch your first outbound workflow without unnecessary complexity.',
    hub: 'for-startups',
    industries: ['saas-companies', 'marketing-agencies', 'recruiters'],
    steps: [
      'Set one ICP and one campaign goal.',
      'Build your first clean lead list.',
      'Create a short 4-touch sequence.',
      'Launch and monitor replies daily.',
      'Run weekly review and improve one variable.'
    ],
    useCases: [
      'First-time founder using outbound',
      'Junior SDR onboarding',
      'Agency operator learning modern prospecting'
    ],
    tips: [
      'Beginner success comes from process consistency, not complexity.',
      'Do not scale volume until first segment works.',
      'Use simple message structures and clear CTA.'
    ],
    faqs: [
      {
        question: 'How long does beginner setup take?',
        answer: 'Most teams can launch a first practical campaign in one focused day.'
      },
      {
        question: 'What is the biggest beginner mistake?',
        answer: 'Trying too many segments before validating one repeatable workflow.'
      }
    ],
    relatedSlugs: ['apollo-io-setup-guide', 'apollo-io-tutorial-step-by-step', 'what-is-apollo-io']
  },
  {
    slug: 'how-apollo-io-works',
    title: 'How Apollo.io Works',
    description: 'A practical explanation of the Apollo workflow from targeting to outreach execution and pipeline handoff.',
    hub: 'outreach',
    industries: ['saas-companies', 'consulting-firms', 'it-services'],
    steps: [
      'Build list segments by ICP and role.',
      'Enrich and clean records before activation.',
      'Launch sequence with role-based messaging.',
      'Process replies and qualify opportunities.',
      'Sync learnings back into segmentation and messaging.'
    ],
    useCases: [
      'SDR workflow design',
      'Founder-led outbound system build',
      'RevOps process documentation'
    ],
    tips: [
      'Workflow clarity beats feature overload.',
      'Reply handling quality determines downstream close rate.',
      'Use weekly loops, not one-time setup.'
    ],
    faqs: [
      {
        question: 'Does Apollo replace CRM workflows?',
        answer: 'Usually no. Apollo works best as prospecting and outbound execution layer alongside CRM discipline.'
      },
      {
        question: 'Where do most teams lose performance?',
        answer: 'Between list quality and follow-up quality, not in campaign launch itself.'
      }
    ],
    relatedSlugs: ['apollo-io-features-overview', 'apollo-io-setup-guide', 'apollo-io-tutorial-step-by-step']
  },
  {
    slug: 'apollo-io-setup-guide',
    title: 'Apollo.io Setup Guide',
    description: 'A complete setup guide for Apollo.io including account structure, campaign foundations, and QA checks.',
    hub: 'outreach',
    industries: ['saas-companies', 'marketing-agencies', 'it-services'],
    steps: [
      'Define workspace structure and naming conventions.',
      'Configure list filters and segmentation standards.',
      'Build sequence templates for core offers.',
      'Set QA rules for list and message quality.',
      'Launch first campaign and run post-launch inspection.'
    ],
    useCases: [
      'New outbound team onboarding',
      'Agency standard operating process setup',
      'Startup first outbound infrastructure launch'
    ],
    tips: [
      'Good setup is 80% process decisions, 20% tool configuration.',
      'Document standards so multiple reps can execute consistently.',
      'Keep first rollout narrow and measurable.'
    ],
    faqs: [
      {
        question: 'What should be configured first?',
        answer: 'ICP filters, segment naming, and first sequence template should be prioritized.'
      },
      {
        question: 'How do we avoid setup chaos?',
        answer: 'Use one owner, one rollout plan, and clear naming conventions for every campaign asset.'
      }
    ],
    relatedSlugs: ['apollo-io-for-beginners', 'apollo-io-tutorial-step-by-step', 'how-apollo-io-works']
  },
  {
    slug: 'apollo-io-tutorial-step-by-step',
    title: 'Apollo.io Tutorial Step-by-Step',
    description: 'A step-by-step Apollo tutorial from first list to first booked meeting with practical execution checkpoints.',
    hub: 'guides',
    industries: ['saas-companies', 'marketing-agencies', 'consulting-firms'],
    steps: [
      'Create ICP segment and build first target list.',
      'Review and enrich contact quality.',
      'Write sequence with role-specific value proposition.',
      'Launch campaign and monitor reply flow.',
      'Qualify replies and convert into booked meetings.'
    ],
    useCases: [
      'Hands-on new team training',
      'Founder outbound implementation sprint',
      'Agency campaign SOP tutorial'
    ],
    tips: [
      'Follow the same sequence for at least one week before major changes.',
      'Keep one clear success metric per stage.',
      'Document each iteration so team learning compounds.'
    ],
    faqs: [
      {
        question: 'Can this tutorial be completed in one day?',
        answer: 'Initial setup can be done in one day, but meaningful optimization requires weekly iteration.'
      },
      {
        question: 'What defines tutorial success?',
        answer: 'First qualified meeting with clear repeatable process notes.'
      }
    ],
    relatedSlugs: ['apollo-io-setup-guide', 'apollo-io-for-beginners', 'apollo-cold-email-sequence-template']
  }
];

export const getGuidesByHub = (hub: Exclude<HubKey, 'by-industry'>) =>
  guides.filter((guide) => guide.hub === hub);

export const getGuideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);

export const getGuidesByIndustry = (industrySlug: string) =>
  guides.filter((guide) => guide.industries.includes(industrySlug));
