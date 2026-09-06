# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing site for **Ride Streak** (wordmark: *RideStreak*), an iPhone-only cycling analysis app. Astro 7 static site, deployed to GitHub Pages and served on the custom domain `https://ridestreak.de` (remote: `git@github.com:JManke91/ridestreaklanding.git`).

The site is **bilingual (DE + EN)**. German is the primary market, not a translation target.

`docs/LandingPageBrief.md` is the source of truth for app facts and page requirements. **Do not invent features.** If something is not in that brief's section 3 or 4, it does not exist in the app.

## Commands

```bash
npm run dev                # dev server on http://localhost:4321
npm run build              # static build into dist/
npm run verify             # post-build checks against the brief's definition of done
npm run check              # astro check (TypeScript + template diagnostics)
npm run og                 # regenerate public/og-image-{de,en}.png
npm run deploy             # build + verify, then gh-pages -d dist
```

`npm run verify` runs automatically before every deploy via `predeploy`. It fails the deploy on removed features appearing in copy, wrong per-locale terminology, broken internal links, invalid JSON-LD, missing alt text, a missing/incorrect CNAME, a wrong pricing savings figure, and **any unfilled `[…]` placeholder or missing legal disclosure on the Impressum**.

## Deployment

Hosted on GitHub Pages, built from the **`gh-pages`** branch, served at **https://ridestreak.de**.

`main` and `gh-pages` are orthogonal, not two versions of the same tree: `main` is the source, `gh-pages` holds only the compiled `dist/` output. **Never merge, rebase, or diff one against the other** — `gh-pages` is machine-generated and force-overwritten on every deploy.

Pushing to `main` publishes nothing:

```bash
git push origin main   # source of truth only — does NOT publish
npm run deploy         # builds, verifies, then force-pushes dist/ to gh-pages
```

### The CNAME must ship from public/

`public/CNAME` (containing `ridestreak.de`) keeps the custom domain attached. Astro copies `public/` verbatim into `dist/`, so it lands at the root of `gh-pages` on every deploy. Do not delete it — a deploy without it drops the CNAME, GitHub clears the Custom domain field, and `ridestreak.de` breaks until it is retyped by hand. `npm run verify` checks for it.

DNS is already configured: apex → GitHub's four Pages IPs (`185.199.108-111.153`), `www` → `jmanke91.github.io`, Enforce HTTPS on.

## Architecture

### Copy lives in locale modules, never in markup

`src/i18n/de.ts` and `src/i18n/en.ts` each export a `Copy` object satisfying `src/i18n/types.ts`. Components read copy via `getCopy(locale)`.

**Never inline a user-visible string in a component, and never write `lang === 'de' ? … : …` in a template.** Adding a third language should mean adding one file.

The English file is not a translation of the German one — both are written natively. Only the structure is shared.

### Terminology is taken from the app, not invented

Read from the app's own `Localizable.strings`. Getting these wrong means a visitor cannot find what the page promised:

| Feature | English page | German page |
|---|---|---|
| Bike & parts tab | Garage | **Werkstatt** (never "Garage") |
| 3D route replay | 3D Flyover | **3D-Überflug** (never "3D-Flyover") |

`npm run verify` fails the build if these leak across locales.

### Routing

Explicit pages, not Astro's i18n router — GitHub Pages serves static files only, so the `Accept-Language` redirect the brief originally wanted is impossible.

```
/            → German landing page, canonical → /de/
/de/  /en/   → real, independently crawlable landing pages
/de/impressum/  /de/datenschutz/  /de/agb/  /de/support/
/en/privacy/    /en/terms/        /en/support/
/de/blog/…      /en/blog/…        (content collection)
/sitemap-index.xml  /robots.txt  /llms.txt
```

`src/i18n/index.ts` holds `ROUTES`, the page-to-page map the language switcher resolves through so it links to the *equivalent* page rather than the other homepage. Blog posts resolve through the `pair` frontmatter field instead.

