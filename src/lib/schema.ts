import { APP, OPERATOR, PRICING, SITE, type Locale } from '../config';
import { absolute, getCopy } from '../i18n';

/**
 * One JSON-LD @graph per page (brief §7.3).
 *
 * The app and organisation entities keep the same `@id` across locales so the
 * entity stays unified, while `inLanguage` and every text field are localised.
 *
 * No `aggregateRating` anywhere: there are 4 real ratings, and fabricated
 * review markup is a manual-action risk. Add it only with real numbers, once
 * there are enough of them (§3, §5.4).
 */

const ID = {
  app: `${SITE}/#app`,
  org: `${SITE}/#org`,
  website: `${SITE}/#website`,
} as const;

function organization() {
  return {
    '@type': 'Organization',
    '@id': ID.org,
    name: APP.name,
    url: `${SITE}/`,
    logo: absolute('/logo512.png'),
    founder: { '@type': 'Person', name: OPERATOR.name },
    address: {
      '@type': 'PostalAddress',
      streetAddress: OPERATOR.street,
      postalCode: OPERATOR.postalCode,
      addressLocality: OPERATOR.city,
      addressCountry: OPERATOR.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: APP.supportEmail,
    },
  };
}

function mobileApplication(locale: Locale) {
  const t = getCopy(locale);
  return {
    '@type': 'MobileApplication',
    '@id': ID.app,
    name: APP.name,
    alternateName: APP.wordmark,
    description: t.meta.description,
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Cycling',
    operatingSystem: `iOS ${APP.minOs} or later`,
    softwareVersion: APP.version,
    datePublished: APP.firstReleased,
    url: `${SITE}/`,
    downloadUrl: APP.storeUrl,
    installUrl: APP.storeUrl,
    inLanguage: ['de', 'en'],
    screenshot: [absolute('/og-image-de.png')],
    featureList: t.features.map((f) => f.h2),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: PRICING.currency,
      category: 'free with in-app purchase',
    },
    author: { '@id': ID.org },
    publisher: { '@id': ID.org },
  };
}

function website(locale: Locale, url: string) {
  const t = getCopy(locale);
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url,
    name: APP.name,
    description: t.meta.description,
    inLanguage: locale,
    publisher: { '@id': ID.org },
  };
}

function faqPage(locale: Locale) {
  const t = getCopy(locale);
  return {
    '@type': 'FAQPage',
    '@id': `${SITE}/${locale}/#faq`,
    inLanguage: locale,
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Graph for a landing page (/, /de/, /en/). */
export function landingSchema(locale: Locale, canonical: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      mobileApplication(locale),
      organization(),
      website(locale, absolute(canonical)),
      faqPage(locale),
    ],
  };
}

/** Graph for a satellite page — legal, support, blog index (§7.3). */
export function pageSchema(opts: {
  locale: Locale;
  canonical: string;
  title: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
}) {
  const { locale, canonical, title, description, breadcrumbs } = opts;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'WebPage',
        '@id': `${absolute(canonical)}#webpage`,
        url: absolute(canonical),
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.app },
        publisher: { '@id': ID.org },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${absolute(canonical)}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: absolute(crumb.path),
        })),
      },
    ],
  };
}

/** Graph for a blog post (§7.6). */
export function articleSchema(opts: {
  locale: Locale;
  canonical: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  breadcrumbs: { name: string; path: string }[];
}) {
  const {
    locale,
    canonical,
    title,
    description,
    datePublished,
    dateModified,
    breadcrumbs,
  } = opts;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'Article',
        '@id': `${absolute(canonical)}#article`,
        headline: title,
        description,
        inLanguage: locale,
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: { '@type': 'Person', name: APP.developer },
        publisher: { '@id': ID.org },
        mainEntityOfPage: { '@id': absolute(canonical) },
        image: absolute(`/og-image-${locale}.png`),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${absolute(canonical)}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: absolute(crumb.path),
        })),
      },
    ],
  };
}
