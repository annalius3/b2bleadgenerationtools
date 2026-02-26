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
  }
];

export const getGuidesByHub = (hub: Exclude<HubKey, 'by-industry'>) =>
  guides.filter((guide) => guide.hub === hub);

export const getGuideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);

export const getGuidesByIndustry = (industrySlug: string) =>
  guides.filter((guide) => guide.industries.includes(industrySlug));
