# RideStreak Landing Page — Handoff Brief

**Audience:** the agent/developer maintaining the RideStreak marketing website (separate repository).
**Purpose:** bring the landing page from its June-2025 state up to the current app (v1.1.14, September 2026), add a real SEO layer, ship it bilingual (DE + EN), and make it convert.

**Source of truth for app facts:** this file. It was compiled by auditing the app repository (`docs/wiki/`, `docs/*.md`, `CHANGELOG.md`, Xcode build settings) and the live App Store listing on 2026-09-06. Do not invent features. If something is not in section 3 or 4, it does not exist in the app.

**Owner action items are marked `⚠️ VERIFY`** — those are facts the landing-page agent cannot resolve alone.

---

## 1. Executive summary — what is wrong with the current page

| Problem | Impact | Fix |
|---|---|---|
| The page sells "Challenges" as a headline feature (nav item, hero screenshot, feature card). **Challenges no longer exist in the app.** They were replaced by *Goals*, *Weekly Streak* and *Personal Records*. | Users download expecting a feature that isn't there → 1-star reviews, refunds | Remove all "Challenges / Herausforderungen" copy and screenshots. Replace with Goals + Streak. |
| Six generic feature cards ("HealthKit-Integration", "Intelligente Analysen", …) describe the app as it was ~14 months and ~7 releases ago | The strongest, most differentiating features (Garage/wear tracking, Strava enrichment, Power Analysis, Training Load, Fitness & Form, 3D Flyover, Tours, video sharing) are entirely absent | Rebuild the feature architecture per section 5 |
| No mention of **Strava** anywhere | Strava integration is the app's biggest data differentiator *and* a major search term | Dedicated section + keyword coverage (brand rules in section 4.11) |
| The pricing section exists further down the page, but its numbers are unverified and its annual-savings line is arithmetically wrong (€1 off) | Wrong prices drive refunds and, for German consumers, are a legal exposure | Verify against App Store Connect, recompute — sections 1A and 5.7 |
| German only, no language switch | The app ships EN + DE and is on all App Stores; the whole English-speaking market is invisible to search | Full i18n, section 8 |
| No structured data, no meta description strategy, no hreflang, no sitemap, no OG images | The page is effectively invisible to Google *and* to AI answer engines (ChatGPT/Perplexity/Google AI Overviews), which increasingly mediate app discovery | Section 7 |
| No legal pages on the domain (privacy policy currently lives on a **GitHub Gist**) | For a German-operated site this is an **Impressum/DSGVO compliance risk** and a trust/E-E-A-T signal loss | Section 10 |
| Single CTA, no sticky CTA, no social proof, no FAQ | Conversion left on the table | Sections 5 + 9 |

**Also true, and worth acting on outside this project:** the App Store description itself is stale (it predates RideStreak Cloud, Fitness & Form, Power Analysis, Training Load, 3D Flyover and video sharing) and still claims *"We don't run our own servers to store it"*, which is no longer accurate now that opt-in RideStreak Cloud exists. The landing page must **not** repeat that absolute claim — use the wording in section 4.10 instead.

---

## 1A. The codebase you are starting from — read this before anything else

**Repo:** `/Users/jmanke/Documents/Code/react-js/AI/ridestreaklanding` (`git@github.com:JManke91/ridestreaklanding.git`)
**Live at:** https://ridestreak.de · **Stack:** Create React App (react-scripts 5) + Tailwind · **Hosting:** GitHub Pages from the `gh-pages` branch, published with `npm run deploy`.

That project has its own `CLAUDE.md` describing the build, the deploy ritual and the `public/CNAME` trap. Read it. This section only covers what collides with *this* brief.

### 🚨 Blocker: the current stack cannot deliver the SEO in section 7

CRA ships a **client-rendered SPA**. `public/index.html` contains an empty `<div id="root">` and nothing else — every word of copy, every heading and any JSON-LD you render from React exists only after JavaScript runs. Consequences:

- Googlebot renders JS, but does so on a deferred second pass, and it consistently under-indexes SPA content compared with server-rendered HTML.
- **AI crawlers largely do not execute JavaScript at all.** GPTBot, PerplexityBot, ClaudeBot and friends fetch the raw HTML. On the current site they see an empty div. The entire "get cited by AI answer engines" strategy — which is the realistic win for a zero-authority domain — returns exactly nothing until this is fixed.
- The FAQ, the free-vs-Pro table and the structured data are precisely the content that must exist in the raw HTML source. Section 7 says this repeatedly; on CRA it is currently impossible.

**Decide this first, before writing any copy** (recommendation in bold):

| Option | Effort | Outcome |
|---|---|---|
| **A — Migrate to Astro or Next.js static export** | 1–2 days | **Recommended.** True static HTML per route, trivial `/de/` + `/en/` pages, per-page `<head>`, real JSON-LD in source, best Core Web Vitals. Both still deploy to GitHub Pages as static output. Astro is the smaller jump for a marketing page with a little React in it; Next.js `output: 'export'` is fine too. |
| B — Keep CRA, add prerendering (`react-snap` or `react-prerender`) | ~half a day | Works, produces real HTML per route, but it is a build-time hack layered on a dead framework (CRA is unmaintained), and per-route `<head>` needs `react-helmet-async` wired in on top. Acceptable as a stopgap. |
| C — Keep CRA as-is | none | Section 7 is not deliverable. Do not choose this and then claim the SEO work is done. |

Everything else in this brief is stack-independent; only the *how* changes.

### GitHub Pages constraints that override section 8.2

Pages serves static files only — **no server-side redirects and no custom response headers**. Therefore:

- The `/` → `Accept-Language` **302 described in section 8.2 is not possible.** Do this instead: `/` serves the German page (the primary market) with `<link rel="canonical" href="https://ridestreak.de/de/">`, and `/de/` and `/en/` are both real, statically generated, independently crawlable pages. A small client-side script may *offer* a language switch banner to `Accept-Language: en` visitors, but must never auto-redirect a crawler and must never be the only way to reach a locale.
- `hreflang` and `x-default` therefore carry the entire job of telling Google which locale to serve to whom. Get section 8.3 exactly right — there is no server-side fallback here.
- If you stay on CRA with client routing, you also need the GitHub-Pages SPA `404.html` copy trick. Options A and B avoid it by emitting real files at `/de/index.html` and `/en/index.html`.
- `package.json` currently sets `"homepage": "./"`, which emits **relative** asset paths. That works at the domain root but breaks the moment pages live at `/de/` and `/en/` (assets would resolve to `/de/static/…`). **Change it to `"/"`** as part of the i18n work.
- `public/CNAME` must survive every deploy or `ridestreak.de` detaches. Whatever build system you move to must keep emitting it into the published output.

### Concrete defects in the current code, beyond stale copy

| # | Defect | Where | Fix |
|---|---|---|---|
| 1 | `og:image` / `twitter:image` point at **`app_logo.svg`** — an SVG. Facebook, LinkedIn, X, WhatsApp, Slack and iMessage all **ignore SVG** and render no preview at all. An unused `og-image.png` already sits in `public/`. | `public/index.html` | Ship a real 1200×630 **PNG or JPEG** with a readable headline baked in; set `og:image:width`/`height` to match. Every shared link currently previews as bare text. |
| 2 | The `<title>` is just **"Ride Streak"** and `<html lang="en">` while all copy is German. | `public/index.html` | Section 7.3 titles; `lang="de"` on the DE page, `lang="en"` on the EN page. |
| 3 | Meta description and all OG copy still sell **"personalisierten Herausforderungen"** (Challenges). | `public/index.html` | Section 7.3. |
| 4 | The whole page is one **~590-line `src/App.js`** with section content written inline as JSX, not driven by data. | `src/App.js` | Bilingual copy cannot live in inline JSX. Refactor to per-section components fed by `locales/de.json` / `locales/en.json` (section 8.5) **before** translating — doing it after means doing it twice. |
| 5 | The brand teal `#00D4AA` appears as a hardcoded arbitrary Tailwind value **~50 times**; `tailwind.config.js` carries a full shadcn HSL theme the page bypasses entirely. | `src/App.js`, `tailwind.config.js` | Section 9.2 — define the tokens once, use them everywhere. |
| 6 | ~45 dead `.tsx` files sit in `src/`, importing `@radix-ui/*` packages that are **not installed**, via an `@/` alias that resolves to nothing. | `src/*.tsx` | Delete them. They are pure confusion for any agent reading the tree, and they will mislead you into thinking shadcn primitives are available. |
| 7 | `src/App.test.js` is the untouched CRA default asserting a "learn react" link — **`npm test` fails**. | `src/App.test.js` | Replace with a smoke test, or remove. A red suite trains everyone to ignore the suite. |
| 8 | The contact form is a bare `<form action="mailto:…" method="post" encType="text/plain">`. Browsers handle `mailto:` form POSTs inconsistently and Chrome/Safari frequently do nothing at all. | `src/App.js` | Either a real form endpoint (Formspree/Basin/Web3Forms — all work from static hosting) or, simplest and honest, replace the form with a plain `mailto:` **link** plus the support address in text. |
| 9 | Screenshots are duplicated in **`src/images/`** (imported by `App.js`, bundler-hashed) **and `public/images/`** (served as-is). | both | See section 11 — replacing one and not the other is the likely failure mode. |

### The pricing section already exists — and its numbers are suspect

Contrary to what the outdated screenshots suggest, `src/App.js` **does** render four hardcoded tiers: Free €0 · Monatlich Pro **€0.99/Monat** · Jährlich Pro **€9.99/Jahr** (with "Spare €2,89 jährlich") · Lebenslang Pro **€24.99**.

