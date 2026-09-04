import Link from 'next/link';
import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { NewsletterForm } from '@/components/newsletter-form';
import { ApolloCtaBlock } from '@/components/apollo-cta-block';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { BreadcrumbSchema } from '@/components/seo-schemas';

export const metadata: Metadata = buildMetadata({
  title: 'Start Here | Your Guide to B2B Lead Generation',
  description:
    'New to B2B lead generation? Start here. We\'ll help you find the right guides, tools, and strategies to build a predictable sales pipeline.',
  path: '/start-here'
});

const steps = [
  {
    number: '01',
    title: 'Define Your Ideal Customer',
    description: 'Before you send a single email, know exactly who you\'re targeting. Get clear on industry, company size, and buyer role.',
    link: '/find-clients',
    linkText: 'Find Clients Hub',
    guides: ['how-to-find-companies-to-sell-to', 'account-based-prospecting-framework', 'identifying-buying-signals']
  },
  {
    number: '02',
    title: 'Build Your Lead List',
    description: 'Use Apollo.io to find verified contacts that match your ideal customer profile. Focus on quality over quantity.',
    link: '/guides/apollo-io-features-and-capabilities',
    linkText: 'Apollo.io Features',
    guides: ['how-to-build-a-lead-list-in-apollo', 'how-to-find-b2b-leads-with-apollo-io', 'find-decision-makers-with-apollo']
  },
  {
    number: '03',
    title: 'Craft Your Outreach',
    description: 'Write cold emails that get replies. Personalize at scale, warm up your domain, and follow up strategically.',
    link: '/outreach',
    linkText: 'Outreach Hub',
    guides: ['cold-email-best-practices', 'ai-personalized-cold-emails-at-scale', 'cold-email-domain-warmup-strategy']
  },
  {
    number: '04',
    title: 'Build Your Pipeline',
    description: 'Turn replies into meetings, meetings into proposals, and proposals into closed deals. Systematize your sales process.',
    link: '/sales-pipeline',
    linkText: 'Sales Pipeline Hub',
    guides: ['pipeline-management-playbook', 'b2b-objection-handling-framework', 'b2b-proposal-template-that-closes']
  },
  {
    number: '05',
    title: 'Scale Your Outreach',
    description: 'Once your process works, it\'s time to scale. Hire your first SDR, automate workflows, and expand to new channels.',
    link: '/for-startups',
    linkText: 'For Startups Hub',
    guides: ['startup-outbound-playbook', 'hire-first-sdr-startup', 'product-led-growth-outbound-hybrid']
  }
];

const popularGuides = [
  { slug: 'apollo-io-features-and-capabilities', title: 'Apollo.io Features & Capabilities' },
  { slug: 'cold-email-best-practices', title: 'Cold Email Best Practices' },
  { slug: 'pipeline-management-playbook', title: 'Pipeline Management Playbook' },
  { slug: 'how-to-find-b2b-leads-with-apollo-io', title: 'How to Find B2B Leads with Apollo' },
  { slug: 'b2b-sales-process-optimization', title: 'B2B Sales Process Optimization' },
  { slug: 'apollo-vs-zoominfo', title: 'Apollo vs ZoomInfo Comparison' },
];

export default function StartHerePage() {
  return (
    <Container>
      <BreadcrumbSchema items={[
        { name: 'Home', item: siteConfig.url },
        { name: 'Start Here', item: `${siteConfig.url}/start-here` }
      ]} />
      <section className="py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-50 p-8 shadow-[0_28px_60px_-44px_rgba(37,99,235,0.55)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl" />
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Start Here</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-5xl">
              Your Guide to B2B Lead Generation
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-700">
              New to B2B lead generation or Apollo.io? Follow these 5 steps to build a predictable sales pipeline from scratch.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {step.number}
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900">{step.title}</h2>
                  <p className="mt-2 text-slate-700">{step.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={step.link} className="btn-primary px-4 py-2 text-sm">
                      {step.linkText} →
                    </Link>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Key Guides</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {step.guides.map((slug) => (
                        <li key={slug}>
                          <Link
                            href={`/guides/${slug}`}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                          >
                            {slug.replace(/-/g, ' ')}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Most Popular Guides</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
            >
              <h3 className="font-semibold text-slate-900">{guide.title}</h3>
              <p className="mt-2 text-sm text-blue-700">Read guide →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8">
        <ApolloCtaBlock />
      </section>

      <section className="py-8">
        <NewsletterForm />
      </section>
    </Container>
  );
}
