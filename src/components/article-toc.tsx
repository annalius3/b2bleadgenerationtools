import Link from 'next/link';

export type TocItem = { id: string; label: string };

export const ArticleToc = ({ items }: { items: TocItem[] }) => {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Table of Contents</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`} className="hover:text-blue-700">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
