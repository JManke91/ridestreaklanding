import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../config';

export type Post = CollectionEntry<'blog'>;

/** Entry ids are "<locale>/<slug>". */
export function localeOf(post: Post): Locale {
  return post.id.split('/')[0] as Locale;
}

export function slugOf(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

export function postPath(post: Post): string {
  return `/${localeOf(post)}/blog/${slugOf(post)}/`;
}

export async function postsFor(locale: Locale): Promise<Post[]> {
  const all = await getCollection('blog');
  return all
    .filter((post) => localeOf(post) === locale)
    .sort((a, b) => a.data.order - b.data.order);
}

/**
 * Both language versions of one article, keyed by locale.
 *
 * The `pair` frontmatter field is what makes the language switcher land on the
 * equivalent post rather than the other blog index (brief §8.6). If a
 * translation is missing the map simply lacks that locale, and callers fall
 * back to the blog index.
 */
export async function pathsForPair(pair: string): Promise<Record<Locale, string>> {
  const all = await getCollection('blog');
  const matches = all.filter((post) => post.data.pair === pair);

  const paths = { de: '/de/blog/', en: '/en/blog/' } as Record<Locale, string>;
  for (const post of matches) {
    paths[localeOf(post)] = postPath(post);
  }
  return paths;
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: locale === 'de' ? '2-digit' : 'numeric',
    month: locale === 'de' ? '2-digit' : 'long',
    year: 'numeric',
  }).format(date);
}
