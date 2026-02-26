import Link from 'next/link';

import { Container } from '@/components/container';

export default function NotFound() {
  return (
    <Container>
      <section className="py-20 text-center">
        <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you requested does not exist.</p>
        <Link href="/" className="btn-primary mt-6">
          Back to homepage
        </Link>
      </section>
    </Container>
  );
}
