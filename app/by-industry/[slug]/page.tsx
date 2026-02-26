import { notFound } from 'next/navigation';

import { Container } from '@/components/container';
import { GuideCard } from '@/components/guide-card';
import { getGuidesByIndustry, industries } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) {
    return buildMetadata({
      title: 'Industry not found',
      description: 'Industry page not found.',
      path: '/by-industry'
    });
  }

  return buildMetadata({
    title: `${industry.name} Lead Generation Guides`,
    description: industry.description,
    path: `/by-industry/${industry.slug}`
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) {
    notFound();
  }

  const industryGuides = getGuidesByIndustry(slug);

  return (
    <Container>
      <section className="py-12">
        <h1 className="text-4xl font-semibold text-slate-900">{industry.name}</h1>
        <p className="mt-3 max-w-3xl text-slate-700">{industry.description}</p>
      </section>
      <section className="pb-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industryGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </Container>
  );
}
