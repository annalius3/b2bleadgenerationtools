'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ApolloButton } from '@/components/apollo-button';
import { BrandLogo } from '@/components/brand-logo';
import { Container } from '@/components/container';

const menu: Array<{ href: Route; label: string }> = [
  { href: '/find-clients', label: 'Find Clients' },
  { href: '/outreach', label: 'Outreach' },
  { href: '/sales-pipeline', label: 'Sales Pipeline' },
  { href: '/by-industry', label: 'By Industry' },
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <BrandLogo compact />
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
            {menu.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden items-center gap-2 sm:flex">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search guides..."
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
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search guides..."
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
          </div>
        </div>
      </Container>
    </header>
  );
};
