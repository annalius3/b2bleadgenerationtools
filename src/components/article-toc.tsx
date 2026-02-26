'use client';

import { MouseEvent, useEffect, useMemo, useState } from 'react';

export type TocItem = { id: string; label: string };

export const ArticleToc = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-130px 0px -65% 0px',
        threshold: [0.1, 0.4, 0.8]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  const onAnchorClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  if (!items.length) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Table of Contents</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onAnchorClick(item.id)}
              className={`transition hover:text-blue-700 ${activeId === item.id ? 'font-semibold text-blue-700' : ''}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};
