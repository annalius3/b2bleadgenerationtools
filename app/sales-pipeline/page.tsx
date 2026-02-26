import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Sales Pipeline Hub',
  description: 'Lead qualification, conversion, and pipeline management frameworks for outbound teams.',
  path: '/sales-pipeline'
});

export default function SalesPipelinePage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Sales Pipeline', item: `${siteConfig.url}/sales-pipeline` }
        ]}
      />
      <HubPage hub="sales-pipeline" />
    </Container>
  );
}
