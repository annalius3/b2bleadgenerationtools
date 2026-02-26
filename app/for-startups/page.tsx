import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'For Startups Hub',
  description: 'Outbound and low-budget lead generation playbooks for early-stage startups.',
  path: '/for-startups'
});

export default function ForStartupsPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'For Startups', item: `${siteConfig.url}/for-startups` }
        ]}
      />
      <HubPage hub="for-startups" />
    </Container>
  );
}