Two problems:
1. **The savings line is arithmetically wrong.** €0.99 × 12 = €11.88; €11.88 − €9.99 = **€1.89**, not €2.89. Either the copy or one of the prices is wrong.
2. ⚠️ **None of these are verified against App Store Connect / RevenueCat.** Independent lookups returned a different and mutually inconsistent set. Before publishing, confirm all three Pro prices at the source and recompute the savings figure. A wrong price on a landing page is a refund driver and, for German consumers, a legal exposure.

---

## 2. Brand, tone, positioning

**One-line positioning (the thing everything else supports):**
> RideStreak turns the cycling data you already have — in Apple Health and Strava — into pro-level insight, and keeps your bikes in shape while it does it.

**Who it is for:** iPhone-owning cyclists who already record rides (Apple Watch, Garmin, Wahoo, iPhone) and want to *understand* and *maintain*, not to record another way. This is the key wedge: **RideStreak is not a ride recorder. It is the analysis and maintenance layer on top of what you already record.** Say this explicitly — it removes the "why not just Strava?" objection before it forms.

**Three audience segments to speak to** (they map to the feature sections):
1. **The consistency rider** — wants distance, streaks, goals, widgets, "did I ride more than last year".
2. **The data rider** — power meter, FTP, zones, TSS, CTL/ATL/TSB, power curve, segments, laps.
3. **The owner/maintainer** — multiple bikes, chain/cassette/tire wear, "when do I replace this".

**Tone:** direct, second person, informal ("du" in German — the app uses *du* throughout; never *Sie*). Confident, no hype, no exclamation marks. Numbers and specifics over adjectives. German copy must be idiomatic German, not translated English — see section 8.4.

**Visual identity (take from the app so page and product match):**

| Token | Value | Use |
|---|---|---|
| Accent / primary | `#00D4AA` | primary CTA, highlights, ring/progress |
| Accent (stats screen variant) | `#2DD4B5` | secondary accent, gradients |
| Background (deep) | `#0A0A0B` | page background (dark) |
| Surface | `#12141A`–`#1A1C22` | cards |
| Strava orange | `#FC5200` | **only** for Strava brand elements, never as a general accent |
| Gold/Pro | warm gold gradient | Pro badges, records, trophies |

Dark-first is correct and on-brand (the app is dark-only). Keep it. Add a light-mode variant only if the agent wants it; it is not required.

---

## 3. Canonical app facts

| Fact | Value |
|---|---|
| App name | **Ride Streak** (App Store) / **RideStreak** (in-product and marketing wordmark — keep this one-word form on the site) |
| App Store URL | `https://apps.apple.com/app/id6748264927` (locale-neutral; append `?l=de` only where needed) |
| Apple App ID | `6748264927` |
| Bundle ID | `com.shotat24fps.RideStreak` |
| Current version | 1.1.14 (1.1.13 was the last public release, 2026-08-11) |
| First released | 2025-07-31 |
| Platform | **iPhone only** (iOS). Runs on iPad in iPhone compatibility mode — do not market it as an iPad app. |
| Minimum OS | **iOS 18.5** |
| Category | Health & Fitness |
| Price | **Free to download**, with *RideStreak Pro* subscription (monthly / annual / lifetime) |
| Pro prices | ⚠️ **VERIFY in App Store Connect / RevenueCat before publishing.** Do not copy prices from third-party scrapers. Display localized prices (€ for DE, $ for US) or, better, fetch them (section 5.7). |
| Ratings | 5.0 ★ from 4 ratings — **too few to display.** Do not put a rating widget on the page until there are ≥ 25 ratings. Use the alternative trust signals in section 5.4. |
| App languages | English, German (only these two) |
| Developer | Julian Manke |
| Data sources | Apple Health (HealthKit) + optional Strava |
| Watch app | **None.** There is no Apple Watch target. Apple Watch rides are read *via Apple Health*. Phrase it exactly that way — never "Apple Watch app". |
| Android | **None.** No Google Play badge, no "coming to Android". |

---

## 4. Feature inventory — the complete, verified list

Legend: **FREE** = available without subscription · **PRO** = requires RideStreak Pro.

