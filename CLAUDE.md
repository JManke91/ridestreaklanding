# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing site for "Ride Streak", an iOS cycling app. Create React App (react-scripts 5) + Tailwind, deployed to GitHub Pages and served on the custom domain `https://ridestreak.de` (remote: `git@github.com:JManke91/ridestreaklanding.git`). All user-facing copy is **German**.

## Commands

```bash
npm start                          # dev server on http://localhost:3000
npm run build                      # production build into build/
npm run deploy                     # predeploy runs build, then gh-pages -d build
npm test                           # CRA/Jest watch mode
npm test -- --watchAll=false       # single non-interactive run (needed in CI/agent contexts)
npm test -- src/App.test.js        # run one test file
```

There is no separate lint script — ESLint runs as part of `react-scripts start`/`build` via the `eslintConfig` block in package.json (`react-app`, `react-app/jest`). Warnings appear in the dev-server output and in build logs.

## Deployment

The site is hosted on GitHub Pages, built from the **`gh-pages`** branch, and served at **https://ridestreak.de**.

`main` and `gh-pages` are orthogonal, not two versions of the same tree: `main` is the source, `gh-pages` holds only the compiled output of `npm run build` (`index.html`, `static/`, hashed media). **Never merge, rebase, or diff one against the other** — `gh-pages` is machine-generated and force-overwritten on every deploy.

Pushing to `main` publishes nothing. To deploy:

```bash
git push origin main   # source of truth only — does NOT publish
npm run deploy         # predeploy builds, then gh-pages -d build force-pushes build/ to gh-pages
```

GitHub rebuilds Pages from `gh-pages` about a minute later.

### The CNAME must ship from public/

`public/CNAME` (containing `ridestreak.de`) is what keeps the custom domain attached. CRA copies `public/` verbatim into `build/`, so the file lands at the root of `gh-pages` on every deploy.

Do not delete it. `npm run deploy` clears the branch and republishes only `build/`; a deploy without this file drops the CNAME, GitHub clears the Custom domain field in Settings → Pages, and `ridestreak.de` breaks until the domain is retyped by hand. (Stray dotfiles such as `.gitignore` and `.claude/settings.local.json` persist on `gh-pages` only because the `gh-pages` cleanup glob does not match dotfiles — `CNAME` is not a dotfile and is therefore deleted each time.)

DNS is already configured and needs no attention: apex `ridestreak.de` → GitHub's four Pages IPs (`185.199.108-111.153`), `www` → `jmanke91.github.io`, with Enforce HTTPS on.

## Architecture

### Everything lives in src/App.js

`src/App.js` (~590 lines) is the entire page: header/nav, hero (`#download`), screenshot gallery, features (`#features`), pricing (`#pricing`, four hardcoded tiers — Free / Monthly / Yearly / Lifetime), contact (`#contact`), footer. There is no router, no data fetching, and no state beyond `isMobileMenuOpen`. Section content (feature lists, pricing tiers) is written inline as JSX, not driven by data arrays — edits mean touching the markup directly.

Two outbound integration points:
- App Store CTA: `window.open('https://apps.apple.com/de/app/ride-streak/id6748264927')` in `handleAppStoreClick`.
- Contact form: plain `<form action="mailto:j.manke@icloud.com" method="post" encType="text/plain">` — no JS submit handler, no backend.

### Two component sets — only one is live

- **Live:** `src/components/ui/*.jsx` — six hand-converted shadcn components (button, card, input, label, badge, textarea). They use relative imports (`../../lib/utils`) and only `clsx`/`tailwind-merge`/`class-variance-authority`. These are the ones `App.js` imports.
- **Dead:** ~45 `.tsx` files dumped directly in `src/` (accordion.tsx, dialog.tsx, …). They are unreferenced, import `@radix-ui/*` packages that are **not installed**, and use the `@/` alias that has no tsconfig/jsconfig to resolve it. CRA never compiles them because nothing imports them.

When a new UI primitive is needed, port it into `src/components/ui/` as `.jsx` with relative imports and no Radix dependency — do not import from the root `.tsx` files.

`src/lib/utils.js` exports only `cn()` (clsx + tailwind-merge).

### Styling reality vs. Tailwind config

`tailwind.config.js` and `src/index.css` carry the full shadcn HSL-variable theme (`--primary`, `--background`, `--radius`, `.dark` block, `darkMode: ["class"]`). `App.js` largely bypasses it: the dark look comes from hardcoded `slate-*` utilities with transparency, and the brand teal `#00D4AA` appears as arbitrary values (`bg-[#00D4AA]`, gradients) ~50 times. The CSS variables mainly matter to the `src/components/ui` primitives (e.g. `bg-primary`, `border-input` in button.jsx), so changing them affects those primitives, not the page sections.

`src/App.css` is leftover CRA boilerplate (`.App-logo` spin etc.) and is not imported anywhere.

### Images

App screenshots exist twice: `src/images/*.jpeg` (imported by `App.js`, hashed by the bundler) and `public/images/*.jpeg` (served as-is). `public/app_logo.svg` is used for the OG/Twitter preview meta tags in `public/index.html`; `package.json` sets `"homepage": "./"`, so builds emit relative asset paths — these resolve correctly at the custom-domain root.

## Known state

`src/App.test.js` is still the untouched CRA default asserting a "learn react" link, so `npm test` fails against the real landing page. Fix or replace it if you touch tests.
