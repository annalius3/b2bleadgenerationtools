import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const FILE = resolve(process.cwd(), 'src/lib/content.ts');
let content = readFileSync(FILE, 'utf8');

// Collect real guide slugs (only from `slug:` keys in guides array — content.ts guide entries)
const slugRegex = /slug:\s*'([a-z0-9-]+)'/g;
const existingSlugs = new Set();
let m;
while ((m = slugRegex.exec(content)) !== null) existingSlugs.add(m[1]);

// Manually curated replacements: broken slug -> best real guide slug
const manualFixes = {
  'apollo-io-features-and-capabilities': 'apollo-io-features-overview',
  'cold-email-best-practices': 'apollo-email-deliverability-best-practices',
  'find-decision-makers-with-apollo': 'finding-decision-makers-with-apollo',
  'cold-email-openers-that-get-replies': 'writing-cold-email-openers-that-get-read',
  'personalization-at-scale': 'personalization-at-scale-with-apollo',
  'email-deliverability-checklist': 'apollo-email-deliverability-best-practices',
  'deal-closing-strategies': 'deal-closing-strategies-b2b',
  'founder-led-outbound-sales': 'b2b-sales-prospecting-for-founders',
  'b2b-client-acquisition-system': 'how-to-build-a-b2b-client-acquisition-system',
  'apollo-vs-zoominfo': 'apollo-vs-zoominfo-for-small-business',
  'best-lead-gen-tools-for-small-business': 'best-lead-generation-tools-for-small-business',
  'how-to-choose-lead-gen-tool': 'how-to-choose-a-lead-generation-tool',
  // niche: broken -> correct niche guide
  'cold-email-for-commercial-cleaning-companies': 'how-cleaning-companies-get-commercial-clients',
  'lead-generation-for-dental-practices': 'how-dental-practices-get-new-patients',
  'lead-generation-for-property-management': 'how-property-managers-get-clients',
  'lead-generation-for-cleaning-companies': 'how-cleaning-companies-get-commercial-clients',
  'lead-generation-for-pest-control-companies': 'how-pest-control-companies-get-clients',
  'apollo-for-landscaping-companies': 'how-landscaping-companies-get-clients',
  'lead-generation-for-landscaping-companies': 'how-landscaping-companies-get-clients',
  'lead-generation-for-freight-companies': 'outbound-for-freight-brokers',
  'apollo-for-event-companies': 'lead-generation-for-event-management-companies',
  'cold-email-for-event-planners': 'lead-generation-for-event-management-companies',
  'lead-generation-for-translation-companies': 'client-acquisition-for-translation-agencies',
  'apollo-for-localization-agencies': 'client-acquisition-for-translation-agencies',
  'apollo-for-pr-firms': 'cold-email-for-pr-agencies',
  'lead-generation-for-pr-agencies': 'cold-email-for-pr-agencies',
  'apollo-for-executive-recruiters': 'outbound-for-executive-search-firms',
  'lead-generation-for-search-firms': 'outbound-for-executive-search-firms',
  'apollo-for-training-providers': 'lead-generation-for-corporate-training-companies',
  'cold-email-for-corporate-training': 'lead-generation-for-corporate-training-companies',
  'how-fractional-cmos-get-clients': 'client-acquisition-for-fractional-executives',
  'apollo-for-fractional-cfo': 'client-acquisition-for-fractional-executives',
  'apollo-for-coworking-operators': 'member-acquisition-for-coworking-spaces',
  'lead-generation-for-coworking-spaces': 'member-acquisition-for-coworking-spaces',
  'apollo-for-nonprofits': 'lead-generation-for-nonprofit-organizations',
  'apollo-for-biotech-companies': 'outbound-sales-for-biotech-startups',
  'lead-generation-for-biotech': 'outbound-sales-for-biotech-startups',
  'apollo-for-telecom-sales': 'lead-generation-for-telecom-companies',
  'cold-email-for-telecommunications': 'lead-generation-for-telecom-companies',
  'cold-email-for-waste-management-companies': 'b2b-lead-generation-for-waste-management',
  'apollo-for-waste-companies': 'b2b-lead-generation-for-waste-management',
  'apollo-for-hr-tech': 'lead-generation-for-hr-tech-startups',
  'outbound-for-hr-software': 'lead-generation-for-hr-tech-startups',
  'apollo-for-fintech-sales': 'outbound-for-fintech-startups',
  'lead-generation-for-fintech': 'outbound-for-fintech-startups',
  'apollo-for-proptech': 'lead-generation-for-proptech-companies',
  'outbound-sales-for-real-estate-tech': 'lead-generation-for-proptech-companies',
  'apollo-for-contech-companies': 'lead-generation-for-construction-tech-startups',
  'outbound-for-construction-software': 'lead-generation-for-construction-tech-startups',
  'apollo-for-web-development-agencies': 'client-acquisition-for-web-development-agencies',
  'how-dev-agencies-get-clients': 'client-acquisition-for-web-development-agencies',
  'lead-generation-for-design-agencies': 'how-design-agencies-get-clients',
  'apollo-for-ux-agencies': 'how-design-agencies-get-clients',
  'lead-generation-for-payroll-services': 'outbound-for-peo-companies',
  'apollo-for-peo-sales': 'outbound-for-peo-companies',
  'apollo-for-insurtech-sales': 'cold-email-for-insurtech-companies',
  'lead-generation-for-insurtech': 'cold-email-for-insurtech-companies',
  'apollo-for-supply-chain-companies': 'outbound-for-supply-chain-tech',
  'lead-generation-for-supply-chain-software': 'outbound-for-supply-chain-tech',
  // no real equivalent -> remove from relatedSlugs
  'intent-data-strategy-for-outbound': null,
  'startup-outbound-playbook': null
};

// Validate manual fixes exist as guides
for (const [bad, good] of Object.entries(manualFixes)) {
  if (good !== null && !existingSlugs.has(good)) {
    console.error(`INVALID FIX: ${bad} -> ${good} (not a real slug)`);
    process.exit(1);
  }
}

let fixedCount = 0;
let removedCount = 0;
let stillBroken = [];

// Rewrite ONLY inside relatedSlugs arrays
content = content.replace(/relatedSlugs:\s*\[([^\]]*)\]/g, (match, inner) => {
  const items = inner.match(/'([a-z0-9-]+)'/g) || [];
  const out = [];
  for (const raw of items) {
    const slug = raw.replace(/'/g, '');
    if (existingSlugs.has(slug)) { out.push(raw); continue; }
    if (slug in manualFixes) {
      const fix = manualFixes[slug];
      if (fix === null) { removedCount++; continue; }
      out.push(`'${fix}'`);
      fixedCount++;
    } else {
      stillBroken.push(slug);
      // leave it (template filters broken refs safely)
      out.push(raw);
    }
  }
  return `relatedSlugs: [${out.join(', ')}]`;
});

writeFileSync(FILE, content, 'utf8');
console.log(`Fixed: ${fixedCount}, Removed: ${removedCount}`);
if (stillBroken.length) console.log(`Still broken (unmapped): ${[...new Set(stillBroken)].join(', ')}`);
