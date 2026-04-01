import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { guides, hubContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = {
  ...buildMetadata({
    title: 'Guide Search',
    description: 'Search guide results for outbound, prospecting, Apollo, and pipeline topics.',
    path: '/guides/search'
  }),
  robots: {
    index: false,
    follow: true
  }
};

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function GuideSearchPage({ searchParams }: Props) {
  const queryRaw = ((await searchParams)?.q ?? '').trim();
  const query = queryRaw.toLowerCase();
  const guidePreviews = guides.map((guide) => ({
    slug: guide.slug,
    title: guide.title,
    description: guide.description,
    hub: guide.hub
  }));
  const filtered = query
    ? guidePreviews.filter((guide) => {
        const haystack = `${guide.title} ${guide.description} ${guide.slug}`.toLowerCase();
        return haystack.includes(query);
      })
    : [];

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Guides', item: `${siteConfig.url}/guides` },
          { name: 'Search', item: `${siteConfig.url}/guides/search` }
        ]}
      />
      <HubHero
        title={query ? `Search: ${queryRaw}` : 'Guide Search'}
        description={
          query
            ? `Server-rendered search results for ${queryRaw}. Use broader terms to explore more outbound and Apollo guides.`
            : 'Search guide results by topic, workflow, or business problem.'
        }
        subtopics={query ? [`${filtered.length} matching guides`, 'Apollo', 'Outbound', 'Pipeline'] : hubContent.guides.subtopics}
        imageSrc="/images/menu/guides.jpg"
        imageAlt="Team reviewing tutorial resources and campaign playbooks"
      />
      <section className="pb-16">
        {query ? (
          <p className="mb-4 text-sm text-slate-600">
            Search results for <span className="font-semibold text-slate-900">&quot;{queryRaw}&quot;</span>: {filtered.length}
          </p>
        ) : (
          <p className="mb-4 text-sm text-slate-600">Use the search box in the header to find guides by topic.</p>
        )}
        {filtered.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">No guides found. Try broader keywords like &quot;apollo&quot; or &quot;pipeline&quot;.</p>
        )}
      </section>
    </Container>
  );
}
