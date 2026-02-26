import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sales Pipeline Hub',
  description: 'Lead qualification, conversion, and pipeline management frameworks for outbound teams.',
  path: '/sales-pipeline'
});

export default function SalesPipelinePage() {
  return (
    <Container>
      <HubPage hub="sales-pipeline" />
    </Container>
  );
}
