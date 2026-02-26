import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for b2bleadgenerationtools.com.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <Container>
      <HubHero
        title="Privacy Policy"
        description="We collect minimal analytics and form data to improve site experience. We do not sell personal data."
        subtopics={['Minimal data collection', 'No personal data sale', 'Secure handling']}
      />
    </Container>
  );
}
