import Link from 'next/link';
import type { Route } from 'next';
import Image from 'next/image';

import { ApolloButton } from '@/components/apollo-button';
import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { ApolloCtaBlock } from '@/components/apollo-cta-block';
import { Icons } from '@/components/icons';
import { InteractiveParticleHeading } from '@/components/interactive-particle-heading';
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
              <InteractiveParticleHeading text="Get B2B Clients Faster with Proven Outbound Strategies" />
              <p className="mt-5 max-w-2xl text-slate-700">
                {renderApolloText(
                  'Learn how to find leads, contact decision-makers, and build a predictable sales pipeline.'
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/guides"
                  className="btn-secondary px-5 py-2.5"
                >
                  Explore Guides
                </Link>
                <ApolloButton label="Try Apollo" className="px-5 py-2.5" />
              </div>
            </div>
            <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src="/images/home/hero-team.jpg"
                alt="B2B sales team reviewing outbound performance"
                width={1024}
                height={768}
                className="h-auto w-full rounded-xl object-cover"
                priority
              />
            </div>
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
              <div className="mb-3 block">{Icons[item.icon]()}</div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="mb-5 flex items-center justify-between">
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

      <section className="py-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">By Industry</h2>
          <Link href="/by-industry" className="btn-ghost text-sm">
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
        <div className="mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src="/images/home/industry-business.jpg"
            alt="Business team discussing growth strategy by industry"
            width={1024}
            height={768}
            className="h-auto w-full rounded-xl object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-8">
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

      <section className="py-8">
        <NewsletterForm />
      </section>

      <section className="py-12">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <ApolloCtaBlock title="Start generating B2B leads today with Apollo" />
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <Image
              src="/images/home/cta-founder.jpg"
              alt="Founder analyzing pipeline metrics with modern B2B tools"
              width={1024}
              height={768}
              className="h-full w-full rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </Container>
  );
}
