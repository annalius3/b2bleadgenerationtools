export const NewsletterForm = () => {
  return (
    <form action="/api/subscribe" method="post" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-lg font-semibold text-slate-900">Join the Newsletter</p>
      <p className="mt-1 text-sm text-slate-600">Weekly Apollo workflows, templates, and growth playbooks.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300"
        />
        <button type="submit" className="btn-primary h-11 px-5">
          Subscribe
        </button>
      </div>
    </form>
  );
};
