import { GuideCard } from '@/components/guide-card';
import { HubHero } from '@/components/hub-hero';
import { type HubKey, guides, hubContent } from '@/lib/content';

export const HubPage = ({ hub }: { hub: Exclude<HubKey, 'by-industry'> }) => {
  const config = hubContent[hub];
  const hubGuides = guides.filter((guide) => guide.hub === hub);
  const hubImage: Record<Exclude<HubKey, 'by-industry'>, { src: string; alt: string }> = {
    'find-clients': {
      src: '/images/menu/find-clients.jpg',
      alt: 'Sales team researching target clients'
    },
    outreach: {
      src: '/images/menu/outreach.jpg',
      alt: 'Business team running outreach campaigns'
    },
    'sales-pipeline': {
      src: '/images/menu/sales-pipeline.jpg',
      alt: 'Sales manager reviewing pipeline dashboard with team'
    },
    'for-startups': {
      src: '/images/menu/for-startups.jpg',
      alt: 'Startup founders planning customer acquisition'
    },
    guides: {
      src: '/images/menu/guides.jpg',
      alt: 'B2B team learning from guides and tutorials'
    }
  };

  return (
    <>
      <HubHero
        title={config.title}
        description={config.description}
        subtopics={config.subtopics}
        imageSrc={hubImage[hub].src}
        imageAlt={hubImage[hub].alt}
      />
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
