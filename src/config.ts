/**
 * Canonical app facts (brief §3) and site-wide switches.
 * Anything a human must verify before a deploy lives here, not in markup.
 */

export const SITE = 'https://ridestreak.de';

export const APP = {
  name: 'Ride Streak',
  wordmark: 'RideStreak',
  appleId: '6748264927',
  storeUrl: 'https://apps.apple.com/app/id6748264927',
  bundleId: 'com.shotat24fps.RideStreak',
  version: '1.1.14',
  firstReleased: '2025-07-31',
  minOs: '18.5',
  developer: 'Julian Manke',
  supportEmail: 'j.manke@icloud.com',
} as const;

/**
 * Operator details for the Impressum (§ 5 DDG), the privacy policy and the
 * Organization JSON-LD. One source of truth — the address is a legal
 * disclosure and must never be typed twice.
 *
 * The address must stay **ladungsfähig** (capable of receiving legal service).
 * A Postfach does not satisfy § 5 DDG. If this ever moves to a c/o business
 * address service, change it here and in App Store Connect's trader info at
 * the same time — Apple publishes that address on the EU App Store listing,
 * and a mismatch between the two is its own problem.
 */
export const OPERATOR = {
  name: 'Julian Manke',
  street: 'Tengstr. 36',
  postalCode: '80796',
  city: 'München',
  country: 'Deutschland',
  countryCode: 'DE',
  /**
   * Kleinunternehmer under § 19 UStG: no VAT is shown on the operator's own
   * invoices, so there is no USt-IdNr. to publish.
   *
   * This does not contradict the "inkl. MwSt." line in the terms: in the EU
   * Apple is the seller of record for App Store purchases and charges the VAT
   * on the price the customer pays.
   */
  vatNote:
    'Kleinunternehmer gemäß § 19 UStG, daher kein Ausweis von Umsatzsteuer.',
  vatNoteEn:
    'Small-business scheme under § 19 UStG (German VAT Act); VAT is therefore not shown separately.',
} as const;

/** "Tengstr. 36, 80796 München" — for single-line contexts. */
export const operatorAddressLine = `${OPERATOR.street}, ${OPERATOR.postalCode} ${OPERATOR.city}`;

export const LOCALES = ['de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';

/**
 * Strava prominence — brief §4.11.
 *
 * The app is self-serve capped at 10 connected athletes until Strava's
 * Developer Program Review is approved, and Standard Tier additionally
 * requires an active Strava subscription on the developer account. Driving
 * sign-ups past that cap breaks the feature for new users.
 *
 * 'secondary' → Strava is presented as an optional enhancement: compact band,
 *               no Strava terms in <title>/meta description, no keyword push.
 * 'primary'   → full-width unlock band and Strava terms in the metadata.
 *
 * Flip to 'primary' once the Developer Program Review is approved AND the
 * developer Strava subscription is confirmed active.
 */
export const STRAVA_PROMINENCE: 'secondary' | 'primary' = 'secondary';

/**
 * App Store pricing.
 *
 * price last verified: NOT YET VERIFIED — carried over from the previous site.
 * ⚠️ Confirm all three Pro prices in App Store Connect / RevenueCat before
 * deploying, then update `verifiedOn`. A wrong price is a refund driver and,
 * for German consumers, a legal exposure (brief §5.7, §10).
 *
 * `savings` and `savingsPercent` are computed, never hand-written — the old
 * site shipped "Spare €2,89" against numbers that yield €1,89.
 */
const MONTHLY = 0.99;
const YEARLY = 9.99;
const LIFETIME = 24.99;

export const PRICING = {
  verifiedOn: null as string | null,
  currency: 'EUR',
  monthly: MONTHLY,
  yearly: YEARLY,
  lifetime: LIFETIME,
  /** What a year of monthly billing costs. */
  yearlyAtMonthlyRate: +(MONTHLY * 12).toFixed(2),
  /** Absolute saving of the annual plan over twelve monthly payments. */
  savings: +(MONTHLY * 12 - YEARLY).toFixed(2),
  /** Same saving as a whole-number percentage. */
  savingsPercent: Math.round(((MONTHLY * 12 - YEARLY) / (MONTHLY * 12)) * 100),
} as const;

/**
 * App Store campaign tokens (brief §9.6). Each CTA position gets a distinct
 * `ct` so App Store Connect can attribute installs to a place on the page.
 * ⚠️ `pt` (provider token) comes from App Store Connect — set it here to have
 * it appended to every link.
 */
export const PROVIDER_TOKEN: string | null = null;

export type CtaPosition =
  | 'web_hero'
  | 'web_garage'
  | 'web_training'
  | 'web_flyover'
  | 'web_pricing'
  | 'web_final'
  | 'web_sticky'
  | 'web_header'
  | 'web_footer';

export function storeUrl(position: CtaPosition): string {
  const params = new URLSearchParams();
  if (PROVIDER_TOKEN) params.set('pt', PROVIDER_TOKEN);
  params.set('ct', position);
  params.set('mt', '8');
  return `${APP.storeUrl}?${params.toString()}`;
}

/** Currency formatting per locale (brief §8.4: DE 1.234,5 — EN 1,234.5). */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: PRICING.currency,
    minimumFractionDigits: 2,
  }).format(value);
}
