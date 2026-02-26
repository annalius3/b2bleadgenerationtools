import type { ReactNode } from 'react';

import { ApolloInlineLink } from '@/components/apollo-inline-link';

export const renderApolloText = (text: string): ReactNode[] => {
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
    nodes.push(<ApolloInlineLink key={`${matchIndex}-${index}`} label={match[0]} />);
    start = matchIndex + match[0].length;
  });

  if (start < text.length) {
    nodes.push(text.slice(start));
  }

  return nodes;
};
