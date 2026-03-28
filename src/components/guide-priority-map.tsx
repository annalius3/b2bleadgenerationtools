export function GuidePriorityMap({
  items
}: {
  items: Array<{ id: string; title: string; reason: string }>;
}) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Recommended reading order</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <a key={item.id} href={'#' + item.id} className="rounded-2xl border border-blue-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Step {index + 1}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm text-slate-700">{item.reason}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
