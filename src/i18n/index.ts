import de from './de';
import en from './en';
import type { Copy } from './types';
import { SITE, type Locale } from '../config';

export type { Copy, Locale };

const COPY: Record<Locale, Copy> = { de, en };

export function getCopy(locale: Locale): Copy {
  return COPY[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'de' ? 'en' : 'de';
}

/**
 * Every translatable page, with its path in each locale.
 *
 * The language switcher resolves through this map so it always links to the
 * *equivalent* page rather than the other homepage (brief §8.6). Blog posts
 * add themselves to this map at build time via `blogRoutes()`.
 *
 * `impressum` deliberately points at the same German URL from both locales:
 * it is a German legal document (§ 5 DDG) with no English equivalent, but it
 * must be reachable from every page's footer (brief §10).
 */
export const ROUTES = {
  home: { de: '/de/', en: '/en/' },
  privacy: { de: '/de/datenschutz/', en: '/en/privacy/' },
  terms: { de: '/de/agb/', en: '/en/terms/' },
  support: { de: '/de/support/', en: '/en/support/' },
  impressum: { de: '/de/impressum/', en: '/de/impressum/' },
  blog: { de: '/de/blog/', en: '/en/blog/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function route(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

export function absolute(path: string): string {
  return new URL(path, SITE).href;
}

/**
 * hreflang set for a page (brief §8.3). Reciprocal, absolute, self-referencing,
 * and always including x-default. `xDefault` is the root URL only for the
 * homepage pair; every other pair points x-default at its German URL, which is
 * the one a locale-less visitor should land on.
 */
export function alternates(
  paths: Record<Locale, string>,
  isHome = false
): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'de', href: absolute(paths.de) },
    { hreflang: 'en', href: absolute(paths.en) },
    { hreflang: 'x-default', href: absolute(isHome ? '/' : paths.de) },
  ];
}
