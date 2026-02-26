'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { GuideCard } from '@/components/guide-card';
import type { Guide } from '@/lib/content';

export const GuidesList = ({ guides }: { guides: Guide[] }) => {
  const searchParams = useSearchParams();
  const queryRaw = searchParams.get('q') ?? '';
  const query = queryRaw.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return guides;
    return guides.filter((guide) => {
      const haystack = `${guide.title} ${guide.description} ${guide.slug}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [guides, query]);

  return (
    <>
      {query ? (
        <p className="mb-4 text-sm text-slate-600">
          Search results for <span className="font-semibold text-slate-900">&quot;{queryRaw}&quot;</span>: {filtered.length}
        </p>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
      {query && filtered.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">No guides found. Try broader keywords like &quot;apollo&quot; or &quot;pipeline&quot;.</p>
      ) : null}
    </>
  );
};
