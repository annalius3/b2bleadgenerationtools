import { Container } from '@/components/container';
import { HubPage } from '@/components/hub-page';
import { ShareButtons } from '@/components/share-buttons';
import { BreadcrumbSchema, ItemListSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { guides } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Outreach Hub',
  description: 'Cold email, follow-up, personalization, and reply strategy guides for B2B outbound.',
  path: '/outreach'
});

export default function OutreachPage() {
  const hubGuides = guides.filter((g) => g.hub === 'outreach');

  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Outreach', item: `${siteConfig.url}/outreach` }
        ]}
      />
      <ItemListSchema
        name="Outreach Guides"
        description="Practical guides for cold email, follow-up, personalization, and reply strategy."
        url={`${siteConfig.url}/outreach`}
        items={hubGuides.map((g) => ({
          name: g.title,
          url: `${siteConfig.url}/guides/${g.slug}`,
          description: g.description
        }))}
      />
      <HubPage hub="outreach" />
      <ShareButtons title="Outreach Hub" path="/outreach" />
    </Container>
  );
}
