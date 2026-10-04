import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema, PersonSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description: 'About the B2B Lead Generation Tools editorial team — Katya, B2B marketing expert, how we review guides, and why teams trust our outbound playbooks.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'About', item: `${siteConfig.url}/about` }
        ]}
      />
      <PersonSchema
        name="Katya"
        jobTitle="B2B Marketing Expert & Lead Generation Strategist"
        url={`${siteConfig.url}/about`}
        description="Katya is a B2B marketing expert with 10+ years of experience building outbound systems, cold email campaigns, and lead generation pipelines for SaaS companies, agencies, and service businesses. She founded B2B Lead Generation Tools to share the playbooks she uses with real clients."
        knowsAbout={[
          'B2B Lead Generation',
          'Cold Email Outreach',
          'Apollo.io',
          'Outbound Sales',
          'Sales Pipeline Management',
          'Account-Based Marketing',
          'Marketing Strategy'
        ]}
        sameAs={[
          'https://github.com/annalius3/b2bleadgenerationtools'
        ]}
      />
      <HubHero
        title="About B2B Lead Generation Tools"
        description="We publish practical B2B lead generation, outbound, and Apollo workflow content for US-focused teams that need qualified pipeline, not generic growth advice."
        subtopics={['Outbound systems', 'Apollo workflows', 'B2B lead generation']}
      />

      <section className="space-y-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">What we cover</h2>
          <p className="mt-4 text-slate-700">
            This site focuses on prospecting, cold email, lead qualification, pipeline building, and practical Apollo use cases. The goal is
            simple: help operators, founders, agencies, and sales teams build a cleaner outbound process with less wasted effort.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">226+ Guides</p>
              <p className="mt-1 text-sm text-slate-600">Step-by-step workflows for lead generation, outreach, and pipeline management.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">20 Industries</p>
              <p className="mt-1 text-sm text-slate-600">Niche-specific playbooks for agencies, SaaS, healthcare, manufacturing, and more.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">US B2B Focus</p>
              <p className="mt-1 text-sm text-slate-600">All content is built for US-focused B2B teams and outbound-first organizations.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Editorial focus</h2>
          <p className="mt-4 text-slate-700">
            We prioritize clarity, practical execution, and honest fit guidance. That means we highlight where Apollo is useful, where it is
            not the best fit, and what conditions need to be true before a workflow is likely to work.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>Search intent first — every guide answers a specific query with actionable structure.</li>
            <li>Honest pros, cons, and &quot;when not to use&quot; guidance for every workflow.</li>
            <li>Internal linking to related guides, hubs, and industry pages.</li>
            <li>Regular updates when product context or best practices change.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Who writes the content</h2>
          <p className="mt-4 text-slate-700">
            Every guide is written and reviewed by <strong>Katya</strong>, a B2B marketing expert with 10+ years building outbound systems,
            cold email campaigns, and lead generation pipelines for SaaS companies, agencies, and service businesses. Katya tests every
            workflow with real client accounts before publishing it.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-800">Katya — Lead Author</p>
              <p className="mt-1 text-sm text-slate-700">B2B marketing expert focused on outbound systems, Apollo workflows, and pipeline strategy.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Hands-on testing</p>
              <p className="mt-1 text-sm text-slate-600">Every workflow is run against real accounts before it is recommended.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Editorial review</p>
              <p className="mt-1 text-sm text-slate-600">Guides are checked against our editorial methodology before publishing.</p>
            </div>
          </div>
          <p className="mt-4 text-slate-700">
            Published guides are reviewed against our internal structure for search intent, topical relevance, clarity, and business
            usefulness. Every guide goes through our{' '}
            <a className="text-blue-700 underline" href="/editorial-methodology">editorial methodology</a> before publishing.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">How we make money</h2>
          <p className="mt-4 text-slate-700">
            Some pages include affiliate links to tools we recommend. Affiliate relationships never control editorial conclusions, guide
            structure, or comparison tables. See our{' '}
            <a className="text-blue-700 underline" href="/affiliate-disclosure">affiliate disclosure</a> for details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-4 text-slate-700">
            For business inquiries, partnership opportunities, or content suggestions, reach us at{' '}
            <a className="text-blue-700 underline" href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>.
          </p>
        </div>
      </section>
    </Container>
  );
}
