import { renderApolloText } from '@/lib/render-apollo-text';

export const HubHero = ({
  title,
  description,
  subtopics
}: {
  title: string;
  description: string;
  subtopics: string[];
}) => (
  <section className="py-12">
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />
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
  </section>
);
