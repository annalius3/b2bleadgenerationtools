import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Editorial Methodology',
  description: 'How B2B Lead Generation Tools reviews Apollo workflows, prospecting strategies, and outbound processes.',
  path: '/editorial-methodology'
});

export default function EditorialMethodologyPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Editorial Methodology', item: `${siteConfig.url}/editorial-methodology` }
        ]}
      />
      <HubHero
        title="Editorial Methodology"
        description="Our content is structured to answer search intent clearly, explain where a workflow fits, and avoid exaggerated claims that cannot be verified."
        subtopics={['Search intent first', 'Practical use cases', 'Independent editorial judgment']}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">How we review a topic</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>We define the query intent first: review, tutorial, comparison, pricing, or strategic guide.</li>
          <li>We map the workflow around real B2B use cases such as founder-led outbound, agency prospecting, or pipeline management.</li>
          <li>We evaluate where Apollo fits well and where another process or tool may be better.</li>
          <li>We avoid guaranteed claims about deliverability, compliance, or revenue outcomes.</li>
          <li>We update articles when structure, clarity, or product context materially changes.</li>
        </ul>
        <h2 className="mt-8 text-2xl font-semibold text-slate-900">What we optimize for</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Clear targeting and business fit.</li>
          <li>Actionable steps instead of generic marketing language.</li>
          <li>Internal linking to related workflows and adjacent problems.</li>
          <li>Honest drawbacks, edge cases, and &quot;when not to use&quot; guidance.</li>
        </ul>
        <h2 className="mt-8 text-2xl font-semibold text-slate-900">Affiliate policy</h2>
        <p className="mt-4 text-slate-700">
          Some pages include affiliate links. Commercial relationships do not control editorial structure or page conclusions. For more,
          see <a className="text-blue-700 underline" href="/affiliate-disclosure">Affiliate Disclosure</a>.
        </p>
      </section>
    </Container>
  );
}


