import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'lib', 'content.ts');
let source = fs.readFileSync(file, 'utf8');

// All real guide slugs (guides array only: top-level `slug:` inside guide objects)
const normalized = source.replace(/\r\n/g, '\n');
const guideSlugs = new Set(
  [...normalized.matchAll(/\n    slug: '([^']+)',\n    title: '/g)].map((m) => m[1])
);

// industry slug -> replacement featured guides (must all exist)
const featured = {
  'veterinary-clinics': [
    'lead-generation-for-veterinary-clinics',
    'how-to-build-a-lead-list-in-apollo',
    'cold-email-with-apollo-io'
  ],
  'dental-practices': [
    'how-dental-practices-get-new-patients',
    'how-to-build-a-lead-list-in-apollo',
    'finding-decision-makers-with-apollo'
  ],
  'medical-device-companies': [
    'outbound-sales-for-medical-device-companies',
    'finding-decision-makers-with-apollo',
    'lead-qualification-system'
  ],
  'property-management': [
    'how-property-managers-get-clients',
    'how-cleaning-companies-get-commercial-clients',
    'how-to-build-a-lead-list-in-apollo'
  ],
  'commercial-cleaning': [
    'how-cleaning-companies-get-commercial-clients',
    'how-property-managers-get-clients',
    'cold-email-with-apollo-io'
  ],
  'landscaping-companies': [
    'how-landscaping-companies-get-clients',
    'how-property-managers-get-clients',
    'how-to-build-a-lead-list-in-apollo'
  ],
  'pest-control': [
    'how-pest-control-companies-get-clients',
    'how-property-managers-get-clients',
    'cold-email-with-apollo-io'
  ],
  'freight-brokerage': [
    'outbound-for-freight-brokers',
    'apollo-for-logistics-companies',
    'how-to-find-clients-for-logistics-companies'
  ],
  'event-management': [
    'lead-generation-for-event-management-companies',
    'how-to-build-a-lead-list-in-apollo',
    'cold-email-with-apollo-io'
  ],
  'translation-services': [
    'client-acquisition-for-translation-agencies',
    'how-to-find-business-emails-with-apollo',
    'cold-email-with-apollo-io'
  ],
  'pr-agencies': [
    'cold-email-for-pr-agencies',
    'how-to-build-a-lead-list-in-apollo',
    'personalization-at-scale-with-apollo'
  ],
  'executive-search-firms': [
    'outbound-for-executive-search-firms',
    'candidate-sourcing-with-apollo',
    'how-to-build-a-lead-list-in-apollo'
  ],
  'corporate-training': [
    'lead-generation-for-corporate-training-companies',
    'finding-decision-makers-with-apollo',
    'cold-email-with-apollo-io'
  ],
  'fractional-executives': [
    'client-acquisition-for-fractional-executives',
    'how-to-build-a-lead-list-in-apollo',
    'personalization-at-scale-with-apollo'
  ],
  'coworking-spaces': [
    'member-acquisition-for-coworking-spaces',
    'how-property-managers-get-clients',
    'cold-email-with-apollo-io'
  ],
  'nonprofit-organizations': [
    'lead-generation-for-nonprofit-organizations',
    'fundraising-outreach-for-nonprofits',
    'how-to-build-a-lead-list-in-apollo'
  ],
  'biotech-companies': [
    'outbound-sales-for-biotech-startups',
    'finding-decision-makers-with-apollo',
    'lead-qualification-system'
  ],
  'telecommunications': [
    'lead-generation-for-telecom-companies',
    'how-to-build-a-lead-list-in-apollo',
    'cold-email-with-apollo-io'
  ],
  'waste-management': [
    'b2b-lead-generation-for-waste-management',
    'how-property-managers-get-clients',
    'cold-email-with-apollo-io'
  ],
  'hr-technology': [
    'lead-generation-for-hr-tech-startups',
    'finding-decision-makers-with-apollo',
    'cold-email-with-apollo-io'
  ],
  'fintech': [
    'outbound-for-fintech-startups',
    'lead-qualification-system',
    'cold-email-with-apollo-io'
  ],
  'proptech': [
    'lead-generation-for-proptech-companies',
    'how-property-managers-get-clients',
    'apollo-io-api-tutorial'
  ],
  'contech': [
    'lead-generation-for-construction-tech-startups',
    'how-to-build-a-lead-list-in-apollo',
    'finding-decision-makers-with-apollo'
  ],
  'web-development-agencies': [
    'client-acquisition-for-web-development-agencies',
    'how-design-agencies-get-clients',
    'how-to-build-a-lead-list-in-apollo'
  ],
  'ux-design-agencies': [
    'how-design-agencies-get-clients',
    'client-acquisition-for-web-development-agencies',
    'cold-email-with-apollo-io'
  ],
  'payroll-peo': [
    'outbound-for-peo-companies',
    'how-to-build-a-lead-list-in-apollo',
    'finding-decision-makers-with-apollo'
  ],
  'insurtech': [
    'cold-email-for-insurtech-companies',
    'lead-qualification-system',
    'cold-email-with-apollo-io'
  ],
  'supply-chain-tech': [
    'outbound-for-supply-chain-tech',
    'apollo-for-logistics-companies',
    'b2b-lead-generation-for-distributors'
  ]
};

const missing = [];
for (const [industry, slugs] of Object.entries(featured)) {
  for (const slug of slugs) {
    if (!guideSlugs.has(slug)) missing.push(`${industry} -> ${slug}`);
  }
}
if (missing.length > 0) {
  console.error('ABORTED — unknown guide slugs:');
  for (const m of missing) console.error(' - ' + m);
  process.exit(1);
}

// Replace the featuredSlugs array on each industry block
const blocks = source.split(/\r?\n  \{\r?\n/);
let updated = 0;
for (let i = 1; i < blocks.length; i++) {
  const b = blocks[i];
  const slug = (b.match(/\bslug: '([^']+)'/) || [])[1];
  if (!slug || !featured[slug]) continue;
  if (!/featuredSlugs: \[/.test(b)) continue;
  blocks[i] = b.replace(
    /featuredSlugs: \[[^\]]*\]/,
    `featuredSlugs: [${featured[slug].map((s) => `'${s}'`).join(', ')}]`
  );
  updated++;
}

if (updated !== Object.keys(featured).length) {
  console.error(`ABORTED — updated ${updated} of ${Object.keys(featured).length} industries`);
  process.exit(1);
}

source = blocks.join('\n  {\n');
fs.writeFileSync(file, source, 'utf8');
console.log(`Updated featuredSlugs for ${updated} industries (${Object.keys(featured).length * 3} links verified)`);
