import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description: 'About the B2B Lead Generation Tools editorial team and what the site covers.',
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
      <HubHero
        title="About B2B Lead Generation Tools"
        description="We publish practical B2B lead generation, outbound, and Apollo workflow content for US-focused teams that need qualified pipeline, not generic growth advice."
        subtopics={['Outbound systems', 'Apollo workflows', 'B2B lead generation']}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">What we cover</h2>
        <p className="mt-4 text-slate-700">
          This site focuses on prospecting, cold email, lead qualification, pipeline building, and practical Apollo use cases. The goal is
          simple: help operators, founders, agencies, and sales teams build a cleaner outbound process with less wasted effort.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-900">Editorial focus</h2>
        <p className="mt-4 text-slate-700">
          We prioritize clarity, practical execution, and honest fit guidance. That means we highlight where Apollo is useful, where it is
          not the best fit, and what conditions need to be true before a workflow is likely to work.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-slate-900">Who writes the content</h2>
        <p className="mt-4 text-slate-700">
          Articles are published under <strong>B2B Lead Gen Tools Editorial</strong> and reviewed against our internal structure for search
          intent, topical relevance, clarity, and business usefulness. See <a className="text-blue-700 underline" href="/editorial-methodology">Editorial Methodology</a> for the evaluation framework.
        </p>
      </section>
    </Container>
  );
}

