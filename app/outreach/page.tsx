import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Outreach Hub',
  description: 'Cold email, follow-up, personalization, and reply strategy guides for B2B outbound.',
  path: '/outreach'
});

export default function OutreachPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Outreach', item: `${siteConfig.url}/outreach` }
        ]}
      />
      <HubPage hub="outreach" />
    </Container>
  );
}
