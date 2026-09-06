// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ridestreak.de',
  trailingSlash: 'always',
  build: {
    // Emit /de/index.html rather than /de.html so the paths in the brief
    // (§7.4) are the real, crawlable URLs on GitHub Pages.
    format: 'directory',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-DE', en: 'en-US' },
      },
      // The root page is a duplicate of /de/ that canonicalises to it,
      // so it must not appear as its own sitemap entry (§8.2).
      filter: (page) => page !== 'https://ridestreak.de/',
    }),
  ],
});