### 4.1 Statistics dashboard ("Stats" tab) — FREE
- Totals per **day / week / month / year**, switchable between four metrics: **distance, elevation gain, duration, calories** (calories is PRO).
- **Period comparison**: every number carries a delta vs. the *equivalent elapsed portion* of the previous period ("↓ 6 % · −45 km vs. 2025"), and the charts draw the previous period as a dashed ghost line on the same scale. Tapping a bar shows both the current and the previous-period value for that bucket, labeled.
- **Goals**: set a target per metric × timeframe (e.g. 4 000 km this year, 2 000 hm this month). When a goal exists the hero becomes a progress ring; without one it is a big honest number with a sparkline. Goals are ongoing — a weekly goal applies to every week.
- **Weekly streak**: consecutive calendar weeks with at least one ride. Shown from 2 weeks upward. *(This is the app's name-sake — give it visual weight on the page.)*
- **Personal records**: farthest distance, highest average speed, highest max speed, most elevation gain, longest duration, most calories — as a podium, with the previous best shown when a record is beaten.

### 4.2 Ride detail — FREE (with PRO sections, see 4.5/4.6)
Every recorded ride, opened in depth:
- Hero stats: distance, moving time, stopped time, average speed (moving **and** including stops), elevation, calories, temperature, average power — **the user chooses which of these appear**.
- **Interactive route map**, full-screen, with the track **colored by speed** (blue = slower → red = faster) and a legend; toggle back to a plain track.
- **Elevation profile** with an interactive scrubber, plus climbing stats: **VAM** (climbing speed) of the biggest climb and the steepest section.
- **Heart rate**: average / max / min, **real heart-rate zones from Strava** (or age-derived), 1-minute HR recovery for Apple Watch rides.
- **Speed**: moving vs. maximum, time-per-speed-band distribution, coasting time, insight into what stops cost you.
- **Power**: average vs. Normalized Power, "punchy or steady" rating. Strava-estimated power is clearly marked as an estimate.
- **Cadence**: distribution curve across rpm with the optimal 80–95 rpm band highlighted.
- **Splits**: clean 5 km segments labeled by distance, like a bike computer.
- **Laps**: the lap-button laps from your Garmin/Wahoo, with distance, time, speed and power/HR per lap.
- **Strava Segments**: your segment efforts with PR medals and top-10 crowns.
- **Conditions**: temperature curve over the ride with min/avg/max (rides with a temperature sensor).
- **Day rhythm**: ride and break segments on a timeline, plus total start-to-finish time.
- **Fully customizable**: show, hide and reorder every section and every hero stat; the choice applies to all rides.

### 4.3 Garage — bike & component wear tracking — FREE
This is the app's strongest differentiator against Strava and Apple Fitness. Give it a full section.
- Add your bikes; add the parts that wear: **chain, cassette, brake pads (front/rear), tires (front/rear), shift cables, brake cables, bar tape, brake rotors, or a custom part**.
- Each part accumulates the kilometers of the rides assigned to that bike, from its install date.
- Set a replacement threshold per part; status is color-coded: **healthy → watch → replace soon → overdue**.
- Optional **model name** ("Schwalbe SV17E") and **buy link** per part — a "Buy" button on the part card.
- Reset a part's counter when you replace it (records today as the new install date).
- **Automatic ride → bike assignment rules** by indoor/outdoor, recording device/source and distance range, plus a **default bike** fallback.
- **Manual override**, per ride or for a whole date range at once ("Assign rides by date") — including "no bike" for a rental or a friend's bike.
- Every attribution says **how** it was decided: set by you, matched by a rule, or your default bike.

### 4.4 Tours (multi-day trips) — FREE
- Group rides into a named multi-day **tour** — a cycling holiday, a stage trip, a weekend.
- Aggregated statistics across the whole tour, a day-by-day timeline with elevation overview and rest periods, an overall average speed including pauses, and a temperature range.
- The app **detects likely tours automatically** and suggests them.
- Full-screen tour map with the speed-colored route across all rides.
- Shareable tour summary image.

### 4.5 Training Load / Effort — **PRO**
- A radial training-load gauge for every ride, in plain language plus a labeled scale showing where the ride sits.
- **Power TSS** for power-meter rides (Normalized Power, Intensity Factor, Variability Index, W/kg, total work), falling back to a **heart-rate-based estimate** when there is no power meter — with a source badge so you always know which.

### 4.6 Power Analysis — **PRO**
- Best efforts at **5 s / 1 min / 5 min / 20 min** with W/kg.
- Expandable **mean-maximal power curve**.
- Time in the **Coggan 7 power zones** when your FTP is known.
- **FTP estimate** from your best 20 minutes.

### 4.7 Fitness & Form (PMC) — **PRO**, requires RideStreak Cloud
- The classic performance management chart: **Fitness (CTL, 42-day load) · Fatigue (ATL, 7-day) · Form (TSB, freshness)**, over 6 weeks, 3 months or 1 year.
- Computed from your own rides; training load is calculated **on your device** and only the daily number is synced.
- A card on the Stats tab shows today's form and your fitness curve at a glance.
- Rides need heart-rate or power data to count.

### 4.8 3D Flyover — **PRO**
- A cinematic 3D flythrough of a ride's route over satellite terrain, with speed, distance and time updating live. Play/pause, scrub, 2× and 4× speed.
- Works for a **whole tour** too — the camera flies every ride and glides across the gaps between them.
- Respects Reduce Motion (static 3D map + summary instead).

### 4.9 Sharing — preview FREE, export **PRO**
- Turn a ride into a **share image or an overlay video**: pick one of your photos or a clip, and your distance, speed, route and stats are burned in. HDR video stays HDR.
- Personal records get a gold "RECORD" badge and trophies on the record stats.
- You choose which stats appear.
- **The full preview is free** — the paywall appears only when you save, share or export.
- Tours can be shared as summary images too.

### 4.10 Privacy & data — FREE (and a headline selling point)
Use **exactly this framing** — it is accurate and still strong:
> Your cycling data lives on your iPhone and in Apple Health. Nothing is uploaded unless you explicitly turn it on. RideStreak Cloud is optional, opt-in, and stores only daily training summaries (date, duration, distance, elevation, training load) on servers in the EU — never your GPS routes, never raw heart-rate data. You can withdraw consent or delete your account and all server data at any time, from Settings.

Also true and worth stating: no ads, no data selling, no account required to use the app.
**Do not write** "we don't run servers" or "we never upload anything" — RideStreak Cloud makes those false.

### 4.11 Strava integration — FREE
- Connect Strava to unlock **power, cadence, detailed splits, segments, laps, real training zones, FTP and weight**, and to import rides recorded on **Garmin, Wahoo and other bike computers** that never reach Apple Health.
- Rides from both sources are automatically matched and de-duplicated, then enriched.
- Disconnecting removes all imported Strava data from the app.

> ### ⚠️ Owner decision required before marketing Strava hard
>
> Two constraints in `docs/StravaIntegration.md` (§ "API access tiers", as of June 2026) mean **a successful Strava marketing push can break the Strava feature**:
>
> 1. **The app is self-serve capped at 10 connected athletes.** Going beyond that — up to 9,999 — requires passing Strava's Developer Program Review (a form plus screenshots of every Strava-data surface and the Connect button). If the landing page drives Strava connections past that cap before the review is approved, new users hit a wall on a feature the page just promised them.
> 2. **Standard Tier requires an active Strava subscription on the developer account.** If it lapses, Strava deactivates the whole API application and every athlete gets a 403 — and, because the subscription check lives on the resource server, the app still shows "Connected" while no data loads.
>
> **Decide before launch:** (a) get the Developer Program Review submitted and approved first, and keep the developer subscription active — then market Strava as prominently as this brief suggests; or (b) launch with Strava framed as a secondary, optional enhancement (smaller band, no keyword targeting) until the review clears. Do **not** run option (b)'s approval status with option (a)'s marketing volume.
>
> Either way the page must never imply Strava is required — the app is fully usable on Apple Health alone, and that framing is already in the copy (section 6.3b closing line) as the honest hedge.

**Strava brand rules — non-negotiable, the site can be taken down for breaking them:**
- Use the official **"Connect with Strava"** button artwork and the **"Powered by Strava"** badge from the Strava Brand Guidelines; never recolor, restretch or redraw them.
- Strava orange is `#FC5200`.
- Never imply endorsement, partnership or affiliation. "Works with Strava" / "Compatible with Strava" is fine; "Strava partner" is not.
- Never use Strava's logo as the site's own icon or in the favicon.
- The word "Strava" may appear in body copy and in a page's H2, but **not** in the site's `<title>` in a way that reads as a Strava-branded product (e.g. "Strava Stats App" as a title is risky; "RideStreak — Cycling stats for Apple Health & Strava" is fine).

### 4.12 Widgets — FREE
Three home-screen widgets — **week, month and year distance** — in small and medium sizes, with a 7-day bar chart on the week widget. They read Apple Health directly, so they stay current without opening the app.

### 4.13 Rider profile — FREE
Set **max heart rate, FTP and body weight** manually, or let RideStreak read them from Strava or Apple Health. These drive zones, W/kg, TSS and the FTP estimate.

### 4.14 iCloud sync — **PRO**
Your bikes, parts, rules, tours and goals sync across your devices.

### 4.15 Onboarding — FREE
A 7-step guided setup: name → stats preview → widgets → sharing preview → Apple Health permission → optional Strava → Pro offer with a clear "continue with the free version" option.

### ❌ Do NOT put these on the page
- **Challenges** — removed from the app. (The current page's whole hero and one feature card are built on this. Kill it.)
- **Trophy cabinet / achievements** — the code exists but has **no reachable entry point** in the shipped app. Not a feature.
- **Apple Watch app** — does not exist.
- **iPad app / Android app / web app** — do not exist.
- **Live ride recording / GPS tracking / navigation / route planning** — RideStreak does **not** record rides. Never imply it does. This is the single most damaging possible misstatement, because it sets an expectation the app deliberately does not meet.

---

## 5. Page structure — section by section

One long-scroll page per language, plus the small satellite pages in section 7.4. Order and intent:

### 5.1 Sticky header
Logo (wordmark) · anchor nav · **language switcher** (section 8.3) · small "App Store" CTA that appears once the hero CTA scrolls out of view.
Nav labels — DE: `Funktionen · Analyse · Garage · Preise · FAQ` · EN: `Features · Analysis · Garage · Pricing · FAQ`.
Remove "Kontakt" from the nav (put it in the footer) — the current contact form is a `mailto:` POST that mostly does nothing (section 1A, defect 8).

### 5.2 Hero (above the fold — this is 57 % of attention and decides the visit in under 3 seconds)
- **H1** = the value proposition, not the app name. See copy in section 6.
- One sub-headline of max 2 lines naming the two data sources (Apple Health, Strava) and the outcome.
- **Primary CTA**: official black **"Download on the App Store"** badge, localized ("Laden im App Store" for DE), linking to `https://apps.apple.com/app/id6748264927` with campaign parameters (section 9.3). Use Apple's official badge artwork, correct clear space, minimum 40 px height.
- **Trust line directly under the CTA**: "Free · No account required · Your data stays on your device" / "Kostenlos · Ohne Konto · Deine Daten bleiben auf deinem Gerät".
- **Hero visual**: one hero screenshot (Stats tab with a goal ring), not four. Four small phones at once means none of them is readable. Put the rest in the feature sections. Consider a short (< 6 s), muted, auto-playing, `playsinline` loop of the 3D Flyover or the speed-colored map — motion earns attention, but it must be < 1.5 MB and must not block LCP (poster image + lazy start).
- **Do not** put a HealthKit "badge" pill as the very first element. Lead with the promise; the integration is support, not the headline.

### 5.3 The wedge (immediately after the hero, one short band)
Three or four short statements that pre-empt the "why not just Strava/Apple Fitness?" question:
"RideStreak doesn't record your rides — it makes sense of the ones you already recorded." + the three audience hooks (progress · analysis · maintenance). Keep it to one screen height.

### 5.4 Social proof — pragmatic version
There are only 4 ratings; a rating widget would hurt. Use instead:
- "Works with" logo row: **Apple Health · Strava · Garmin · Wahoo · Apple Watch** (the last four as "rides from" — check each brand's trademark usage rules; text names are safer than logos for Garmin/Wahoo).
- A compact "built for cyclists who…" trio.
- Once ratings pass ~25, add real App Store review quotes with the reviewer's first name and the star count, and add `AggregateRating` to the structured data (section 7.3). **Never fabricate reviews or ratings** — it is fraud, and Google penalizes fake review markup.

### 5.5 Feature sections — eight, in this order, each with its own screenshot
Alternate image left/right, each with an H2, 2–4 sentences, and 3–4 bullets. Order by differentiation, not by chronology:

1. **Your progress, honestly compared** — Stats, goals, streak, records, period comparison (4.1)
2. **Every ride, in the detail your computer records** — ride detail, map, elevation, zones, splits, laps, segments (4.2)
3. **Connect Strava, unlock what your bike computer recorded** — the Strava unlock band (4.11). *Design it as a compact full-bleed band, not a full alternating section* — see 9.3. It sits here deliberately: section 2 has just shown power, cadence, splits, segments and laps, and the reader's immediate question is "how do I get all that?" This band is the answer.
4. **Werkstatt / The Garage: know when to replace, before it fails** — wear tracking (4.3) ← *the strongest differentiator, and the highest-intent search traffic*
5. **Train by numbers, not by feel** — Training Load, Power Analysis, Fitness & Form (4.5–4.7) — mark Pro
6. **Turn a week of riding into one tour** — multi-day tours: creation flow, timeline, aggregate stats (4.4)
7. **Rides worth showing off** — share images and overlay videos with burned-in stats (4.9)
8. **Fly your route in 3D** — 3D Flyover, single ride and whole tour (4.8) — mark Pro
9. **On your home screen, and private by default** — widgets + the privacy framing from 4.10

**Why 6–8 are three sections and not one:** the first draft of this brief bundled tours, sharing and the flyover into a single slot. That was wrong. Each is a distinct, highly visual capability with its own screenshot, its own search intent and its own emotional pitch — *the trip you did*, *the photo you post*, *the replay you watch*. Sharing them one slot means each gets ~80 words and one small image, which is how a differentiator becomes a footnote. Give them one screen each.

Put a secondary CTA after sections 4 and 8.

### 5.6 Free vs Pro comparison table
A clean two-column table so the paywall is honest and the value is visible *before* the price. Rows = the features in section 4, marked Free or Pro. This raises conversion because it removes the fear of a bait-and-switch — and it is exactly the content AI answer engines quote when asked "is RideStreak free?".

### 5.7 Pricing
- The section already exists in `src/App.js` with four hardcoded tiers (Free €0 · Monatlich €0.99 · Jährlich €9.99 · Lebenslang €24.99). Restyle it per section 9.3; do not rebuild it from scratch.
- ⚠️ **VERIFY all three Pro prices** in App Store Connect / RevenueCat before publishing, and **recompute the savings line** — the current "Spare €2,89 jährlich" should be €1.89 given the stated prices, so at least one of the four numbers on the page is wrong today.
- Show localized currency. If prices are hardcoded, add a `<!-- price last verified: YYYY-MM-DD -->` comment and a calendar reminder; a wrong price on a landing page is a refund driver.
- State plainly: auto-renews, cancel anytime in Settings, lifetime is a one-time purchase.
- Reiterate what stays free (the app is genuinely usable without Pro — say so; it lowers install friction).

### 5.8 FAQ (accordion, but the answers must be in the HTML, not injected on click)
This section does double duty: user objection handling **and** the primary surface that AI answer engines quote. Questions in section 6.5.

### 5.9 Final CTA band
Repeat the App Store badge, the free/no-account trust line, and a one-sentence restatement of the promise.

### 5.10 Footer
Impressum · Datenschutz · Terms · Support email · Strava attribution ("Powered by Strava" badge) · Apple trademark line ("Apple, the Apple logo, Apple Health, Apple Watch and App Store are trademarks of Apple Inc.") · language switcher · copyright.

### 5.11 Mobile-sticky CTA
A persistent bottom bar on mobile with the App Store badge, appearing after the hero scrolls away. This is the single highest-leverage conversion addition on the page (sticky CTAs are consistently reported at +17–27 % on mobile).

---

## 6. Copy — ready to use, EN + DE

The German is the primary market (App Store DE, developer in Germany); the English is not a translation of the German but its own equivalent. Both use informal address (DE: *du*).

### 6.0 Terminology — use the app's own words, exactly

The site must name things the way the app names them, or a visitor who installs it cannot find what the page promised. These are read from `RideStreak/Resources/{en,de}.lproj/Localizable.strings` in the app repo — **not** invented for marketing.

| Feature | English (in-app) | German (in-app) | Key |
|---|---|---|---|
| Bike & parts tab | **Garage** | **Werkstatt** ⚠️ *not "Garage"* | `garage_title` |
| 3D route replay | **3D Flyover** | **3D-Überflug** ⚠️ *not "3D-Flyover"* | `flyover_start` |
| Multi-day trip | Tour / **Create Tour** | Tour / **Tour erstellen** | `tour_create_tour` |
| Sharing a ride | **Share Workout** | **Workout teilen** | `share_workout` |
| Cloud account | RideStreak Cloud | RideStreak Cloud | `cloud_row_title` |
| Fitness chart | Fitness & Form | Fitness & Form | `cloud_fitness_form_title` |
| Training load | Training Load | Trainingsbelastung | `effort_pro_teaser_subtitle` |
| Power analysis | Power Analysis | Leistungsanalyse | — |

The two ⚠️ rows are the ones most likely to be gotten wrong, because the English word looks like it should carry over and doesn't. In German the tab is **Werkstatt** and the button is **3D-Überflug**. Use those on the German page — headings, body copy, image alt text and FAQ alike. The English page uses *Garage* and *3D Flyover*.

> **Known inconsistency in the app's own materials, for the owner (not the web agent):** the RevenueCat paywall copy (`docs/RevenueCatPaywallCopy.md`) calls the feature **"3D-Flyover"** in German, while the in-app button says **"3D-Überflug"**. One of the two should change so the paywall and the product agree. Until it is resolved, the landing page follows the **in-app** term, since that is what a user actually sees and taps.

### 6.1 Hero

**DE**
- H1: **Deine Fahrten. Dein Material. Dein Fortschritt.**
- Sub: Ride Streak verbindet Apple Health und Strava und macht daraus Radsport-Analysen auf Profi-Niveau – und sagt dir, wann Kette, Reifen und Bremsen dran sind.
- CTA: **Kostenlos im App Store laden**
- Trust: Kostenlos · Ohne Konto · Deine Daten bleiben auf deinem iPhone

*Hero H1 alternatives to A/B test (DE):*
- **Alles, was deine Rad-Daten dir eigentlich sagen könnten.**
- **Apple Health kennt deine Kilometer. Ride Streak versteht sie.**

**EN**
- H1: **Your rides. Your gear. Your progress.**
- Sub: Ride Streak turns your Apple Health and Strava rides into pro-level cycling analysis — and tells you when your chain, tires and brakes are due.
- CTA: **Download free on the App Store**
- Trust: Free · No account · Your data stays on your iPhone

*Alternatives to test (EN):*
- **Everything your ride data could be telling you.**
- **Apple Health has your kilometres. Ride Streak makes sense of them.**

### 6.2 The wedge band

**DE:** Ride Streak zeichnet deine Fahrten nicht auf – das machen deine Uhr, dein Garmin oder dein Wahoo längst. Ride Streak liest sie aus Apple Health und Strava und macht daraus das, was dir bisher gefehlt hat: ehrliche Vergleiche, echte Trainingsanalyse und eine Werkstatt, die mitzählt.

**EN:** Ride Streak doesn't record your rides — your watch, your Garmin or your Wahoo already does. It reads them from Apple Health and Strava and gives you what was missing: honest comparisons, real training analysis, and a garage that keeps count.

### 6.3 Feature section headers + lead sentences

| # | DE H2 | DE lead | EN H2 | EN lead |
|---|---|---|---|---|
| 1 | Dein Fortschritt – ehrlich verglichen | Tag, Woche, Monat, Jahr. Jede Zahl mit dem Vergleich zum selben Zeitraum im Vorjahr, als gestrichelte Linie direkt im Diagramm. Setz dir ein Ziel und der Held wird zum Fortschrittsring. | Your progress, honestly compared | Day, week, month, year. Every number carries the comparison to the same window a year ago, drawn as a dashed line right in the chart. Set a goal and the hero becomes a progress ring. |
| 2 | Jede Fahrt bis ins Detail | Streckenkarte in Geschwindigkeitsfarben, Höhenprofil mit Scrubber, echte Herzfrequenzzonen, 5-km-Splits, Laps von deinem Radcomputer und deine Strava-Segmente. Du entscheidest, welche Abschnitte du siehst. | Every ride, in full detail | A speed-coloured route map, an elevation profile you can scrub, real heart-rate zones, 5 km splits, your bike computer's laps and your Strava segments. You choose which sections you see. |
| 3 | Die Werkstatt: wissen, wann gewechselt wird | Trag deine Räder ein, häng die Verschleißteile dran – Kette, Kassette, Reifen, Bremsbeläge, Züge, Lenkerband. Ride Streak zählt die Kilometer automatisch mit und meldet sich, bevor es teuer wird. | The Garage: know before it wears out | Add your bikes and the parts that wear — chain, cassette, tires, brake pads, cables, bar tape. Ride Streak counts the kilometres automatically and tells you before it gets expensive. |
| 4 | Trainiere nach Zahlen, nicht nach Gefühl | Trainingsbelastung für jede Fahrt (TSS über Leistung oder Herzfrequenz), volle Leistungsanalyse mit Power-Kurve und Zonen – und der Formverlauf aus Fitness, Ermüdung und Form. | Train by the numbers | Training load for every ride (TSS from power or heart rate), a full power analysis with power curve and zones — and your fitness, fatigue and form over time. |
| 5 | Aus einer Woche Radfahren wird eine Tour | Fass zusammengehörige Fahrten zu einer Tour zusammen – Ride Streak erkennt mehrtägige Touren sogar von selbst und schlägt sie dir vor. Danach siehst du die ganze Reise auf einmal: Gesamtdistanz, Höhenmeter, Tag-für-Tag-Verlauf und die komplette Route auf einer Karte. | One week of riding, one tour | Group rides that belong together into a tour — Ride Streak spots multi-day trips on its own and suggests them. Then you see the whole journey at once: total distance, elevation, a day-by-day timeline and the full route on one map. |
| 6 | Fahrten, die man herzeigt | Leg deine Werte über dein eigenes Foto – oder über ein Video. Distanz, Geschwindigkeit, Höhenmeter und deine Route werden fest eingebrannt, Rekorde bekommen ein goldenes Abzeichen. Du bestimmst, welche Werte zu sehen sind. Die Vorschau ist immer kostenlos. | Rides worth showing off | Lay your numbers over your own photo — or over a video. Distance, speed, elevation and your route are burned in, and personal records get a gold badge. You choose which stats appear. The preview is always free. |
| 7 | Flieg deine Strecke in 3D ab | Der 3D-Überflug fliegt deine Route über echtes Satellitengelände ab, während Geschwindigkeit, Distanz und Zeit live mitlaufen. Pausieren, spulen, auf 2× oder 4× beschleunigen – und bei einer Tour fliegt die Kamera gleich alle Etappen hintereinander. | Fly your route in 3D | 3D Flyover flies your route over real satellite terrain while speed, distance and time run live alongside. Pause, scrub, speed it up to 2× or 4× — and for a tour the camera flies every stage back to back. |
| 8 | Auf dem Homescreen. Und bei dir. | Widgets für Wochen-, Monats- und Jahresdistanz, direkt aus Apple Health. Und deine Daten bleiben auf deinem iPhone – hochgeladen wird nur, was du ausdrücklich freigibst. | On your home screen. And yours alone. | Widgets for weekly, monthly and yearly distance, straight from Apple Health. And your data stays on your iPhone — nothing is uploaded unless you explicitly switch it on. |

### 6.3b Strava unlock band — copy

Frame it as an **outcome, not an integration**. Nobody wants "Strava integration"; they want the power numbers their head unit recorded. Lead with what appears, not with the connector.

**DE**
- H2: **Verbinde Strava – und deine Fahrten werden vollständig**
- Lead: Dein Radcomputer zeichnet weit mehr auf, als in Apple Health landet. Verbinde einmal Strava, und Ride Streak holt sich den Rest: Leistung, Trittfrequenz, Splits, Segmente, Runden – und deine echten Trainingszonen, FTP und Gewicht.
- Bullets: `Leistung & Trittfrequenz von Powermeter und Radcomputer` · `Strava-Segmente mit PR-Medaillen und Top-10-Kronen` · `Runden von deinem Garmin oder Wahoo` · `Fahrten, die nie in Apple Health ankommen, werden trotzdem gezählt` · `Deine echten Herzfrequenzzonen statt einer Schätzung nach Alter`
- Closing line: Kein Muss: Ride Streak funktioniert auch mit Apple Health allein. Strava macht es nur genauer.

**EN**
- H2: **Connect Strava — and your rides fill in**
- Lead: Your bike computer records far more than reaches Apple Health. Connect Strava once and Ride Streak picks up the rest: power, cadence, splits, segments, laps — plus your real training zones, FTP and weight.
- Bullets: `Power & cadence from your power meter and head unit` · `Strava segments with PR medals and top-10 crowns` · `Laps from your Garmin or Wahoo` · `Rides that never reach Apple Health still get counted` · `Your real heart-rate zones instead of an age-based guess`
- Closing line: Optional: Ride Streak works on Apple Health alone. Strava just makes it sharper.

**Required on this band** (section 4.11 brand rules): the official **"Connect with Strava"** button artwork, unmodified, and the **"Powered by Strava"** badge. Do not write your own orange button.

### 6.4 Pricing copy

**DE:** Ride Streak ist kostenlos – Statistiken, Ziele, Streak, Rekorde, Fahrtdetails, Werkstatt, Touren und Widgets sind ohne Abo dabei. **Pro** schaltet Trainingsbelastung, Leistungsanalyse, Fitness & Form, 3D-Überflug, Bild- und Video-Export, Kalorien und iCloud-Sync frei.
**EN:** Ride Streak is free — stats, goals, streak, records, ride details, the Garage, tours and widgets need no subscription. **Pro** unlocks training load, power analysis, Fitness & Form, 3D Flyover, image and video export, calories and iCloud sync.

### 6.5 FAQ — questions and answers (both languages)

Write full answers for each; keep every answer 40–70 words, self-contained, and starting with a direct answer sentence (this is what gets quoted by AI answer engines).

1. Does Ride Streak record my rides? / Zeichnet Ride Streak meine Fahrten auf? — **No.** It reads rides from Apple Health and Strava. Record with your Apple Watch, Garmin, Wahoo or any app that writes to Apple Health.
2. Is Ride Streak free? / Ist Ride Streak kostenlos? — Yes, with an optional Pro subscription. List what's free.
3. Do I need Strava? / Brauche ich Strava? — No; Apple Health alone is enough. Strava adds power, cadence, splits, segments, laps and rides from bike computers.
4. Does it work with Garmin / Wahoo? / Funktioniert es mit Garmin und Wahoo? — Yes, via Strava (and via Apple Health where the device writes there).
5. Which iPhone / iOS do I need? — iPhone with iOS 18.5 or later.
6. Is there an Apple Watch app / an Android version / an iPad app? — No; Apple Watch rides arrive via Apple Health.
7. Where does my data go? / Was passiert mit meinen Daten? — Use the 4.10 wording.
8. What does the Garage track? / Was verfolgt die Werkstatt? — List the part types and the wear states.
9. What is Fitness & Form / CTL, ATL, TSB? — Short, precise definition. (High-value AI-answer surface.)
10. Can I cancel? / Kann ich kündigen? — Yes, anytime in iPhone Settings; lifetime is a one-time purchase.
11. How is it different from Strava / Apple Fitness? — The wedge, in 60 words.

---

## 7. SEO

### 7.1 Strategy in one paragraph
This page has ~zero domain authority and competes with Strava, Komoot and magazine listicles for head terms. Do **not** chase "Fahrrad App". Win on (a) **branded** terms, (b) **integration long-tail** ("Apple Health Fahrrad Statistiken App", "cycling app that reads Apple Health"), (c) **maintenance long-tail** — a niche almost nobody covers and where intent is very high ("Kettenverschleiß App", "bike chain wear tracker app"), and (d) **AI answer engines**, where a precise, well-structured, schema-marked page can be cited even without authority. Everything below serves those four.

### 7.2 Keyword map

**German (primary market)**

| Intent tier | Keywords | Target surface |
|---|---|---|
| Brand | ride streak app, ridestreak, ride streak fahrrad app | Homepage title + Organization schema |
| Core / integration | fahrrad app apple health, apple health fahrrad statistiken, radfahren statistik app iphone, fahrrad kilometer app iphone, fahrrad tacho app auswertung | H1/H2, hero, features 1+6 |
| Maintenance (high intent, low competition) | fahrrad wartung app, werkstatt app fahrrad, kettenverschleiß app, fahrrad kilometerstand bauteile, wann kette wechseln km, fahrrad komponenten verschleiß tracken, bike garage app | Werkstatt section H2 + a dedicated blog post |
| Training / data | trainingsbelastung radfahren app, tss ohne powermeter, ctl atl tsb app, leistungsanalyse radsport app, ftp schätzen app, powerkurve app | Feature 4 + FAQ 9 + blog |
| Comparison | strava alternative iphone, strava alternative kostenlos, apple fitness radfahren auswertung | FAQ 11 + a comparison page |
| Feature long-tail | rennrad statistiken app, mehrtagestour radreise app, fahrrad video mit daten teilen, 3d überflug strecke fahrrad | Feature 5, blog |

**English**

| Intent tier | Keywords |
|---|---|
| Brand | ride streak app, ridestreak cycling app |
| Core / integration | apple health cycling stats app, cycling app for apple health, ios cycling stats widget, cycling app that syncs with apple health |
| Maintenance | bike maintenance tracker app, chain wear tracker app, bike component mileage tracker, when to replace bike chain app, bike garage app iphone |
| Training / data | cycling training load app iphone, tss app without power meter, ctl atl tsb app ios, cycling power curve app, ftp estimate app |
| Comparison | strava alternative iphone, best cycling stats app iphone, apple fitness cycling analysis |
| Feature long-tail | multi day bike tour app, share cycling video with stats, 3d route flyover cycling |

**Rules:** one primary keyword per page; keyword in H1, first 100 words, one H2, title, meta description, and one image alt. Do not repeat it more than ~1 % of body text. Never keyword-stuff the German — bad German reads as spam to both users and Google.

### 7.3 Metadata and structured data

**Titles** (≤ 60 chars, brand last):
- DE home: `Ride Streak – Fahrrad-Statistiken aus Apple Health & Strava`
- EN home: `Ride Streak – Cycling Stats from Apple Health & Strava`

**Meta descriptions** (140–158 chars, contain the promise + a differentiator + a soft CTA):
- DE: `Verwandle deine Apple-Health- und Strava-Fahrten in echte Radsport-Analysen: Statistiken, Trainingsbelastung und eine Werkstatt, die Verschleiß mitzählt. Kostenlos für iPhone.`
- EN: `Turn your Apple Health and Strava rides into real cycling analysis: stats, training load, and a garage that tracks component wear. Free on iPhone.`

**Heading discipline:** exactly one `<h1>` per page; sections use `<h2>`; sub-points `<h3>`. Never use a heading tag for styling.

**JSON-LD — put all of it in one `<script type="application/ld+json">` with an `@graph`.** Required blocks:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "@id": "https://ridestreak.de/#app",
      "name": "Ride Streak",
      "alternateName": "RideStreak",
      "applicationCategory": "HealthApplication",
      "applicationSubCategory": "Cycling",
      "operatingSystem": "iOS 18.5 or later",
      "url": "https://ridestreak.de/",
      "downloadUrl": "https://apps.apple.com/app/id6748264927",
      "installUrl": "https://apps.apple.com/app/id6748264927",
      "screenshot": ["https://ridestreak.de/screens/stats.png"],
      "inLanguage": ["de", "en"],
      "featureList": [
        "Cycling statistics from Apple Health",
        "Bike component wear tracking",
        "Training load (TSS) and power analysis",
        "Fitness, fatigue and form (CTL/ATL/TSB)",
        "Multi-day tours",
        "Home screen widgets",
        "Strava integration"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "category": "free with in-app purchase"
      },
      "author": { "@id": "https://ridestreak.de/#org" }
    },
    {
      "@type": "Organization",
      "@id": "https://ridestreak.de/#org",
      "name": "Ride Streak",
      "url": "https://ridestreak.de/",
      "logo": "https://ridestreak.de/logo.png",
      "founder": { "@type": "Person", "name": "Julian Manke" },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "j.manke@icloud.com"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://ridestreak.de/#website",
      "url": "https://ridestreak.de/",
      "name": "Ride Streak",
      "inLanguage": "de",
      "publisher": { "@id": "https://ridestreak.de/#org" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ridestreak.de/#faq",
      "inLanguage": "de",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Zeichnet Ride Streak meine Fahrten auf?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nein. Ride Streak liest deine Fahrten aus Apple Health und Strava …"
          }
        }
      ]
    }
  ]
}
```

Notes for the implementer:
- Emit the **language-appropriate** graph on each locale (`inLanguage`, translated FAQ text, same `@id`s for the app/org entities so the entity stays unified across locales).
- **Do not** add `aggregateRating` until there are enough real ratings, and then only with real numbers. Fabricated review markup is a manual-action risk.
- Google narrowed FAQ *rich results* in 2026, so treat `FAQPage` as an **AI/LLM trust and comprehension signal** rather than a SERP-decoration play. It still earns its place.
- Add `BreadcrumbList` on the satellite pages (7.4), not on the one-page home.

**Open Graph / Twitter:** `og:title`, `og:description`, `og:image` (1200×630, with a readable headline baked in — not a bare screenshot), `og:locale` = `de_DE` with `og:locale:alternate` = `en_US` (and the mirror on the EN page), `og:type=website`, `twitter:card=summary_large_image`.

**Apple Smart App Banner** on every page — a free, high-converting install path for iOS Safari visitors:
```html
<meta name="apple-itunes-app" content="app-id=6748264927">
```

### 7.4 Site architecture

```
/                     → DE home (or a locale-detect redirect, see 8.2)
/de/                  → German landing page
/en/                  → English landing page
/de/datenschutz  /en/privacy
/de/impressum         (German legal requirement — no /en equivalent needed, but link it from both)
/de/agb          /en/terms
/de/support      /en/support
/de/blog/…       /en/blog/…       (optional but high-leverage, see 7.6)
/sitemap.xml  /robots.txt  /llms.txt
```

- One canonical URL per language version, self-referencing `rel=canonical`.
- `sitemap.xml` with `<xhtml:link rel="alternate" hreflang="…">` entries per URL.
- `robots.txt` allowing everything, pointing to the sitemap, and **not** blocking `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` — being quotable by AI assistants is a discovery channel now, not a leak.

### 7.5 Technical SEO / performance checklist
Page speed is a ranking factor and a conversion factor (a 0.1 s improvement moves conversions measurably; > 3 s loses roughly half of mobile visitors).
- [ ] **LCP < 2.0 s** — the hero image is the LCP element: serve AVIF/WebP, correct `width`/`height`, `fetchpriority="high"`, no lazy-loading on it.
- [ ] **INP < 200 ms** — no heavy JS on the main thread; the accordion and the language switcher must be plain, cheap interactions.
- [ ] **CLS < 0.1** — explicit dimensions on every image, phone frame and video; self-host fonts with `font-display: swap` and a matched fallback metric.
- [ ] Static generation / full CDN caching. No client-side-only rendering of the copy — the text must be in the HTML source.
- [ ] Self-host fonts (no third-party font CDN; also a DSGVO point in Germany — see section 10).
- [ ] Every image has a descriptive, localized `alt`; screenshots use alts that carry keywords naturally.
- [ ] Video: `poster`, `preload="none"`, muted, `playsinline`, ≤ 1.5 MB, never the LCP element.
- [ ] Semantic HTML: `<header> <main> <section> <footer>`, real `<button>`s, visible focus states, `prefers-reduced-motion` respected (the app respects it — the site should too).
- [ ] Accessibility: 4.5:1 contrast minimum. **Check the teal `#00D4AA` on the dark background for body-size text** — it passes large but is borderline for small text; darken the background or lighten the text where needed.
- [ ] `llms.txt` at the root: a short Markdown file naming the product, what it does, platform, price model, the feature list, and links to the key pages. Cheap to add, increasingly used by AI crawlers.

