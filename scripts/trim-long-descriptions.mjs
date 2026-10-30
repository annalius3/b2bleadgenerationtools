import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'lib', 'content.ts');
const lines = fs.readFileSync(file, 'utf8').split('\n');

// slug -> new metaDescription (guides)
const guideMeta = {
  'find-companies-using-competitor-software-apollo':
    'Step-by-step guide to finding companies that already run competing software. Use Apollo tech stack filters to win their best customers.',
  'apollo-intent-signals-find-buying-companies':
    'Use Apollo.io intent signals to find companies actively researching your category, then prioritize outreach for higher conversion rates.',
  'b2b-objection-handling-framework':
    'Master B2B sales objections with a practical framework, common pushbacks, and exact responses that turn a no into a next step.',
  'outbound-sales-for-medical-device-companies':
    'How medical device companies build outbound pipelines: mapping clinical and procurement stakeholders, hospital sales cycles, and getting past gatekeepers.',
  'how-property-managers-get-clients':
    'Proven strategies for property management companies to win residential and commercial contracts through owner outreach and Apollo targeting.',
  'how-landscaping-companies-get-clients':
    'Landscaping companies share how they win commercial and HOA contracts: property manager targeting, seasonal revenue, and better positioning.',
  'how-pest-control-companies-get-clients':
    'Lead generation for pest control companies: targeting property managers, building annual service contracts, and referral pipelines from agents.',
  'outbound-for-freight-brokers':
    'How freight brokers build shipper pipelines: shipping volume signals, logistics decision-makers, and outreach that earns trust in a relationship market.',
  'lead-generation-for-event-management-companies':
    'How event management companies win corporate contracts: reaching budget holders, timing outreach to planning cycles, and building venue referral channels.',
  'lead-generation-for-corporate-training-companies':
    'How corporate training companies win contracts: reaching L&D directors, spotting skills gap triggers, and positioning training as a business outcome.',
  'lead-generation-for-hr-tech-startups':
    'How HR tech startups build pipelines: targeting CHROs at growth-stage companies, spotting HRIS replacement triggers, and positioning against incumbents.',
  'client-acquisition-for-web-development-agencies':
    'How web development agencies win projects: niche specialization, tech stack targeting with Apollo, and positioning against offshore and no-code options.',
  'apollo-io-chrome-extension-guide':
    'How to install, configure, and actually use the Apollo Chrome extension on LinkedIn and company sites, including the credit mistakes that waste your plan.',
  'how-to-build-an-email-list-legally':
    'A practical guide to building a B2B email list legally: where to source contacts, what consent requires, CAN-SPAM and GDPR rules, and domain protection.',
  'cold-email-deliverability-tools-compared':
    'Comparison of cold email deliverability tools: warm-up services, verification, inbox placement testers, and DNS checkers, with what each one actually fixes.',
  'outbound-for-executive-search-firms':
    'How executive search firms win retained mandates: reaching CEOs at growth-stage companies, investor referrals, and positioning against contingency recruiters.',
  'outbound-for-peo-companies':
    'How PEO and payroll companies build outbound pipelines: targeting companies at growth inflection points, reaching founders, and positioning against ADP and Gusto.',
  'client-acquisition-for-translation-agencies':
    'How translation agencies win localization contracts: targeting companies with international expansion signals and positioning around revenue impact.',
  'outbound-for-fintech-startups':
    'How fintech startups build outbound pipelines: reaching CFOs with trust-first messaging, handling compliance objections, and positioning against banks.',
  'candidate-sourcing-with-apollo':
    'How to source candidates with Apollo instead of paying for LinkedIn Recruiter: filter setups, outreach templates, and credit habits for staffing teams.',
  'client-acquisition-for-fractional-executives':
    'Client acquisition for fractional CMOs, CFOs, and operators: founder-led outreach, LinkedIn authority building, and positioning the fractional model.',
  'cold-email-for-commercial-real-estate-brokers':
    'Cold email for commercial real estate brokers: targeting property investors, reaching acquisition teams, and writing outreach that earns trust in a relationship market.',
  'fundraising-outreach-for-nonprofits':
    'Fundraising outreach for nonprofits: reaching CSR managers, building corporate partnership proposals, and designing employee engagement programs funders say yes to.',
  'cold-email-for-insurtech-companies':
    'How insurtech companies reach carriers, brokers, and MGAs with cold email: targeting digital transformation leaders and handling legacy objections.',
  'lead-generation-for-construction-tech-startups':
    'How construction tech startups build pipelines: reaching project managers and VPs of Operations at general contractors and positioning for field adoption.',
  'outbound-for-supply-chain-tech':
    'How supply chain tech companies build pipelines: reaching logistics directors with disruption messaging, handling ERP objections, and selling to buying committees.'
};

// slug -> new visible description (business types)
const industryDesc = {
  'fractional-executives':
    'Help fractional CMOs, CFOs, and operators win advisory clients through founder-led outreach and referrals.',
  'pest-control':
    'Build recurring revenue for pest control companies with property manager outreach and commercial contracts.',
  'waste-management':
    'Win commercial waste and recycling contracts by reaching facility, property, and operations managers.',
  'landscaping-companies':
    'Win commercial and high-end residential contracts through seasonal outreach and property manager partnerships.',
  'payroll-peo':
    'Win payroll and PEO contracts by reaching founders, CFOs, and HR leaders at growing companies.'
};

const findBlockStart = (slug) =>
  lines.findIndex((line) => line.trim() === `slug: '${slug}',`);

const replaceField = (slug, field, value) => {
  const start = findBlockStart(slug);
  if (start === -1) return `slug not found: ${slug}`;
  for (let i = start + 1; i < Math.min(start + 14, lines.length); i++) {
    if (lines[i].trim().startsWith(`${field}:`)) {
      const indent = lines[i].match(/^\s*/)[0];
      lines[i] = `${indent}${field}: '${value}',`;
      return null;
    }
  }
  return `field ${field} not found near ${slug}`;
};

const errors = [];
for (const [slug, value] of Object.entries(guideMeta)) {
  const err = replaceField(slug, 'metaDescription', value);
  if (err) errors.push(err);
}
for (const [slug, value] of Object.entries(industryDesc)) {
  const err = replaceField(slug, 'description', value);
  if (err) errors.push(err);
}

if (errors.length > 0) {
  console.error('ABORTED — no changes written:');
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
}

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log(
  `Updated ${Object.keys(guideMeta).length} guide meta descriptions and ${Object.keys(industryDesc).length} industry descriptions`
);
