import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for b2bleadgenerationtools.com.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Terms of Use', item: `${siteConfig.url}/terms` }
        ]}
      />
      <HubHero
        title="Terms of Use"
        description="Content is for educational business software guidance only. Validate all vendor terms and pricing independently."
        subtopics={['Educational content', 'No legal advice', 'Independent verification']}
      />
    </Container>
  );
}