### 7.6 Content that actually earns links and AI citations (optional, high ROI)
Four posts, each targeting a long-tail cluster the app genuinely answers. Publish in both languages.
1. **"Wann muss die Fahrradkette gewechselt werden? (km-Richtwerte pro Bauteil)"** / "When to replace your bike chain — and every other wearing part" — include the threshold table from the app (chain 3 000–5 000 km, cassette 10 000–15 000, brake pads 5 000–8 000, tires 5 000–8 000, cables 5 000–10 000, bar tape 5 000–10 000, rotors 15 000–30 000). This is genuinely useful, extremely quotable, and nobody owns it.
2. **"CTL, ATL, TSB einfach erklärt"** / "Fitness, fatigue and form explained" — with the without-a-power-meter (hrTSS) angle.
3. **"Wie du deine Fahrrad-Kilometer in Apple Health auswertest"** / "How to see your total cycling distance in Apple Health" — pure integration intent, ends naturally in the app.
4. **"Strava-Alternativen für iPhone 2026"** / "Strava alternatives for iPhone" — honest comparison including where Strava wins. Honest comparisons get linked; puff pieces don't.

---

## 8. Localization (DE + EN)

### 8.1 Scope
Everything user-visible: nav, hero, all sections, FAQ, pricing, footer, legal pages, form labels and errors, `alt` text, meta title/description, OG tags, JSON-LD text fields, the App Store badge artwork, and the screenshots themselves (see section 11 — German screenshots on the German page, English on the English page).

