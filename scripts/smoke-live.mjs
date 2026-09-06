/**
 * Smoke-tests the DEPLOYED site over HTTP.
 *
 * verify-build.mjs checks dist/ on disk, which is necessary but not
 * sufficient: it passed while the live site served no CSS and no images at
 * all, because GitHub Pages runs Jekyll and Jekyll silently drops every path
 * beginning with an underscore — including Astro's entire /_astro/ output.
 * Only a request against the real origin catches that class of failure.
 *
 * Run with:  npm run smoke            (checks https://ridestreak.de)
 *            npm run smoke -- <url>   (checks another origin)
 */
const ORIGIN = (process.argv[2] ?? 'https://ridestreak.de').replace(/\/$/, '');

const problems = [];
const fail = (msg) => problems.push(msg);

async function status(path) {
  try {
    const res = await fetch(`${ORIGIN}${path}`, { redirect: 'follow' });
    return res.status;
  } catch (err) {
    return `ERR ${err.message}`;
  }
}

async function text(path) {
  const res = await fetch(`${ORIGIN}${path}`, { redirect: 'follow' });
  return res.ok ? await res.text() : '';
}

/**
 * GitHub Pages rebuilds a minute or so after a push, so poll until the origin
 * serves a page with a resolvable stylesheet rather than failing spuriously
 * against the previous deploy.
 */
async function waitForDeploy(timeoutMs = 180_000) {
  const deadline = Date.now() + timeoutMs;
  for (let attempt = 1; ; attempt++) {
    try {
      const page = await text('/de/');
      const css = page.match(/<link[^>]+href="(\/[^"]+\.css)"/)?.[1];
      if (css && (await status(css)) === 200) return true;
      if (attempt === 1) console.log('Waiting for GitHub Pages to serve the new build...');
    } catch {
      /* origin not ready yet */
    }
    if (Date.now() > deadline) return false;
    await new Promise((r) => setTimeout(r, 5000));
  }
}

console.log(`Smoke-testing ${ORIGIN}\n`);
if (!(await waitForDeploy())) {
  console.log('FAILED — origin never served a page with a resolvable stylesheet.');
  console.log('  If /_astro/*.css is 404, .nojekyll is missing from the published branch.');
  process.exit(1);
}

// --- 1. Every page must respond -------------------------------------------
const PAGES = [
  '/', '/de/', '/en/',
  '/de/impressum/', '/de/datenschutz/', '/de/agb/', '/de/support/',
  '/en/privacy/', '/en/terms/', '/en/support/',
  '/de/blog/', '/en/blog/',
  '/de/blog/fahrradkette-wechseln/', '/en/blog/when-to-replace-bike-chain/',
  '/robots.txt', '/llms.txt', '/sitemap-index.xml',
  '/og-image-de.png', '/og-image-en.png',
  '/favicon.ico', '/logo192.png', '/apple-touch-icon.png', '/app_logo.svg',
  '/badges/appstore-de.svg', '/badges/strava-powered-white.svg',
];

for (const page of PAGES) {
  const code = await status(page);
  if (code !== 200) fail(`${page} → ${code}`);
}

// --- 2. Every asset a page actually references must resolve ---------------
//     This is the check that would have caught the Jekyll failure.
const html = await text('/de/');
if (!html) fail('/de/ returned no HTML');

const refs = new Set([
  ...[...html.matchAll(/<link[^>]+href="(\/[^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/<script[^>]+src="(\/[^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) =>
    m[1].split(',').map((c) => c.trim().split(/\s+/)[0]).filter((u) => u.startsWith('/'))
  ),
]);

let checkedAssets = 0;
for (const ref of refs) {
  if (ref.startsWith('//')) continue;
  const code = await status(ref);
  checkedAssets++;
  if (code !== 200) fail(`referenced by /de/ but returns ${code}: ${ref}`);
}

// A page with no stylesheet is the exact symptom of the Jekyll bug.
const cssRefs = [...refs].filter((r) => r.endsWith('.css'));
if (cssRefs.length === 0) fail('/de/ references no stylesheet at all');

// --- 3. The copy and structured data must be in the served HTML -----------
for (const probe of [
  'Deine Fahrten. Dein Material.',
  'Werkstatt',
  '3D-Überflug',
  'application/ld+json',
  'FAQPage',
  'Zeichnet Ride Streak meine Fahrten auf',
]) {
  if (!html.includes(probe)) fail(`/de/ served HTML is missing: "${probe}"`);
}

// --- 4. The custom domain must still be attached --------------------------
{
  const res = await fetch(`${ORIGIN}/`, { redirect: 'manual' });
  if (!res.url.startsWith('https://ridestreak.de') && ORIGIN.includes('ridestreak.de'))
    fail(`/ redirected off the custom domain to ${res.url}`);
}

// --- 5. No Create React App leftovers -------------------------------------
if ((await text('/manifest.webmanifest')).includes('Create React App'))
  fail('manifest still contains Create React App defaults');

console.log(`Checked ${PAGES.length} routes and ${checkedAssets} referenced assets.\n`);
if (problems.length) {
  console.log(`FAILED — ${problems.length} problem(s):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('Live site is healthy.');
