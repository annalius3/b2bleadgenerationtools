import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { getGuideBySlug, getGuidesByIndustry, industries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) {
    return buildMetadata({
      title: 'Business type not found',
      description: 'Business type page not found.',
      path: '/business-types'
    });
  }

  return buildMetadata({
    title: `${industry.name} Lead Generation Guides`,
    description: industry.description,
    path: `/business-types/${industry.slug}`
  });
}

export default async function BusinessTypePage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) {
    notFound();
  }

  const industryGuides = getGuidesByIndustry(slug);
  const featuredGuides = industry.featuredSlugs
    .map((guideSlug) => getGuideBySlug(guideSlug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Business Types', item: `${siteConfig.url}/business-types` },
          { name: industry.name, item: `${siteConfig.url}/business-types/${industry.slug}` }
        ]}
      />
      <HubHero
        title={industry.name}
        description={industry.description}
        subtopics={industry.subtopics}
        imageSrc="/images/menu/by-industry.jpg"
        imageAlt={industry.imageAlt}
      />

      <section className="grid gap-6 pb-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Who this hub is for</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">{industry.name} outbound strategy</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{industry.audience}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {industry.painPoints.map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.42)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Recommended motion</p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-200">
            {industry.strategy.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            Use this hub to find the strongest guides for {industry.name.toLowerCase()} prospecting, outreach, and pipeline execution.
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Featured guides</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Start with these high-signal pages</h2>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-sky-700 transition hover:text-sky-900">
            Browse all guides
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">All guides</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{industryGuides.length} guides for {industry.name}</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industryGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </Container>
  );
}
