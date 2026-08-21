'use client';

import { useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export const SearchForm = ({ className = '' }: { className?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim() || '';
    if (query) {
      trackEvent('search_submit', { query });
    }
    window.location.href = `/guides/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <form
      action="/guides/search"
      method="get"
      role="search"
      aria-label="Site search"
      className={className}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        name="q"
        type="search"
        placeholder="Search guides..."
        aria-label="Search guides"
        className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 sm:h-auto sm:w-44 sm:py-2"
      />
      <button type="submit" aria-label="Search" className="btn-icon h-9 w-9">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
};
