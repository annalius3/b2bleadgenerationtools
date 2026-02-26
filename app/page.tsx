import Link from 'next/link';
import type { Route } from 'next';

import { ApolloButton } from '@/components/apollo-button';
import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { ApolloCtaBlock } from '@/components/apollo-cta-block';
import { buildMetadata } from '@/lib/seo';
import { guides, industries } from '@/lib/content';

export const metadata = buildMetadata({
  title: 'Get B2B Clients Faster with Proven Outbound Strategies',
  description:
    'Learn how to find leads, contact decision-makers, and build a predictable sales pipeline with practical Apollo workflows.',
  path: '/'
});

const topSolutions: Array<{ title: string; href: Route; description: string }> = [
  { title: 'Find Clients', href: '/find-clients', description: 'Build high-fit lead lists and identify decision-makers.' },
  { title: 'Start Outreach', href: '/outreach', description: 'Launch sequences, follow-ups, and reply systems.' },
  { title: 'Build Pipeline', href: '/sales-pipeline', description: 'Turn replies into opportunities and revenue.' },
  { title: 'Grow Revenue', href: '/guides', description: 'Use proven templates, frameworks, and case-driven playbooks.' }
];

export default function HomePage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-50 p-8 shadow-[0_28px_60px_-44px_rgba(37,99,235,0.55)] sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl" />
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Get B2B Clients Faster with Proven Outbound Strategies
          </h1>
          <p className="mt-5 max-w-2xl text-slate-700">
            Learn how to find leads, contact decision-makers, and build a predictable sales pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
            >
              Explore Guides
            </Link>
            <ApolloButton label="Try Apollo" className="px-5 py-2.5" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Top Solutions</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topSolutions.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Guides</h2>
          <Link href="/guides" className="text-sm font-semibold text-blue-700">
            View all
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.slice(0, 6).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">By Industry</h2>
          <Link href="/by-industry" className="text-sm font-semibold text-blue-700">
            Browse industries
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/by-industry/${industry.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-blue-200"
            >
              <p className="font-semibold text-slate-900">{industry.name}</p>
              <p className="mt-2 text-slate-600">{industry.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Growth Resources</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Guides</p>
            <p className="mt-2 text-sm text-slate-600">Step-by-step workflows for lead generation and outbound execution.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Templates</p>
            <p className="mt-2 text-sm text-slate-600">Message templates and sequence structures for common campaign goals.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Tutorials</p>
            <p className="mt-2 text-sm text-slate-600">Hands-on Apollo tutorials to move from setup to pipeline quickly.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <ApolloCtaBlock title="Start generating B2B leads today with Apollo" />
      </section>
    </Container>
  );
}
