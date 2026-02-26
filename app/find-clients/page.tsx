import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Find Clients Hub',
  description: 'Find B2B leads, decision-makers, and accounts with practical prospecting systems.',
  path: '/find-clients'
});

export default function FindClientsPage() {
  return (
    <Container>
      <HubPage hub="find-clients" />
    </Container>
  );
}