`/de/impressum/` deliberately has no English equivalent — it is a German legal document (§ 5 DDG) linked from both locales' footers.

### Facts and switches live in src/config.ts

App ID, store URL, minimum OS, prices, campaign tokens and the operator's legal details.

`OPERATOR` is the single source of truth for the postal address. It feeds the Impressum, both privacy policies and the `Organization` JSON-LD — never type the address into a page. It must stay a **ladungsfähige Anschrift** (a Postfach does not satisfy § 5 DDG), and it must match the trader info in App Store Connect, which Apple publishes on the EU App Store listing.

Three things there need human attention:

- **`PRICING.verifiedOn` is `null`.** The prices are carried over from the previous site and are *not* verified against App Store Connect. `savings` and `savingsPercent` are computed, never hand-written — the old site shipped "Spare €2,89" against numbers that yield €1,89.
- **`STRAVA_PROMINENCE`** is `'secondary'`. The app is self-serve capped at 10 connected Strava athletes until Strava's Developer Program Review is approved, so the page deliberately downplays Strava. Flip to `'primary'` only once that review is approved *and* the developer Strava subscription is confirmed active.
- **`PROVIDER_TOKEN`** is `null`; set it to have `pt` appended to every App Store link for attribution.

### Screenshots

App screenshots live **only** in `src/assets/screens/` and are resolved through `src/assets/screens.ts`, which maps a `ScreenKey` to a file. Copy files reference the key; nothing else knows about filenames.

They go through `astro:assets` (`<Picture>` in `PhoneFrame.astro`), which emits AVIF/WebP with a **JPEG** fallback at 1× and 2×. The fallback must stay JPEG — these are satellite maps and gradients, and the PNG fallback for the flyover frame weighed 8.9 MB.

⚠️ The current captures are all **German UI** and are served on the English page too. An English set is still outstanding.

### Styling

`src/styles/tokens.css` defines every colour, type step and rhythm value. `src/styles/global.css` holds the reset, layout primitives, `.card`/`.btn`/`.pill`, the long-form `.prose` block and the motion rules.

**No raw hex values in components** — if a colour is needed it gets a token first. `#FC5200` is Strava's and appears only in the Strava band.

`.prose` is in `global.css` rather than a layout because blog posts render through `BaseLayout` directly; scoping it to `PageLayout` left articles unstyled.

Teal is for headings, numbers, icons, borders and buttons — never paragraph text. Button labels on a teal fill use `--rs-on-teal` (near-black); white on teal is ~1.9:1.

### Brand assets

- `public/app_logo.svg` — the real app icon. It is the favicon, the header/footer mark (`Wordmark.astro`) and the logo on the OG cards. Do not substitute a drawn stand-in for it.
- `public/badges/appstore-{de,en}.svg` — Apple's official localized badges, unmodified.
- `public/badges/strava-{compatible,powered}-white.svg` — from the official Strava brand pack.
- `brand/strava/` — the full downloaded Strava pack, kept in the repo but **outside `public/`** so 4.5 MB of EPS does not ship to gh-pages.

Strava rules (developers.strava.com/guidelines) are non-negotiable: never recolour, resize out of ratio or animate the marks; never imply partnership; never put "Strava" in the site `<title>` as if it were a Strava product. The "Connect with Strava" button is deliberately **not** shown — Strava requires it to link to a real OAuth endpoint, and on a marketing page it would be a dead control.

## Outstanding owner actions

- Verify the three Pro prices in App Store Connect, then set `PRICING.verifiedOn`.
- Make sure App Store Connect's trader address matches `OPERATOR` exactly — Apple publishes it on the EU App Store listing, and two differing published disclosures is its own problem.
- Capture the English-UI screenshot set.
- Set `PROVIDER_TOKEN` for App Store attribution, and decide on privacy-friendly analytics.
- Cross-check `src/pages/de/datenschutz.astro` §3 against `docs/BackendPrivacy.md` in the app repo.
