import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Blog posts (brief §7.6). Files live at src/content/blog/<locale>/<slug>.md,
 * so the entry id is "de/fahrradkette-wechseln" and the URL is
 * /de/blog/fahrradkette-wechseln/.
 *
 * `pair` links the two language versions of the same article so the language
 * switcher and hreflang can resolve post-to-equivalent-post rather than
 * dumping an English reader on the German blog index (§8.6).
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Used in <title>; falls back to `title` when absent. */
    metaTitle: z.string().optional(),
    description: z.string(),
    /** Shown on the index card. */
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Stable identifier shared by the DE and EN version of one article. */
    pair: z.string(),
    /** Ordering on the index, lowest first. */
    order: z.number().default(0),
  }),
});

export const collections = { blog };
