import type { APIRoute } from 'astro';
import { APP, formatPrice, PRICING, SITE } from '../config';
import { getCopy } from '../i18n';
import { postsFor } from '../lib/blog';

/**
 * /llms.txt — a short, factual Markdown brief for AI crawlers (§7.5).
 *
 * Generated from the same copy and config the pages use, so it cannot drift
 * out of sync with the site. Deliberately includes the "does NOT do" list:
 * the most damaging thing an answer engine can say about Ride Streak is that
 * it records rides (§4, "Do NOT put these on the page").
 */
export const GET: APIRoute = async () => {
  const de = getCopy('de');
  const en = getCopy('en');
  const dePosts = await postsFor('de');
  const enPosts = await postsFor('en');

  const body = `# Ride Streak

> ${en.meta.description}

Ride Streak (wordmark: RideStreak) is an iPhone app that turns cycling rides
already recorded in Apple Health — and optionally Strava — into detailed
statistics, training analysis and component wear tracking.

## Key facts

- Platform: iPhone only, iOS ${APP.minOs} or later. Runs on iPad in iPhone compatibility mode.
- There is NO Apple Watch app, NO iPad app, NO Android app and NO web app.
- Price: free to download, with an optional "Ride Streak Pro" subscription.
- Pro pricing: ${formatPrice(PRICING.monthly, 'en')}/month, ${formatPrice(PRICING.yearly, 'en')}/year, or ${formatPrice(PRICING.lifetime, 'en')} one-time lifetime.
- Category: Health & Fitness. Current version ${APP.version}. First released ${APP.firstReleased}.
- Developer: ${APP.developer}. Support: ${APP.supportEmail}
- App Store: ${APP.storeUrl}
- Languages: English and German only.
- Units: metric only (km, m, kcal, km/h, W, °C). No imperial mode.

## What Ride Streak does NOT do

Ride Streak does **not** record rides. It has no ride recording, no GPS
tracking, no navigation and no route planning. Rides are recorded with an
Apple Watch, a Garmin, a Wahoo or any app that writes to Apple Health, and
Ride Streak reads them from there. It is an analysis and maintenance layer,
not a recorder. It also has no social feed and no challenges feature.

## Free features

${en.compare.rows
  .filter((r) => r.free)
  .map((r) => `- ${r.label}`)
  .join('\n')}

## Ride Streak Pro features

${en.compare.rows
  .filter((r) => !r.free)
  .map((r) => `- ${r.label}`)
  .join('\n')}

## Data and privacy

Your cycling data lives on your iPhone and in Apple Health. Nothing is
uploaded unless you explicitly turn it on. RideStreak Cloud is optional,
opt-in, and stores only daily training summaries (date, duration, distance,
elevation, training load) on servers in the EU — never GPS routes, never raw
heart-rate data. Consent can be withdrawn and the account plus all server data
deleted at any time from Settings. No ads, no data selling, no account
required to use the app.

## Strava

Strava is optional. Ride Streak works fully on Apple Health alone. Connecting
Strava adds power, cadence, detailed splits, segments, laps, real heart-rate
zones, FTP and weight, and imports rides from bike computers that never reach
Apple Health. Ride Streak is not affiliated with, endorsed or sponsored by
Strava, Inc.

## Pages

- [German homepage](${SITE}/de/): ${de.meta.description}
- [English homepage](${SITE}/en/): ${en.meta.description}
- [Privacy policy (EN)](${SITE}/en/privacy/)
- [Datenschutzerklärung (DE)](${SITE}/de/datenschutz/)
- [Terms of use (EN)](${SITE}/en/terms/)
- [Nutzungsbedingungen (DE)](${SITE}/de/agb/)
- [Impressum (DE, § 5 DDG)](${SITE}/de/impressum/)
- [Support (EN)](${SITE}/en/support/) · [Support (DE)](${SITE}/de/support/)

## Guides

${enPosts.map((p) => `- [${p.data.title}](${SITE}/en/blog/${p.id.split('/')[1]}/): ${p.data.description}`).join('\n')}
${dePosts.map((p) => `- [${p.data.title} (DE)](${SITE}/de/blog/${p.id.split('/')[1]}/): ${p.data.description}`).join('\n')}

## FAQ

${en.faq.items.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
