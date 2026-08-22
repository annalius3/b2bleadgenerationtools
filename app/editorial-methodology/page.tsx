import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Editorial Methodology',
  description: 'How B2B Lead Generation Tools reviews Apollo workflows, prospecting strategies, and outbound processes for accuracy and usefulness.',
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
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
          <li><strong>Search intent mapping:</strong> We define the query intent first — review, tutorial, comparison, pricing, or strategic guide — and structure the page around that intent.</li>
          <li><strong>Use case validation:</strong> We map the workflow around real B2B use cases such as founder-led outbound, agency prospecting, or pipeline management.</li>
          <li><strong>Tool fit analysis:</strong> We evaluate where Apollo fits well and where another process or tool may be better. We highlight both.</li>
          <li><strong>Honest limitations:</strong> We avoid guaranteed claims about deliverability, compliance, or revenue outcomes. Every guide includes drawbacks and &quot;when not to use&quot; guidance.</li>
          <li><strong>Regular updates:</strong> We update articles when structure, clarity, or product context materially changes.</li>
        </ol>

        <h2 className="mt-10 text-2xl font-semibold text-slate-900">What we optimize for</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li><strong>Clear targeting and business fit</strong> — every guide explains who it is for and who should skip it.</li>
          <li><strong>Actionable steps</strong> instead of generic marketing language.</li>
          <li><strong>Internal linking</strong> to related workflows and adjacent problems.</li>
          <li><strong>Honest drawbacks</strong>, edge cases, and &quot;when not to use&quot; guidance.</li>
          <li><strong>Comparison tables</strong> that help readers choose between approaches.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold text-slate-900">Content quality signals</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">FAQ sections</p>
            <p className="mt-1 text-sm text-slate-600">Every guide includes frequently asked questions with structured FAQ schema for rich snippets.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">HowTo schema</p>
            <p className="mt-1 text-slate-600 text-sm">Tutorial and playbook guides include HowTo structured data for step-based rich results.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Comparison tables</p>
            <p className="mt-1 text-sm text-slate-600">Feature and pricing comparisons with clear verdict columns for quick decision-making.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Implementation checklists</p>
            <p className="mt-1 text-sm text-slate-600">Step-by-step checklists to help teams execute workflows without missing critical steps.</p>
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-semibold text-slate-900">Affiliate policy</h2>
        <p className="mt-4 text-slate-700">
          Some pages include affiliate links. Commercial relationships do not control editorial structure or page conclusions. For more,
          see <a className="text-blue-700 underline" href="/affiliate-disclosure">Affiliate Disclosure</a>.
        </p>
      </section>
    </Container>
  );
}
