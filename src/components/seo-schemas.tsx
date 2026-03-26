
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
  image,
  dateModified,
  datePublished,
  section,
  keywords
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  dateModified?: string;
  datePublished?: string;
  section?: string;
  keywords?: string[];
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: url,
    image,
    dateModified,
    datePublished,
    articleSection: section,
    keywords,
    author: {
      '@type': 'Organization',
      name: 'B2B Lead Gen Tools Editorial',
      url: 'https://www.b2bleadgenerationtools.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'B2B Lead Generation Tools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.b2bleadgenerationtools.com/icon.svg'
      }
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export const FAQSchema = ({
  questions
}: {
  questions: Array<{ question: string; answer: string }>;
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export const HowToSchema = ({
  name,
  description,
  url,
  image,
  steps
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  steps: string[];
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url,
    image,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export const WebSiteSchema = ({
  url,
  name,
  description
}: {
  url: string;
  name: string;
  description?: string;
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/guides?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export const OrganizationSchema = ({
  name,
  url
}: {
  name: string;
  url: string;
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: `${url}/icon.svg`,
    sameAs: [url]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

