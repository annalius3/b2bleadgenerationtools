import Link from 'next/link';
import type { Route } from 'next';

import { Container } from '@/components/container';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Apollo.io Comparisons',
  description: 'Compare Apollo.io with other B2B sales tools, cold email platforms, and lead generation software. Find the right tool for your outbound workflow.',
  path: '/compare'
});

const comparisons = [
  {
    tool: 'Apollo.io vs ZoomInfo',
    description: 'Apollo offers a built-in sequence engine and lower entry price, while ZoomInfo focuses on deeper data coverage for enterprise accounts.',
    href: '/guides/apollo-vs-zoominfo',
    category: 'Data & Intelligence'
  },
  {
    tool: 'Apollo.io vs Clay',
    description: 'Apollo is an all-in-one outbound platform, while Clay is a data enrichment and workflow automation tool for custom sequences.',
    href: '/guides/apollo-vs-clay',
    category: 'Data & Intelligence'
  },
  {
    tool: 'Apollo.io vs Hunter.io',
    description: 'Hunter focuses on email finding and verification, while Apollo combines database, sequences, and dialer in one platform.',
    href: '/guides/apollo-vs-hunter-io',
    category: 'Email Tools'
  },
  {
    tool: 'Apollo.io vs LinkedIn Sales Navigator',
    description: 'Apollo offers email sequences and a dialer alongside LinkedIn tasks, while Sales Navigator focuses on social selling and InMail.',
    href: '/guides/apollo-vs-linkedin-sales-navigator',
    category: 'Social Selling'
  },
  {
    tool: 'Apollo.io vs Lemlist',
    description: 'Lemlist specializes in email warmup and deliverability, while Apollo provides a broader outbound operating system.',
    href: '/guides/apollo-vs-lemlist',
    category: 'Email Tools'
  },
  {
    tool: 'Apollo.io vs Lusha',
    description: 'Lusha is a lightweight browser extension for contact data, while Apollo offers full sequence management and pipeline tools.',
    href: '/guides/apollo-vs-lusha',
    category: 'Data & Intelligence'
  },
  {
    tool: 'Apollo.io vs Seamless.AI',
    description: 'Seamless.AI focuses on real-time lead finding, while Apollo combines prospecting with outreach and pipeline management.',
    href: '/guides/apollo-vs-seamless-ai',
    category: 'Data & Intelligence'
  },
  {
    tool: 'Apollo.io vs Instantly',
    description: 'Instantly is a cold email sending platform, while Apollo provides database, sequences, and dialer in one subscription.',
    href: '/guides/apollo-vs-instantly',
    category: 'Email Tools'
  },
  {
    tool: 'Apollo.io vs Salesloft',
    description: 'Salesloft is an enterprise sales engagement platform, while Apollo offers a leaner outbound system at a lower price point.',
    href: '/guides/apollo-vs-salesloft',
    category: 'Sales Engagement'
  },
  {
    tool: 'Apollo.io vs HubSpot',
    description: 'HubSpot is a full CRM and marketing platform, while Apollo specializes in outbound prospecting and sequence management.',
    href: '/guides/apollo-vs-hubspot',
    category: 'CRM & Automation'
  }
];

const categories = [...new Set(comparisons.map(c => c.category))];

export default function ComparePage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Compare', item: `${siteConfig.url}/compare` }
        ]}
      />
      <ItemListSchema
        name="Apollo.io Comparisons"
        description="Compare Apollo.io with other B2B sales tools and lead generation platforms."
        url={`${siteConfig.url}/compare`}
        items={comparisons.map((c) => ({
          name: c.tool,
          url: `${siteConfig.url}${c.href}`,
          description: c.description
        }))}
      />

      <section className="py-10 sm:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/55 to-cyan-50/35 p-5 shadow-[0_24px_56px_-44px_rgba(37,99,235,0.5)] sm:p-9">
          <h1 className="max-w-4xl text-3xl font-semibold text-slate-900 sm:text-5xl">Apollo.io Comparisons</h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Side-by-side comparisons of Apollo.io with other B2B sales tools. Find the right platform for your
            outbound workflow, data needs, and budget.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">{comparisons.length} comparisons</span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">Updated March 2026</span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-medium text-slate-700">US B2B focus</span>
          </div>
        </div>
      </section>

      {categories.map((category) => (
        <section key={category} className="defer-section pb-10">
          <h2 className="mb-5 text-2xl font-semibold text-slate-900">{category}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {comparisons
              .filter((c) => c.category === category)
              .map((comparison) => (
                <Link
                  key={comparison.tool}
                  href={comparison.href as Route}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_42px_-24px_rgba(37,99,235,0.35)]"
                >
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">{comparison.tool}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{comparison.description}</p>
                  <p className="mt-3 text-sm font-medium text-blue-700">Read comparison →</p>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <section className="defer-section pb-16">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Need help choosing?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Start with the tool that matches your workflow. For most lean B2B teams, Apollo.io offers the best balance of database,
            sequences, and price. Read our <Link href="/guides/what-is-apollo-io" className="text-blue-700 underline">full Apollo.io review</Link> for
            a detailed breakdown.
          </p>
        </div>
      </section>
    </Container>
  );
}
