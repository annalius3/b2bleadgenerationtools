export const Icons = {
  clients: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 19c0-3 2.4-5 5-5" />
        <path d="M11 19c0-2.5 2-4.2 4.5-4.2" />
      </svg>
    </span>
  ),
  outreach: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16v12H4z" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    </span>
  ),
  pipeline: () => (
    <span className="inline-flex h-10 w-10 -rotate-3 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h6v12H3zM9 9h6v9H9zM15 12h6v6h-6z" />
      </svg>
    </span>
  ),
  revenue: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-700 shadow-[0_8px_18px_-14px_rgba(37,99,235,0.8)]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.1">
        <path d="M4 16 10 10l4 4 6-7" />
        <path d="M20 7v5h-5" />
      </svg>
    </span>
  ),
  guide: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/70 text-blue-700 shadow-inner">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z" />
        <path d="M8 4v16" />
      </svg>
    </span>
  ),
  template: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    </span>
  ),
  tutorial: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  ),
  industry: () => (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 text-slate-700 shadow-sm">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18" />
        <path d="M5 21V8h6v13" />
        <path d="M13 21V4h6v17" />
      </svg>
    </span>
  )
};
