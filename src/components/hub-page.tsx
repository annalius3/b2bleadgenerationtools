import { GuideCard } from '@/components/guide-card';
import { HubHero } from '@/components/hub-hero';
import { type HubKey, guides, hubContent } from '@/lib/content';

export const HubPage = ({ hub }: { hub: Exclude<HubKey, 'by-industry'> }) => {
  const config = hubContent[hub];
  const hubGuides = guides.filter((guide) => guide.hub === hub);

  return (
    <>
      <HubHero title={config.title} description={config.description} subtopics={config.subtopics} />
      <section className="pb-16">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-slate-900">Featured articles</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hubGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </>
  );
};
