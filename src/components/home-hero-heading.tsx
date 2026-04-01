'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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
  const [enableInteractive, setEnableInteractive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnableInteractive(media.matches);

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  if (!enableInteractive) {
    return <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">{text}</h1>;
  }

  return <InteractiveParticleHeading text={text} />;
}
