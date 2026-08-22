import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { guides } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'For Startups Hub',
  description: 'Outbound and low-budget lead generation playbooks for early-stage startups.',
  path: '/for-startups'
});

export default function ForStartupsPage() {
  const hubGuides = guides.filter((g) => g.hub === 'for-startups');

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'For Startups', item: `${siteConfig.url}/for-startups` }
        ]}
      />
      <ItemListSchema
        name="For Startups Guides"
        description="Outbound and low-budget lead generation playbooks for early-stage startups."
        url={`${siteConfig.url}/for-startups`}
        items={hubGuides.map((g) => ({
          name: g.title,
          url: `${siteConfig.url}/guides/${g.slug}`,
          description: g.description
        }))}
      />
      <HubPage hub="for-startups" />
    </Container>
  );
}
