import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { HubHero } from '@/components/hub-hero';
import { guides, hubContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Guides Hub',
  description: 'Tutorials, case studies, templates, best practices, and Apollo guides.',
  path: '/guides'
});

export default function GuidesPage() {
  return (
    <Container>
      <HubHero
        title={hubContent.guides.title}
        description={hubContent.guides.description}
        subtopics={hubContent.guides.subtopics}
      />
      <section className="pb-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </Container>
  );
}
