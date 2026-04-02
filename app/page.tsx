import Link from 'next/link';
import type { Route } from 'next';
import Image from 'next/image';

import { ApolloButton } from '@/components/apollo-button';
import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { ApolloCtaBlock } from '@/components/apollo-cta-block';
import { HomeHeroHeading } from '@/components/home-hero-heading';
import { Icons } from '@/components/icons';
import { NewsletterForm } from '@/components/newsletter-form';
import { renderApolloText } from '@/lib/render-apollo-text';
import { buildMetadata } from '@/lib/seo';
import { guides, industries } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { BreadcrumbSchema, WebSiteSchema } from '@/components/seo-schemas';

export const metadata = buildMetadata({
  title: 'Get B2B Clients Faster with Proven Outbound Strategies',
  description:
    'Learn how to find leads, contact decision-makers, and build a predictable sales pipeline with practical Apollo workflows.',
  path: '/'
});

const topSolutions: Array<{ title: string; href: Route; description: string; icon: keyof typeof Icons }> = [
  {
    title: 'Find Clients',
    href: '/find-clients',
    description: 'Build high-fit lead lists and identify decision-makers.',
    icon: 'clients'
  },
  { title: 'Start Outreach', href: '/outreach', description: 'Launch sequences, follow-ups, and reply systems.', icon: 'outreach' },
  { title: 'Build Pipeline', href: '/sales-pipeline', description: 'Turn replies into opportunities and revenue.', icon: 'pipeline' },
  { title: 'Grow Revenue', href: '/guides', description: 'Use proven templates, frameworks, and case-driven playbooks.', icon: 'revenue' }
];

export default function HomePage() {
  return (
    <Container>
      <WebSiteSchema url={siteConfig.url} name={siteConfig.name} />
      <BreadcrumbSchema items={[{ name: 'Home', item: siteConfig.url }]} />
      <section className="py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-50 p-8 shadow-[0_28px_60px_-44px_rgba(37,99,235,0.55)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl" />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <HomeHeroHeading text="Get B2B Clients Faster with Proven Outbound Strategies" />
              <p className="mt-5 max-w-2xl text-slate-700">
                {renderApolloText(
                  'Learn how to find leads, contact decision-makers, and build a predictable sales pipeline.'
                )}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/guides"
                  className="btn-secondary w-full px-5 py-2.5 sm:w-auto"
                >
                  Explore Guides
                </Link>
                <ApolloButton label="Try Apollo" className="w-full px-5 py-2.5 sm:w-auto" />
              </div>
            </div>
            <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src="/images/home/hero-team.jpg"
                alt="B2B sales team reviewing outbound performance"
                width={1024}
                height={768}
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="h-auto w-full rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="defer-section py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Top Solutions</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topSolutions.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="mb-3 block">{Icons[item.icon]()}</div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="defer-section py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Guides</h2>
          <Link href="/guides" className="btn-ghost text-sm">
            View all
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.slice(0, 6).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="defer-section py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">By Industry</h2>
          <Link href="/business-types" className="btn-ghost text-sm">
            Browse industries
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/business-types/${industry.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-blue-200"
            >
              <p className="font-semibold text-slate-900">{industry.name}</p>
              <p className="mt-2 text-slate-600">{industry.description}</p>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-6 grid w-full max-w-4xl gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-5 shadow-sm md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Industry Fit</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Start with the right market</p>
            <p className="mt-2 text-sm text-slate-600">Each business type hub narrows the outreach motion, buyer role, and message angle first.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Playbooks</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Use the shortest path to pipeline</p>
            <p className="mt-2 text-sm text-slate-600">Find niche-specific guides for agencies, consultants, SaaS, healthcare, manufacturing, and more.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Best Starting Point</p>
            <p className="mt-2 text-lg font-semibold">Choose one industry, one offer, one buyer</p>
            <p className="mt-2 text-sm text-slate-200">That makes list building, messaging, and reply handling much easier to improve week by week.</p>
          </div>
        </div>
      </section>

      <section className="defer-section py-8">
        <h2 className="text-2xl font-semibold text-slate-900">Growth Resources</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 block">{Icons.guide()}</div>
            <p className="text-sm font-semibold text-slate-900">Guides</p>
            <p className="mt-2 text-sm text-slate-600">Step-by-step workflows for lead generation and outbound execution.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 block">{Icons.template()}</div>
            <p className="text-sm font-semibold text-slate-900">Templates</p>
            <p className="mt-2 text-sm text-slate-600">Message templates and sequence structures for common campaign goals.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 block">{Icons.tutorial()}</div>
            <p className="text-sm font-semibold text-slate-900">Tutorials</p>
            <p className="mt-2 text-sm text-slate-600">
              {renderApolloText('Hands-on Apollo tutorials to move from setup to pipeline quickly.')}
            </p>
          </div>
        </div>
      </section>

      <section id="newsletter" className="defer-section py-8">
        <NewsletterForm />
      </section>

      <section className="defer-section py-12">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <ApolloCtaBlock title="Start generating B2B leads today with Apollo" />
          <div className="mx-auto flex w-full max-w-xl flex-col justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-6 text-white shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">Recommended Workflow</p>
              <h3 className="mt-3 text-2xl font-semibold">Use one clean outbound system</h3>
              <p className="mt-3 text-sm leading-7 text-blue-50">
                Build lists, contact the right buyers, and review reply quality in one place before adding more tools or more process.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Lead Flow</p>
                <p className="mt-2 text-sm text-white">Higher-fit accounts, cleaner list QA, and fewer wasted sequences.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Execution</p>
                <p className="mt-2 text-sm text-white">Faster weekly review and stronger visibility from prospecting to pipeline.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
