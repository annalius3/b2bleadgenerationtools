import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
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
      />
      <section className="pb-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guidePreviews.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </Container>
  );
}
