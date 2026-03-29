import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';

import { ApolloInlineLink } from '@/components/apollo-inline-link';

const renderApolloMentions = (text: string, keyPrefix: string): ReactNode[] => {
  const matches = Array.from(text.matchAll(/Apollo(?:\.io)?/gi));
  if (!matches.length) {
    return [text];
  }

  const nodes: ReactNode[] = [];
  let start = 0;

  matches.forEach((match, index) => {
    const matchIndex = match.index ?? 0;
    if (matchIndex > start) {
      nodes.push(text.slice(start, matchIndex));
    }
    nodes.push(<ApolloInlineLink key={`${keyPrefix}-apollo-${matchIndex}-${index}`} label={match[0]} />);
    start = matchIndex + match[0].length;
  });

  if (start < text.length) {
    nodes.push(text.slice(start));
  }

  return nodes;
};

export const renderApolloText = (text: string): ReactNode[] => {
  const anchorRegex = /<a\s+href=["']([^"']+)["']>(.*?)<\/a>/gi;
  const anchorMatches = Array.from(text.matchAll(anchorRegex));

  if (!anchorMatches.length) {
    return renderApolloMentions(text, 'plain');
  }

  const nodes: ReactNode[] = [];
  let start = 0;

  anchorMatches.forEach((match, index) => {
    const matchIndex = match.index ?? 0;
    if (matchIndex > start) {
      nodes.push(...renderApolloMentions(text.slice(start, matchIndex), `before-${index}`));
    }

    const href = match[1];
    const label = match[2];
    nodes.push(
      <Link key={`anchor-${index}-${href}`} href={href as Route} className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-900 hover:decoration-blue-400">
        {renderApolloMentions(label, `label-${index}`)}
      </Link>
    );

    start = matchIndex + match[0].length;
  });

  if (start < text.length) {
    nodes.push(...renderApolloMentions(text.slice(start), 'after'));
  }

  return nodes;
};
