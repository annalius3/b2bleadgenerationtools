'use client';

import { trackEvent } from '@/lib/analytics';
import type { TocItem } from '@/components/article-toc';

export const TrackedToc = ({ items }: { items: TocItem[] }) => {
  if (!items.length) {
    return null;
  }

  const handleClick = (id: string) => {
    trackEvent('toc_anchor_click', { section_id: id });
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Table of Contents</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block break-words leading-6 transition hover:text-blue-700"
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};