### 8.2 Routing
- Path-based prefixes: `/de/…` and `/en/…`. **Do not** use query strings or cookies to select the language — search engines cannot index those variants.
- `/` should either serve the German page with a `rel=canonical` to `/de/` or 302 to a locale detected from `Accept-Language`. **A redirect must never be permanent (301) and must never be the only path** — always expose both `/de/` and `/en/` as directly crawlable URLs, and never redirect a crawler based on IP geolocation (Google crawls from the US and would only ever see English).
- Remember the user's explicit choice in `localStorage`, and let it override detection — but only after the first render, and never for bots.

### 8.3 hreflang (get this exactly right — it is the whole point)
On **every** page, in `<head>`, including a self-reference:
```html
<link rel="alternate" hreflang="de" href="https://ridestreak.de/de/" />
<link rel="alternate" hreflang="en" href="https://ridestreak.de/en/" />
<link rel="alternate" hreflang="x-default" href="https://ridestreak.de/" />
```
Rules: annotations must be **reciprocal** (the EN page must point back at the DE one), must use absolute URLs, must match the canonical of the target, and must exist on every localized URL pair including the legal and blog pages. Set `<html lang="de">` / `<html lang="en">` accordingly.

### 8.4 Translation quality rules
- German is **not** a translation target here — it is the primary market. Write German first for the DE page and English first for the EN page where the phrasing differs; only structure is shared.
- Address the reader as **du** in German, always. Never *Sie*. This matches the app.
- Do not translate: *Ride Streak*, *Pro*, *Apple Health*, *Strava*, *Garmin*, *Wahoo*, *Widget*, *Streak*, *TSS*, *FTP*, *CTL/ATL/TSB*, *Flyover*, *Watt*.
- Do translate the App Store badge (Apple provides localized artwork: "Laden im App Store").
- Units: km, m, kcal, km/h, W, °C in both locales (the app is metric-only). Do **not** show miles on the English page — the app does not offer imperial units. If that ever changes, this line changes.
- Number formatting: German uses `1.234,5`, English `1,234.5`. Dates: `06.09.2026` vs `Sep 6, 2026`.
- German compound-noun discipline: *Trainingsbelastung*, *Verschleißkontrolle*, *Höhenmeter*, *Leistungsanalyse* — not English-German hybrids.

