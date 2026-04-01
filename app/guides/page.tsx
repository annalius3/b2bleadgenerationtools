import { Suspense } from 'react';

import { Container } from '@/components/container';
import { GuidesList } from '@/components/guides-list';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { guides, hubContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Guides Hub',
  description: 'Tutorials, case studies, templates, best practices, and Apollo guides.',
  path: '/guides'
});

export default function GuidesPage() {
  const guidePreviews = guides.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    hub: guide.hub
  }));

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Guides', item: `${siteConfig.url}/guides` }
        ]}
      />
      <HubHero
        title={hubContent.guides.title}
        description={hubContent.guides.description}
        subtopics={hubContent.guides.subtopics}
        imageSrc="/images/menu/guides.jpg"
        imageAlt="Team reviewing tutorial resources and campaign playbooks"
      />
      <section className="pb-16">
        <Suspense fallback={<p className="text-sm text-slate-600">Loading guides...</p>}>
          <GuidesList guides={guidePreviews} />
        </Suspense>
      </section>
    </Container>
  );
}
