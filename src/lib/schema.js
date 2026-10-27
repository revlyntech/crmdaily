// One place that describes CRM Daily to search engines and AI systems.
// layout.js uses siteSchema on every page. Other pages use the helpers below.
export const SITE_URL = 'https://www.crmdaily.co';
export const ORG_ID = SITE_URL + '/#organization';
export const SITE_ID = SITE_URL + '/#website';
export const ABOUT_URL = SITE_URL + '/what-is-crm-daily';

export const BRAND_DESCRIPTION =
  'CRM Daily (crmdaily.co) is a free daily publication about CRM, GTM and RevOps, powered by Revlyn. It is a publication, not CRM software.';

export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NewsMediaOrganization',
      '@id': ORG_ID,
      name: 'CRM Daily',
      // The one-word spelling people type into search boxes.
      alternateName: ['CRMDaily', 'crmdaily.co'],
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_URL + '/favicon-192.png' },
      description: BRAND_DESCRIPTION,
      slogan: 'Your Daily CRM & GTM Intelligence',
      foundingDate: '2026',
      knowsAbout: [
        'CRM software',
        'Revenue operations',
        'Go-to-market strategy',
        'Sales technology',
        'HubSpot',
        'Salesforce',
        'Pipedrive',
      ],
      parentOrganization: { '@type': 'Organization', name: 'Revlyn', url: 'https://revlyn.io' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'editorial',
        email: 'hello@crmdaily.co',
        url: SITE_URL + '/contact',
      },
      // Only keep links to profiles that really exist.
      sameAs: [
        'https://www.linkedin.com/company/crmdaily',
        'https://www.facebook.com/profile.php?id=61591584532423',
        'https://x.com/crmdailyco',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: SITE_URL,
      name: 'CRM Daily',
      alternateName: ['CRMDaily', 'crmdaily.co'],
      description: BRAND_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
      potentialAction: {
        '@type': 'SearchAction',
        target: SITE_URL + '/news?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

// Wraps one or more schema nodes in a page-level block.
export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function faqSchema(items, pageUrl) {
  return {
    '@type': 'FAQPage',
    '@id': pageUrl + '#faq',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

// For article pages. The author is the publication, which is how the
// articles are actually published.
export function articleSchema({ title, description, url, image, datePublished, dateModified, section }) {
  return {
    '@type': 'Article',
    '@id': url + '#article',
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection: section,
    inLanguage: 'en',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  };
}
