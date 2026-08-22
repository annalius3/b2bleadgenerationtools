import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { guides } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Sales Pipeline Hub',
  description: 'Lead qualification, conversion, and pipeline management frameworks for outbound teams.',
  path: '/sales-pipeline'
});

export default function SalesPipelinePage() {
  const hubGuides = guides.filter((g) => g.hub === 'sales-pipeline');

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Sales Pipeline', item: `${siteConfig.url}/sales-pipeline` }
        ]}
      />
      <ItemListSchema
        name="Sales Pipeline Guides"
        description="Guides for lead qualification, conversion, and pipeline management."
        url={`${siteConfig.url}/sales-pipeline`}
        items={hubGuides.map((g) => ({
          name: g.title,
          url: `${siteConfig.url}/guides/${g.slug}`,
          description: g.description
        }))}
      />
      <HubPage hub="sales-pipeline" />
    </Container>
  );
}
