import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { APOLLO_URL } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure',
  description: 'Affiliate disclosure and editorial policy.',
  path: '/affiliate-disclosure'
});

export default function AffiliateDisclosurePage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Affiliate Disclosure', item: `${siteConfig.url}/affiliate-disclosure` }
        ]}
      />
      <HubHero
        title="Affiliate Disclosure"
        description="Some pages include affiliate links. If you sign up through these links, we may earn a commission at no extra cost. Editorial opinions remain independent and based on practical usability."
        subtopics={['Clear disclosure', 'Editorial independence', 'No extra user cost']}
      />
      <section className="pb-16">
        <article className="article-content rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm text-slate-500">Last updated: April 2, 2026</p>

          <p>
            This disclosure explains how affiliate relationships work on <strong>{siteConfig.url}</strong>. The site publishes educational
            content about B2B lead generation, outbound sales, Apollo workflows, prospecting systems, and related software.
          </p>

          <h2>How affiliate links work</h2>
          <p>
            Some pages on this site include affiliate links. If you click one of those links and later sign up or make a purchase, we may
            receive a commission. This does <strong>not</strong> increase your price.
          </p>
          <p>
            At the moment, the main affiliate relationship used on the site is the Apollo referral link:{' '}
            <a href={APOLLO_URL} rel="nofollow sponsored noopener noreferrer" target="_blank">
              {APOLLO_URL}
            </a>
            .
          </p>

          <h2>Where affiliate links appear</h2>
          <ul>
            <li>CTA buttons such as &quot;Try Apollo&quot; or &quot;Try Apollo Free&quot;.</li>
            <li>Inline references to Apollo or Apollo.io where a direct referral link is appropriate.</li>
            <li>Selected comparison, review, tutorial, and business-type pages that recommend Apollo as a practical option.</li>
          </ul>

          <h2>How links are marked</h2>
          <p>
            External commercial Apollo links are marked with <code>nofollow sponsored noopener noreferrer</code>. This is intended to reduce
            search-engine confusion and clearly separate editorial pages from paid or referral relationships.
          </p>

          <h2>Editorial independence</h2>
          <p>
            Affiliate relationships do not determine page structure, conclusions, or which topics are covered. Pages are written and edited to
            answer search intent, explain workflow tradeoffs, and help readers decide whether a tool or process is a real fit.
          </p>
          <p>
            We aim to avoid exaggerated claims, guaranteed revenue statements, or absolute promises about deliverability, compliance, or
            business results. Readers should always validate software pricing, feature availability, and vendor policies directly with the
            provider.
          </p>

          <h2>What we try to optimize for</h2>
          <ul>
            <li>Clear fit guidance: who a workflow is for and who should avoid it.</li>
            <li>Practical use cases instead of generic feature hype.</li>
            <li>Strong internal linking so readers can move from problem to solution more easily.</li>
            <li>Visible disclosure on pages where commercial referral intent is relevant.</li>
          </ul>

          <h2>No additional cost to the reader</h2>
          <p>
            Using an affiliate link should not increase the price you pay. If the commercial terms on a vendor website change, those terms are
            controlled by the vendor, not by this site.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about affiliate relationships, advertising, or commercial cooperation, contact us at{' '}
            <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>.
          </p>
        </article>
      </section>
    </Container>
  );
}
