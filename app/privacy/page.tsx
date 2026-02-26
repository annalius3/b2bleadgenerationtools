import { Container } from '@/components/container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for b2bleadgenerationtools.com.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-4xl font-semibold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          We collect minimal analytics and form data to improve site experience. We do not sell personal data.
        </p>
      </section>
    </Container>
  );
}