### 8.5 Implementation shape
Keep all copy in per-locale message files (`locales/de.json`, `locales/en.json` or the framework's equivalent), keyed by section — never inline strings in components, and never a `if (lang === 'de')` ternary in JSX. Keys mirror the section structure: `hero.h1`, `features.garage.bullets[0]`, `faq.recording.answer`, `meta.title`. This is what makes a third language cheap later.

### 8.6 The language switcher
Top-right of the header and repeated in the footer. Show `DE / EN` as text (not flags — flags mean countries, not languages, and Austrian and Swiss visitors read German too). It must link to the **equivalent page in the other language**, not to the other homepage.

---

## 9. Design & conversion recommendations

### 9.1 Keep
The dark palette, the teal accent, the card-based rhythm and the overall calm. It matches the app and reads as premium. The problems below are about *specificity and hierarchy*, not about taste.

### 9.2 The design system — define these once, then use only these

Right now `#00D4AA` is pasted as a Tailwind arbitrary value ~50 times and the shadcn HSL theme in `tailwind.config.js` is bypassed. Fix the foundation first; every section spec below assumes these tokens exist.

```css
/* src/index.css — replace the unused shadcn block with a system the page actually uses */
:root {
  /* Brand */
  --rs-teal:        #00D4AA;
  --rs-teal-bright: #2DD4B5;   /* stats-screen variant, for gradients */
  --rs-teal-dim:    #0A8F76;   /* borders, dividers, muted accents */
  --rs-gold:        #E8B84B;   /* Pro badges, records — use sparingly */
  --rs-strava:      #FC5200;   /* Strava brand elements ONLY */

  /* Surfaces — a real scale, not slate-* with random opacity */
  --rs-bg:          #0A0A0B;   /* page */
  --rs-surface-1:   #121317;   /* cards */
  --rs-surface-2:   #1A1C22;   /* raised cards, hover */
  --rs-border:      #262A33;
  --rs-border-lit:  rgba(0, 212, 170, 0.24);  /* accent-lit card borders */

  /* Text — contrast-checked on --rs-bg */
  --rs-text:        #F5F7FA;   /* headings        ~17:1 */
  --rs-text-body:   #C3C9D4;   /* body            ~10:1 */
  --rs-text-muted:  #8A94A6;   /* captions        ~5.2:1 — do not go dimmer */

  --rs-radius-card: 16px;
  --rs-radius-pill: 999px;
}
```

Expose them in `tailwind.config.js` under `theme.extend.colors` (`teal: 'var(--rs-teal)'`, `surface: {1:…, 2:…}`, …) so the markup reads `bg-surface-1 border-border text-body` instead of `bg-slate-800/40 border-slate-700 text-slate-400`. **Then ban arbitrary colour values in review.**

⚠️ **Contrast warning:** `#00D4AA` on `#0A0A0B` is fine for large text and for UI accents, but it fails the 4.5:1 body-text threshold in some pairings and looks harsh at small sizes. Use teal for headings, numbers, icons, borders and buttons — **never for paragraph text**. Button labels on a teal fill must be near-black (`#06231C`), not white: white on teal is ~1.9:1 and unreadable.

**Type scale** (fluid, so it works from 375 px to 1440 px without media queries):

| Role | Size | Weight | Tracking / leading |
|---|---|---|---|
| H1 | `clamp(2.5rem, 6vw, 4.5rem)` | 800 | `-0.03em` / `1.05` |
| H2 | `clamp(1.75rem, 3.5vw, 2.75rem)` | 700 | `-0.02em` / `1.15` |
| H3 / card title | `1.25rem` | 600 | `-0.01em` / `1.3` |
| Lead paragraph | `clamp(1.05rem, 1.6vw, 1.25rem)` | 400 | `1.6` |
| Body | `1rem` (never below `16px`) | 400 | `1.65` |
| Caption / label | `0.875rem` | 500 | `1.5`, `0.02em` |
| Stat number | `clamp(2rem, 4vw, 3rem)` | 700, **tabular-nums** | `1` |

One typeface, self-hosted (section 10). **Inter**, **Geist** or **Satoshi** all fit the app's look; Inter is the safe default. Load 400/600/700/800 only, `woff2`, `font-display: swap`, with `size-adjust` on the fallback stack to prevent CLS.

**Rhythm:** section padding `clamp(4rem, 9vw, 7rem)` vertical. Content container `max-width: 1200px`, gutter `24px` mobile / `48px` desktop. Prose blocks capped at `62ch` — the current sub-headline runs full width and reads as a wall.

### 9.3 Section-by-section design spec

Each item is *what to change*, concretely.

**Header.** 64 px tall, `backdrop-filter: blur(12px)` over `rgba(10,10,11,0.72)`, 1 px bottom border that only appears after 40 px of scroll. Left: wordmark. Centre: 5 anchor links, `0.9375rem`, `--rs-text-muted`, teal on hover with a 2 px teal underline that grows from the centre (150 ms). Right: `DE | EN` text switcher, then a compact teal CTA button that **fades in only once the hero CTA has scrolled out of view** (`IntersectionObserver` on the hero button). Mobile: hamburger → full-screen sheet, not a cramped dropdown.

**Hero.** Two-column at ≥ 1024 px (copy 55 % / device 45 %), stacked below.
- Kill the "⚡ Unterstützt von HealthKit" pill as the first element — an integration detail should not be the first thing a visitor reads. If you want a pill there, make it the streak: `🔥 Deine längste Serie beginnt heute`. Better: no pill, and let the H1 land first.
- H1 on **two lines maximum**. The current German H1 breaks "Radsport-" / "Reise" across lines with a hyphen — visually broken. Set `text-wrap: balance` and `hyphens: none`, and hard-control the break with a `<br>` at the intended point.
- Sub-headline: **two lines, max 62ch.** Cut the current three-line adjective run.
- CTA: official App Store badge, ≥ 48 px tall, plus — directly beneath, not beside — the trust line at `0.875rem` in `--rs-text-muted`. Add a secondary ghost link "Funktionen ansehen ↓" to give non-ready visitors a path that isn't "leave".
- Device: **one** phone, ~320 px wide, in a real frame (rounded 44 px, 8 px bezel `#1A1C22`, subtle inner highlight), tilted `rotateY(-12deg) rotateX(4deg)` with a soft teal radial glow behind it and a `0 40px 80px -20px rgba(0,0,0,.7)` drop shadow. The current four flat rectangles side by side are all unreadable — that is the single biggest visual problem on the page.
- Background: `--rs-bg` with one large radial gradient (teal at 6 % opacity, 900 px, upper right) and a very faint contour/route-line SVG at 3 % opacity. No mesh gradients, no particles.

**Wedge band (new).** Full-bleed `--rs-surface-1`, 3 columns, each a single 12–16 word statement with a thin teal icon above. No cards, no borders — this band should feel like a breath between the hero and the feature depth.

**Feature sections 1–6.** Alternating two-column, image and copy swapping sides. Per section: an eyebrow label (`0.8125rem`, uppercase, `0.08em` tracking, teal) → H2 → 2–3 sentence lead → 3–4 bullets with 16 px teal check/dot icons → optional inline stat strip. Images in the same device frame as the hero, ~380 px wide, **one per section, large enough to read the actual numbers.**
- **Break the grid twice**, or six alternating rows read as a template: make **Section 3 (Garage)** full-bleed with a distinct `--rs-surface-1` background and a 3-up row of wear-state cards (healthy / replace soon / overdue) beneath the main copy — it is the differentiator and deserves the page's strongest moment. Make **Section 5 (Tours & Sharing)** a wide media band with the 3D-Flyover loop running at 16:9 rather than in a phone frame.
- Cards (used inside sections and for the free/Pro table): `--rs-surface-1`, 1 px `--rs-border`, 16 px radius, 24 px padding, and on hover `--rs-border-lit` + `translateY(-2px)` over 180 ms. The current cards are flat with no hover state at all, which makes them read as static images rather than content.

**Strava unlock band (feature 3).** Deliberately *not* another alternating image/text row — it is an enabler, and giving it a full hero-sized section would overstate it while breaking the page rhythm. Full-bleed `--rs-surface-1`, one column, `max-width: 900px`, centred. H2, lead, then the five unlocks as a **two-column checklist** with `--rs-strava` (`#FC5200`) tick icons — the one place on the page that colour is allowed. Beneath: the official "Connect with Strava" button artwork shown at rest (it is an illustration here, not a live control — do not link it anywhere), and the "Powered by Strava" badge. A thin `#FC5200` top border at 30 % opacity separates the band from the sections above and below. Keep it to roughly half the vertical height of a full feature section.

**Free vs Pro table.** Two columns on desktop; on mobile do **not** shrink the table — switch to two stacked cards with a checkmark list each. Pro column gets a teal top border, a `Pro` gold pill, and a subtle teal glow. Rows: feature name left, `✓` or `—` right, alternating row tint at 2 % white.

**Pricing.** Three cards, the annual one **scaled 1.05× with a teal border and a "Beliebteste"/"Best value" pill overlapping the top edge**. Price in the stat-number style with tabular figures. Recompute and fix the savings line (section 1A). Under the cards, one muted line about auto-renewal and cancellation.

**FAQ.** Single column, `max-width: 800px`, one accordion item per question: question at `1.0625rem`/600, a `+`→`×` rotating icon, `grid-template-rows: 0fr → 1fr` transition (no `max-height` hacks, no layout jank). **All answers must be in the DOM at all times** — collapsed via CSS, not conditionally rendered — or you lose the whole AI-citation benefit from section 7.

**Final CTA band.** Full-bleed, a `--rs-teal-dim → --rs-bg` vertical gradient, centred: one line of promise, the badge, the trust line. Generous — `clamp(5rem, 10vw, 8rem)` of vertical padding. This is the last impression; do not crowd it.

**Footer.** Four columns (product / legal / support / language), `--rs-text-muted` at `0.875rem`, thin top border, the "Powered by Strava" badge and the Apple trademark line at the bottom in the smallest size.

**Mobile sticky CTA.** Fixed bottom bar, `env(safe-area-inset-bottom)` respected, `--rs-surface-2` with a blur and a top border, containing the App Store badge full-width. Appears after the hero leaves the viewport, hides while the user scrolls up (so it never fights the content). This is the single highest-leverage conversion addition on the page.

### 9.4 Motion
- Section entry: `opacity 0→1` + `translateY(16px→0)`, 500 ms, `cubic-bezier(.16,1,.3,1)`, triggered once by `IntersectionObserver` at 15 % visibility, staggered 60 ms between siblings. Nothing more elaborate.
- Hero device: a 3–4 s settle on load, then still. Nothing below the hero may animate unprompted.
- Hero video (3D Flyover or the speed-coloured map drawing itself): ≤ 6 s, muted, `loop`, `playsinline`, `preload="none"` with a poster, ≤ 1.5 MB, and **never** the LCP element.
- Wrap **all** of it in `@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }` — the app itself honours Reduce Motion in the Flyover, so the site doing less would be inconsistent.

### 9.5 Screenshot presentation
- Show **real, credible data**. The current screenshots show 163.7 km in a month and a "10 km" challenge — that reads as an empty demo account and actively undersells the app to the serious cyclist you are targeting. Use a four-figure monthly distance, a real elevation profile, a populated power curve, a Garage with genuine wear states.
- Every screenshot in the same device frame with the same tilt, glow and shadow, so the page reads as one system.
- Status bar cleaned: full battery, no notification badges, a sensible time.
- Never crop a screenshot so a metric is half-visible; never stack more than two devices in one viewport.

### 9.6 Measurement

 (do this from day one, or you cannot optimize)
- Append campaign parameters to every App Store link so App Store Connect attributes them:
  `https://apps.apple.com/app/id6748264927?pt=PROVIDER_ID&ct=web_hero&mt=8` — use a distinct `ct` per CTA position (`web_hero`, `web_garage`, `web_pricing`, `web_sticky`, `web_footer`). ⚠️ `pt` (provider token) comes from App Store Connect.
- Privacy-friendly analytics (Plausible / Fathom / Umami) — avoids the cookie-banner problem entirely (section 10) while still giving you per-CTA click-through.
- Track: scroll depth, CTA clicks by position, language switcher use, FAQ opens, and the sticky-bar click rate.
- Search Console: verify **both** locale paths, submit the sitemap, and watch which of the four keyword tiers actually lands.

---

## 10. Legal & compliance (German market — not optional)

- **Impressum** at `/de/impressum`, linked from every page footer, with the operator's full name, postal address, email and — because this is a commercial offering — the content required by § 5 DDG. A missing or hard-to-find Impressum is directly actionable in Germany (*Abmahnung*).
- **Datenschutzerklärung** at `/de/datenschutz` (+ `/en/privacy`), hosted **on the domain**. Move it off the GitHub Gist — a Gist is not a compliant, stable, trustworthy privacy-policy location, and it costs E-E-A-T. It must cover the website (hosting, logs, analytics, fonts) *and* reference the app's data handling, including RideStreak Cloud (opt-in, EU-hosted, daily aggregates only, withdrawal/deletion rights). The material for the app side already exists in the app repo at `docs/BackendPrivacy.md` — reuse those texts, they are final and bilingual.
- **Self-host fonts and any other assets.** Loading Google Fonts from Google's CDN transmits visitor IPs to the US and has produced German court judgments against site operators. Self-host.
- **Cookies/consent:** if you use only privacy-friendly, cookieless analytics and self-hosted assets, you need **no cookie banner** — which is itself a conversion win. If you add anything that sets non-essential cookies (GA4, Meta pixel), you need a real TTDSG/DSGVO consent banner with a genuine reject option. Strongly prefer the first path.
- **Trademarks:** Apple trademark attribution line in the footer; Strava rules per section 4.11; use "Garmin" and "Wahoo" as plain text references, not logos, unless you have checked their brand guidelines.
- **Pricing display:** if prices are shown, they must be accurate and inclusive of VAT for German consumers.

---

## 11. Screenshot plan

### 11.0 ⚠️ The existing screenshots are gone — do not reference the old filenames

The four screenshots the current page ships are **obsolete and are being replaced by new captures under new filenames.** The old set was:

```
challenge-creation.jpeg      ← Challenges feature, REMOVED FROM THE APP
challenges.jpeg              ← Challenges feature, REMOVED FROM THE APP
statistics.jpeg              ← superseded by the redesigned Stats tab
workout-details.jpeg         ← superseded by the redesigned ride detail
```

**Rules for the implementing agent:**

1. **Do not assume any filename.** List the directory and use what is actually there:
   `ls /Users/jmanke/Documents/Code/react-js/AI/ridestreaklanding/public/images/`
   The new files have different names from the four above. Two of the old concepts (`challenges`, `challenge-creation`) have **no replacement at all** — the feature no longer exists (section 4, "Do NOT put these on the page").
2. **Both directories must be updated.** Screenshots exist twice in that repo:
   - `public/images/` — served verbatim
   - `src/images/` — imported by `src/App.js` (`import statisticsImg from "./images/statistics.jpeg"`) and hashed by the bundler
   Replacing only `public/images/` leaves the *actual rendered page* on the old pictures, because the live `<img>` tags are fed by the `src/images/` imports. This is the most likely way to "finish" this task and ship nothing. Fix the imports in `App.js` to the new names, or consolidate on one location.
3. **Any import of a removed file breaks the build.** `src/App.js` currently imports `challenges.jpeg` and `challenge-creation.jpeg` by name; once those are gone, `npm run build` fails until the imports and their JSX are deleted along with the Challenges copy.
4. **Suggested naming** for the new set, so the mapping to this brief's sections is self-evident — adopt it if the delivered names are not already meaningful, and use the same stem for every format/density (`stats-hero.avif`, `stats-hero@2x.avif`, `stats-hero.jpeg`):

   `stats-hero` · `stats-records` · `ride-detail-map` · `ride-detail-elevation` · `garage-overview` · `garage-bike-parts` · `training-load` · `power-analysis` · `fitness-form` · `tour-create` · `tour-detail` · `share-editor` · `share-output` · `flyover` (+ `flyover.mp4`) · `widgets`

   Each also needs a `-de` / `-en` variant (section 8.1) — e.g. `garage-overview-de.avif`.

### 11.1 The shots to produce

The owner produces these from the current app build. Shoot **each one twice: German UI and English UI**, and serve the matching language on the matching page.

| # | Screen | What must be visible | Where used | Alt text (DE / EN) |
|---|---|---|---|---|
| 1 | Stats tab with an active goal | Progress ring, a 4-figure period total, delta pill vs. previous period, period chips | Hero | "Ride Streak Statistik-Tab mit Jahresziel-Ring und Vergleich zum Vorjahr" / "Ride Streak stats tab showing a yearly goal ring and year-over-year comparison" |
| 2 | Stats tab scrolled to activity bars + records | Ghost comparison line, personal-records podium, streak banner | Feature 1 | … |
| 3 | Ride detail, top | Hero stats, speed-coloured route map | Feature 2 | … |
| 4 | Ride detail, elevation + HR zones | Elevation profile with scrubber, zone bars | Feature 2 | … |
| 4b | **Strava connection** — Settings row connected, or the onboarding Strava page | The official Connect with Strava button, and/or a connected state showing the athlete name and last sync | Feature 3 (band) | "Strava mit Ride Streak verbinden für Leistung, Trittfrequenz und Segmente" / "Connecting Strava to Ride Streak for power, cadence and segments" |
| 4c | **A ride enriched by Strava** | The Strava Segments or Laps section of a ride detail, with the "Powered by Strava" badge visible | Feature 3 (band) | "Strava-Segmente einer Fahrt mit PR-Medaillen" / "Strava segments on a ride, with PR medals" |
| 5 | Garage overview | 2–3 bikes with wear rings in different states (healthy / replace soon / overdue) | Feature 3 (make this one large) | "Werkstatt-Ansicht mit Verschleißanzeige für Kette, Reifen und Bremsbeläge" / "Garage view showing wear status for chain, tires and brake pads" |
| 6 | Bike detail, part list | Part cards with km, thresholds, colour-coded status, a model name | Feature 3 | … |
| 7 | Training Load / Effort section | Radial gauge, TSS, NP, IF, W/kg, source badge | Feature 4 | … |
| 8 | Power Analysis | Best-effort chips, power curve, zone distribution | Feature 4 | … |
| 9 | Fitness & Form chart | CTL/ATL/TSB curves with the form band | Feature 4 | … |
| 10 | **Tour creation** — the workout-selection step | Rides being picked into a tour, or the auto-detected tour suggestion card | Feature 5 | "Tour erstellen: Fahrten für eine mehrtägige Radtour auswählen" / "Creating a tour: selecting rides for a multi-day cycling trip" |
| 11 | Tour detail | Day-by-day timeline, aggregate stats (distance, elevation, days), tour map | Feature 5 | "Tour-Detail mit Tagesverlauf, Gesamtdistanz und Höhenmetern" / "Tour detail with day-by-day timeline, total distance and elevation" |
| 12 | **Sharing — the editor** | The share screen mid-edit: photo/video switch, stat toggles, live preview | Feature 6 | "Workout teilen: Werte auswählen und live in der Vorschau sehen" / "Share Workout: choosing which stats appear, with a live preview" |
| 13 | **Sharing — the finished output** | A completed share image over a real photo, with the stat overlay and a gold RECORD badge | Feature 6 (lead image) | "Geteiltes Foto einer Fahrt mit eingeblendeter Distanz, Route und Rekord-Abzeichen" / "Shared ride photo with distance, route and record badge overlaid" |
| 14 | **3D Flyover — mid-flight** | A frame over 3D satellite terrain with the live speed/distance/time readouts visible | Feature 7 (lead image) | "3D-Überflug: Kameraflug über die Strecke mit Live-Werten" / "3D Flyover: camera flying the route with live readouts" |
| 15 | **3D Flyover — short video loop** | 4–6 s screen recording of the flyover in motion (see 9.4 for the encoding limits) | Feature 7 / optional hero video | (video — `aria-label`, and a poster frame with the same alt as #14) |
| 16 | Home screen with all three widgets | Week (with bar chart), month, year | Feature 8 | "Homescreen-Widgets mit Wochen-, Monats- und Jahresdistanz" / "Home screen widgets showing weekly, monthly and yearly distance" |

Technical: export at device resolution, serve AVIF/WebP with a PNG fallback, `srcset` at 1×/2×, explicit `width`/`height`, lazy-load everything below the fold, `alt` in the page's language. Status bar cleaned up (full battery, no notifications, sensible time).

---

## 12. Definition of done

- [ ] Rendering approach decided and implemented per section 1A (Astro/Next static export, or CRA + prerender) — **verify with `curl https://ridestreak.de/ | grep` for a headline and for the JSON-LD; if they are not in the raw HTML, the SEO work is not done**
- [ ] `public/CNAME` still emitted by the new build; `ridestreak.de` still resolves after deploy
- [ ] `"homepage"` set to `/` so `/de/` and `/en/` asset paths resolve
- [ ] `og:image` replaced with a 1200×630 PNG/JPEG (not the SVG); link preview verified in iMessage, WhatsApp and LinkedIn
- [ ] Dead `src/*.tsx` files deleted; `npm test` green or the default CRA test removed
- [ ] Contact `mailto:` form replaced with a working endpoint or a plain mail link
- [ ] Screenshots replaced in **both** `public/images/` and `src/images/`, old imports removed from `App.js`, build passes
- [ ] Every mention of Challenges/Herausforderungen removed from copy, nav and images
- [ ] All 18 screenshots replaced with current builds, in both languages
- [ ] **Nine** feature sections/bands implemented per 5.5 with the copy from section 6 — tours, sharing and 3D Flyover each get their own section, not a shared one
- [ ] German page uses **Werkstatt** and **3D-Überflug** (never "Garage"/"3D-Flyover") per the terminology table in 6.0
- [ ] Free vs Pro table present and accurate against section 4
- [ ] Pricing section live with **verified** prices, and the annual-savings figure recomputed (currently wrong by €1 — section 1A)
- [ ] FAQ with all 11 questions, answers present in the HTML source
- [ ] `/de/` and `/en/` both live, fully translated, reciprocal hreflang + x-default, self-referencing canonicals
- [ ] Language switcher links page-to-equivalent-page, in header and footer
- [ ] JSON-LD `@graph` (MobileApplication + Organization + WebSite + FAQPage) valid in Google's Rich Results Test, per locale
- [ ] Localized title + meta description + OG tags + `apple-itunes-app` meta on every page
- [ ] `sitemap.xml` (with hreflang alternates), `robots.txt`, `llms.txt`
- [ ] Impressum, Datenschutz and Terms live **on the domain**, linked from the footer of every page
- [ ] Fonts self-hosted; no third-party asset CDNs; no cookie banner needed (or a compliant one if unavoidable)
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100; LCP < 2.0 s, CLS < 0.1, INP < 200 ms
- [ ] Sticky mobile CTA; CTA repeated at ≥ 4 scroll depths; every App Store link carries a distinct `ct` campaign token
- [ ] Analytics live and recording CTA clicks by position
- [ ] No claim on the page contradicts section 4's "Do NOT put these on the page" list
- [ ] Strava and Apple brand/trademark rules satisfied

---

## 13. Keeping this in sync

This brief is generated from the app repository. When the app ships a user-facing change, the app repo's `CHANGELOG.md` and `TestFlight/WhatToTest.*.txt` are updated first; **regenerate or amend section 4 of this file from those** and hand the diff to the landing-page project. `docs/PremiumFeatures.md` in the app repo is the authority on what is Free vs Pro — section 4's Pro markers must always match it.

_Compiled 2026-09-06 against RideStreak v1.1.14 (branch `feature/improvements`)._
