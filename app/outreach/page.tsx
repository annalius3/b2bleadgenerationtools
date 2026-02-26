import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Outreach Hub',
  description: 'Cold email, follow-up, personalization, and reply strategy guides for B2B outbound.',
  path: '/outreach'
});

export default function OutreachPage() {
  return (
    <Container>
      <HubPage hub="outreach" />
    </Container>
  );
}
