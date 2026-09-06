/**
 * The shape every locale must fill. Adding a language means adding one file
 * that satisfies `Copy` — no component changes, no `lang === 'de'` ternaries
 * in markup (brief §8.5).
 */

export type ScreenKey =
  | 'statistics-basic'
  | 'statistics-prs'
  | 'workout-details-basic'
  | 'workout-details-velocity'
  | 'workout-details-heartrate'
  | 'workout-details-more'
  | 'garage'
  | 'tour'
  | 'share-workout'
  | '3d-flyover-feature'
  | '3d-flyover-map';

export interface Shot {
  key: ScreenKey;
  alt: string;
}

export interface Feature {
  /** Anchor id; stable across locales so #werkstatt works on both pages. */
  id: string;
  eyebrow: string;
  h2: string;
  lead: string;
  bullets: string[];
  /** Marks the section as requiring RideStreak Pro. */
  pro?: boolean;
  /** Lead screenshot, shown in a phone frame. */
  shot?: Shot;
  /** Supporting screenshots, shown as a smaller row beneath the lead. */
  extraShots?: Shot[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PricingTier {
  id: 'free' | 'monthly' | 'yearly' | 'lifetime';
  name: string;
  tagline: string;
  /** null renders as the free tier's "€0". */
  price: number | null;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  note?: string;
}

export interface Copy {
  lang: 'de' | 'en';
  htmlLang: string;
  ogLocale: string;
  ogLocaleAlternate: string;

  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  };

  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    languageNav: string;
    appStoreBadge: string;
  };

  nav: {
    features: string;
    analysis: string;
    garage: string;
    pricing: string;
    faq: string;
    cta: string;
  };

  hero: {
    h1Line1: string;
    h1Line2: string;
    sub: string;
    cta: string;
    trust: string;
    secondary: string;
    shot: Shot;
  };

  wedge: {
    lead: string;
    items: { title: string; body: string }[];
  };

  worksWith: {
    title: string;
    note: string;
    items: string[];
  };

  features: Feature[];

  /** Wear-state cards shown beneath the Garage section (brief §9.3). */
  garageStates: {
    intro: string;
    states: { state: 'ok' | 'soon' | 'overdue'; label: string; example: string }[];
  };

  strava: {
    id: string;
    eyebrow: string;
    h2: string;
    lead: string;
    bullets: string[];
    closing: string;
    /** Rendered under the band; keeps "no endorsement" explicit (§4.11). */
    attribution: string;
  };

  compare: {
    id: string;
    eyebrow: string;
    h2: string;
    lead: string;
    freeLabel: string;
    proLabel: string;
    includedLabel: string;
    notIncludedLabel: string;
    rows: { label: string; free: boolean }[];
  };

  pricing: {
    id: string;
    eyebrow: string;
    h2: string;
    lead: string;
    perMonth: string;
    perYear: string;
    once: string;
    forever: string;
    savingsLine: string;
    terms: string;
    tiers: PricingTier[];
  };

  faq: {
    id: string;
    eyebrow: string;
    h2: string;
    lead: string;
    items: FaqItem[];
  };

  finalCta: {
    h2: string;
    lead: string;
    cta: string;
    trust: string;
  };

  stickyCta: {
    label: string;
  };

  footer: {
    tagline: string;
    productHeading: string;
    legalHeading: string;
    supportHeading: string;
    languageHeading: string;
    supportIntro: string;
    links: {
      features: string;
      pricing: string;
      faq: string;
      blog: string;
      impressum: string;
      privacy: string;
      terms: string;
      support: string;
    };
    appleTrademark: string;
    stravaTrademark: string;
    copyright: string;
    priceNote: string;
  };

  blog: {
    indexTitle: string;
    indexDescription: string;
    indexLead: string;
    readMore: string;
    backToBlog: string;
    publishedOn: string;
    updatedOn: string;
    ctaHeading: string;
    ctaBody: string;
  };

  legal: {
    lastUpdated: string;
    backHome: string;
  };
}
