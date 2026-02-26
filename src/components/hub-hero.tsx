import Image from 'next/image';
import Link from 'next/link';

import { ApolloButton } from '@/components/apollo-button';
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
  <section className="py-8 sm:py-10">
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/60 to-cyan-50/40 p-6 shadow-[0_26px_64px_-46px_rgba(37,99,235,0.55)] sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl" />
      <div className={`grid gap-5 ${imageSrc ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-center' : ''}`}>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-slate-700">{renderApolloText(description)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {subtopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {renderApolloText(topic)}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/guides" className="btn-secondary">
              Explore Guides
            </Link>
            <ApolloButton label="Try Apollo" />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Lead Quality</p>
              <p className="mt-1 text-sm text-slate-700">Higher-fit accounts first</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Execution</p>
              <p className="mt-1 text-sm text-slate-700">Weekly campaign iteration</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Pipeline</p>
              <p className="mt-1 text-sm text-slate-700">Replies to revenue focus</p>
            </div>
          </div>
        </div>
        {imageSrc ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                width={1024}
                height={768}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
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
