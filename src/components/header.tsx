'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ApolloButton } from '@/components/apollo-button';
import { BrandLogo } from '@/components/brand-logo';
import { Container } from '@/components/container';
import { industries } from '@/lib/content';

const menu: Array<{ href: Route; label: string }> = [
  { href: '/find-clients', label: 'Find Clients' },
  { href: '/outreach', label: 'Outreach' },
  { href: '/sales-pipeline', label: 'Sales Pipeline' },
  { href: '/for-startups', label: 'For Startups' },
  { href: '/guides', label: 'Guides' }
];

export const Header = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/guides?q=${encodeURIComponent(value)}` : '/guides');
  };

  return (
    <header className="site-header-blur sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <BrandLogo compact />
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-blue-700">
                {item.label}
              </Link>
            ))}
            <div className="group relative">
              <Link href="/business-types" className="transition hover:text-blue-700">
                Business Types
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,720px)] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-4 opacity-0 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:p-6">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {industries.map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/business-types/${industry.slug}` as Route}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm transition hover:border-blue-200 hover:bg-blue-50/60"
                    >
                      <p className="font-semibold text-slate-900">{industry.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{industry.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden items-center gap-2 sm:flex" role="search" aria-label="Site search">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search guides..."
                aria-label="Search guides"
                className="w-44 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-300"
              />
              <button type="submit" aria-label="Search" className="btn-icon">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>
            <ApolloButton />
          </div>
        </div>
        <div className="space-y-2 pb-3 lg:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2" role="search" aria-label="Site search">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search guides..."
              aria-label="Search guides"
              className="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300"
            />
            <button type="submit" aria-label="Search" className="btn-icon h-9 w-9">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </form>
          <div className="flex gap-2 overflow-x-auto">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className="btn-pill">
                {item.label}
              </Link>
            ))}
            <Link href="/business-types" className="btn-pill">
              Business Types
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
