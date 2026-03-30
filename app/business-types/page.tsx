import Link from 'next/link';

import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { Icons } from '@/components/icons';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { getGuidesByIndustry, hubContent, industries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Business Types Hub',
  description: 'Client acquisition and outbound systems organized by business type for modern B2B teams.',
  path: '/business-types'
});

export default function BusinessTypesPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Business Types', item: `${siteConfig.url}/business-types` }
        ]}
      />
      <HubHero
        title={hubContent['by-industry'].title}
        description={hubContent['by-industry'].description}
        subtopics={hubContent['by-industry'].subtopics}
        imageSrc="/images/menu/by-industry.jpg"
        imageAlt="Business leaders from different industries planning outbound growth"
      />
      <section className="pb-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/business-types/${industry.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="mb-3 block">{Icons.industry()}</div>
              <h2 className="text-lg font-semibold text-slate-900">{industry.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{industry.description}</p>
              <p className="mt-3 text-xs font-medium text-blue-700">{getGuidesByIndustry(industry.slug).length} related guides</p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
