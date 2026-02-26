import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure',
  description: 'Affiliate disclosure and editorial policy.',
  path: '/affiliate-disclosure'
});

export default function AffiliateDisclosurePage() {
  return (
    <Container>
      <HubHero
        title="Affiliate Disclosure"
        description="Some pages include affiliate links. If you sign up through these links, we may earn a commission at no extra cost. Editorial opinions remain independent and based on practical usability."
        subtopics={['Clear disclosure', 'Editorial independence', 'No extra user cost']}
      />
    </Container>
  );
}
