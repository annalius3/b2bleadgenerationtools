import { Container } from '@/components/container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for b2bleadgenerationtools.com.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <Container>
      <section className="py-12">
        <h1 className="text-4xl font-semibold text-slate-900">Terms of Use</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Content is for educational business software guidance only. Validate all vendor terms and pricing independently.
        </p>
      </section>
    </Container>
  );
}
