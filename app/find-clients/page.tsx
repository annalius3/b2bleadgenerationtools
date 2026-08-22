import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { guides } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Find Clients Hub',
  description: 'Find B2B leads, decision-makers, and accounts with practical prospecting systems.',
  path: '/find-clients'
});

export default function FindClientsPage() {
  const hubGuides = guides.filter((g) => g.hub === 'find-clients');

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Find Clients', item: `${siteConfig.url}/find-clients` }
        ]}
      />
      <ItemListSchema
        name="Find Clients Guides"
        description="Practical guides for finding B2B leads, decision-makers, and accounts."
        url={`${siteConfig.url}/find-clients`}
        items={hubGuides.map((g) => ({
          name: g.title,
          url: `${siteConfig.url}/guides/${g.slug}`,
          description: g.description
        }))}
      />
      <HubPage hub="find-clients" />
    </Container>
  );
}
