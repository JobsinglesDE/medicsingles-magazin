interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  isNews,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  isNews?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': isNews ? 'NewsArticle' : 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description,
    url,
    ...(image && {
      image: image.startsWith('http') ? [image] : [`https://medicsingles.de${image.startsWith('/') ? '' : '/'}${image}`],
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Person',
      name: authorName || 'Tommy Honold',
      url: authorUrl || 'https://medicsingles.de/magazin/autor/tommy-honold',
      sameAs: [
        'https://www.facebook.com/thomashonold1/',
        'https://medicsingles.de/magazin/autor/tommy-honold',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Medicsingles Magazin',
      url: 'https://medicsingles.de/magazin',
      logo: {
        '@type': 'ImageObject',
        url: 'https://medicsingles.de/magazin/logos/jobsingles-logo.png',
        width: 200,
        height: 200,
      },
    },
    inLanguage: 'de-CH',
  };
}

export function faqJsonLd(items: readonly { readonly question: string; readonly answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    inLanguage: 'de-CH',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Medicsingles Magazin',
      url: 'https://medicsingles.de/magazin',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: it.url,
      })),
    },
  };
}

export function placeJsonLd({
  name,
  description,
  url,
  kanton,
}: {
  name: string;
  description: string;
  url: string;
  kanton: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    description,
    url,
    address: {
      '@type': 'PostalAddress',
      addressRegion: kanton,
      addressCountry: 'CH',
    },
    containedInPlace: {
      '@type': 'Country',
      name: 'Schweiz',
    },
  };
}

export function organizationJsonLd({
  name,
  alternateName,
  url,
  parentName,
  parentUrl,
  description,
  foundingDate,
  memberOfBjae,
}: {
  name: string;
  alternateName?: string;
  url?: string;
  parentName?: string;
  parentUrl?: string;
  description?: string;
  foundingDate?: string;
  memberOfBjae?: boolean;
}) {
  const memberOf: any[] = [];
  if (parentName) memberOf.push({
    '@type': 'MedicalOrganization',
    name: parentName,
    ...(parentUrl ? { url: parentUrl } : {}),
  });
  if (memberOfBjae) memberOf.push({
    '@type': 'Organization',
    name: 'Bündnis Junge Ärztinnen und Ärzte',
    alternateName: 'BJÄ',
    url: 'https://www.buendnisjungeaerzte.org',
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name,
    ...(alternateName ? { alternateName } : {}),
    ...(url ? { url } : {}),
    ...(description ? { description } : {}),
    ...(foundingDate ? { foundingDate } : {}),
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland',
      sameAs: 'https://www.wikidata.org/wiki/Q183',
    },
    ...(memberOf.length ? { memberOf } : {}),
  };
}
