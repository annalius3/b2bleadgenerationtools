import Link from 'next/link';

import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema, PersonSchema } from '@/components/seo-schemas';
import { guides } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Katya — B2B Marketing Expert & Lead Generation Strategist',
  description:
    'Katya is a B2B marketing expert with 10+ years building outbound systems, cold email campaigns, and lead generation pipelines for SaaS, agencies, and service businesses.',
  path: '/authors/katya',
  type: 'article'
});

const expertise = [
  'B2B Lead Generation',
  'Cold Email Outreach',
  'Apollo.io Workflows',
  'Outbound Sales Systems',
  'Account-Based Marketing',
  'Sales Pipeline Management',
  'Email Deliverability',
  'Marketing Strategy'
];

const experience = [
  {
    period: '2016 — 2019',
    role: 'Outbound Specialist, B2B SaaS',
    detail:
      'Ran cold email and dialer cadences for two US SaaS companies. Learned the hard way that a 60% open rate means nothing if nobody replies.'
  },
  {
    period: '2019 — 2022',
    role: 'Head of Growth, Lead Generation Agency',
    detail:
      'Built list-building and sequencing systems for 40+ clients across agencies, professional services, and healthcare. Set the outreach standards we still publish.'
  },
  {
    period: '2022 — Present',
    role: 'Founder & Lead Author, B2B Lead Generation Tools',
    detail:
      'Test Apollo.io, sequencers, and enrichment tools against real client accounts, then publish the workflows that actually move pipeline.'
  }
];

const principles = [
  {
    title: 'Test before recommending',
    body: 'Every workflow on this site is run against real accounts with real sends. If a tactic did not produce replies for a client, it does not get published.'
  },
  {
    title: 'Numbers over adjectives',
    body: 'Guides cite concrete open rates, reply rates, and cost per meeting. "Improve your outreach" is not advice — a 3-line subject under 45 characters is.'
  },
  {
    title: 'Update when tools change',
    body: 'Apollo pricing, deliverability rules, and enrichment limits change constantly. Guides are re-checked whenever any of them moves.'
  },
  {
    title: 'Say what does not work',
    body: 'Sections like "when this approach fails" exist on purpose. A guide that only lists upsides is a sales page, not a guide.'
  }
];

export default function AuthorPage() {
  const authored = guides.filter((guide) => guide.hub === 'find-clients' || guide.hub === 'outreach').slice(0, 12);

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'About', item: `${siteConfig.url}/about` },
          { name: 'Katya', item: `${siteConfig.url}/authors/katya` }
        ]}
      />
      <PersonSchema
        name="Katya"
        jobTitle="B2B Marketing Expert & Lead Generation Strategist"
        url={`${siteConfig.url}/authors/katya`}
        description="Katya is a B2B marketing expert with 10+ years of experience building outbound systems, cold email campaigns, and lead generation pipelines for SaaS companies, agencies, and service businesses. She founded B2B Lead Generation Tools to share the playbooks she uses with real clients."
        knowsAbout={expertise}
        sameAs={['https://github.com/annalius3/b2bleadgenerationtools']}
      />
      <HubHero
        title="Katya — B2B Marketing Expert"
        description="10+ years building outbound systems, cold email campaigns, and lead generation pipelines. I test every workflow on this site against real client accounts before it gets published."
        subtopics={['Outbound systems', 'Apollo workflows', 'Cold email', 'Pipeline strategy']}
      />

      <section className="space-y-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">About me</h2>
          <div className="mt-4 space-y-4 text-slate-700">
            <p>
              I am Katya, a B2B marketing expert. I have spent the last ten years doing outbound for SaaS companies, agencies, and
              service businesses — first in-house, then running a lead generation agency, and now writing about the systems I use with
              clients.
            </p>
            <p>
              This site exists because most lead generation advice online is written by people who have never sent a cold email at
              scale. You get lists of "best practices" with no numbers, no failure cases, and no mention of what breaks when you move
              from 50 sends a day to 500.
            </p>
            <p>
              So every guide here is built the same way: I run the workflow against real accounts, record what actually happened —
              open rates, replies, meetings booked, deliverability damage — and publish that. Including the parts that did not work.
            </p>
            <p>
              If you want the short version of how we review and update content, read the{' '}
              <Link className="text-blue-700 underline" href="/editorial-methodology">
                editorial methodology
              </Link>
              . If you want to see the tools I actually recommend, start with the{' '}
              <Link className="text-blue-700 underline" href="/compare">
                comparison hub
              </Link>
              .
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Where the experience comes from</h2>
          <div className="mt-5 space-y-4">
            {experience.map((item) => (
              <div key={item.period} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{item.period}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{item.role}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">What I write about</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {expertise.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">How I work</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {principles.map((item) => (
              <div key={item.title} className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <p className="text-sm font-semibold text-blue-800">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Latest guides</h2>
          <p className="mt-2 text-slate-600">
            Recent playbooks on finding clients and running outbound. The full list lives in the{' '}
            <Link className="text-blue-700 underline" href="/guides">
              guides hub
            </Link>
            .
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {authored.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-4 text-slate-700">
            Questions about a guide, a correction, or a topic you want covered? Email{' '}
            <a className="text-blue-700 underline" href="mailto:vladkatintam@gmail.com">
              vladkatintam@gmail.com
            </a>{' '}
            or use the <Link className="text-blue-700 underline" href="/contact">contact form</Link>.
          </p>
        </div>
      </section>
    </Container>
  );
}
