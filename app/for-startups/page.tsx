import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'For Startups Hub',
  description: 'Outbound and low-budget lead generation playbooks for early-stage startups.',
  path: '/for-startups'
});

export default function ForStartupsPage() {
  return (
    <Container>
      <HubPage hub="for-startups" />
    </Container>
  );
}
