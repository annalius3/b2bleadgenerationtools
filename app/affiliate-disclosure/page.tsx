import { Container } from '@/components/container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Affiliate Disclosure',
  description: 'Affiliate disclosure and editorial policy.',
  path: '/affiliate-disclosure'
});

export default function AffiliateDisclosurePage() {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-4xl font-semibold text-slate-900">Affiliate Disclosure</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Some pages include affiliate links. If you sign up through these links, we may earn a commission at no extra cost.
          Editorial opinions remain independent and based on practical usability.
        </p>
      </section>
    </Container>
  );
}
