type BreadcrumbItem = {
  name: string;
  item: string;
};

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export const ArticleSchema = ({
  title,
  description,
  url,
  image
}: {
  title: string;
  description: string;
  url: string;
  image: string;
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: url,
    image,
    author: {
      '@type': 'Organization',
      name: 'B2B Lead Gen Tools Editorial'
    },
    publisher: {
      '@type': 'Organization',
      name: 'B2B Lead Generation Tools'
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export const WebSiteSchema = ({ url, name }: { url: string; name: string }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};
