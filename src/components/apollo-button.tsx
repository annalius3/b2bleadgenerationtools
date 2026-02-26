import { APOLLO_URL } from '@/lib/site';

export const ApolloButton = ({
  label = 'Try Apollo',
  className = ''
}: {
  label?: string;
  className?: string;
}) => (
  <a
    href={APOLLO_URL}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className={`btn-primary ${className}`}
  >
    {label}
  </a>
);
