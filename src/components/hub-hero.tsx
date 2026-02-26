import Image from 'next/image';

import { renderApolloText } from '@/lib/render-apollo-text';

export const HubHero = ({
  title,
  description,
  subtopics,
  imageSrc,
  imageAlt
}: {
  title: string;
  description: string;
  subtopics: string[];
  imageSrc?: string;
  imageAlt?: string;
}) => (
  <section className="py-12">
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/60 to-cyan-50/40 p-7 shadow-[0_26px_64px_-46px_rgba(37,99,235,0.55)] sm:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl" />
      <div className={`grid gap-6 ${imageSrc ? 'lg:grid-cols-[1.1fr_0.9fr] lg:items-center' : ''}`}>
        <div>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-slate-700">{renderApolloText(description)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {subtopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {renderApolloText(topic)}
              </span>
            ))}
          </div>
        </div>
        {imageSrc ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="absolute left-5 top-5 z-10 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs shadow-sm backdrop-blur">
              <p className="font-semibold text-slate-900">Outbound Score</p>
              <p className="text-slate-600">+34% qualified pipeline</p>
            </div>
            <div className="absolute bottom-5 right-5 z-10 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs shadow-sm backdrop-blur">
              <p className="font-semibold text-slate-900">Weekly Sprint</p>
              <p className="text-slate-600">Predictable execution</p>
            </div>
            <Image src={imageSrc} alt={imageAlt ?? title} width={1024} height={768} className="h-auto w-full rounded-xl object-cover" loading="lazy" />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Lead Quality</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">High-fit ICP</p>
              <p className="mt-1 text-sm text-slate-600">Focus on buyers with real purchase intent.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Outreach Rhythm</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">Weekly sprints</p>
              <p className="mt-1 text-sm text-slate-600">Small tests, faster iteration, cleaner learnings.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Pipeline Focus</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">From leads to revenue</p>
              <p className="mt-1 text-sm text-slate-600">Process-first playbooks for teams that need consistency.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);
