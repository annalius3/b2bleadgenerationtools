'use client';

import dynamic from 'next/dynamic';

const InteractiveParticleHeading = dynamic(
  () => import('@/components/interactive-particle-heading').then((mod) => mod.InteractiveParticleHeading),
  {
    ssr: false,
    loading: () => (
      <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
        Get B2B Clients Faster with Proven Outbound Strategies
      </h1>
    )
  }
);

export function HomeHeroHeading({ text }: { text: string }) {
  return <InteractiveParticleHeading text={text} />;
}
