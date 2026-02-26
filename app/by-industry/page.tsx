import Link from 'next/link';

import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { Icons } from '@/components/icons';
import { getGuidesByIndustry, hubContent, industries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'By Industry Hub',
  description: 'Industry-specific lead generation and outbound systems for modern B2B teams.',
  path: '/by-industry'
});

export default function ByIndustryPage() {
  return (
    <Container>
      <HubHero
        title={hubContent['by-industry'].title}
        description={hubContent['by-industry'].description}
        subtopics={hubContent['by-industry'].subtopics}
        imageSrc="/images/menu/by-industry.jpg"
        imageAlt="Business people from different industries discussing growth strategies"
      />
      <section className="pb-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/by-industry/${industry.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="mb-3 block">{Icons.industry()}</div>
              <h2 className="text-lg font-semibold text-slate-900">{industry.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{industry.description}</p>
              <p className="mt-3 text-xs font-medium text-blue-700">
                {getGuidesByIndustry(industry.slug).length} related guides
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
