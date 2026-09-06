/**
 * Post-build checks against the brief's "Definition of done" (§12).
 *
 * These are the things that are cheap to get wrong and expensive to ship:
 * removed features creeping back into copy, German pages using the English
 * product names, broken internal links, invalid JSON-LD, missing alt text.
 *
 * Run with:  npm run verify
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const problems = [];
const notes = [];

const fail = (msg) => problems.push(msg);
const note = (msg) => notes.push(msg);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(DIST);
const pages = files.filter((f) => f.endsWith('.html'));
const rel = (f) => '/' + path.relative(DIST, f);

if (pages.length === 0) fail('No HTML pages in dist/ — did the build run?');

// ---------------------------------------------------------------------------
// 1. Features that no longer exist in the app must not appear anywhere (§4).
// ---------------------------------------------------------------------------
const BANNED = [
  { re: /herausforderung/i, why: 'Challenges were removed from the app' },
  { re: /\bchallenges?\b/i, why: 'Challenges were removed from the app' },
  { re: /apple[- ]watch[- ]app/i, why: 'There is no Apple Watch app' },
  { re: /trophäenschrank|trophy cabinet/i, why: 'No reachable entry point in the app' },
];

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  for (const { re, why } of BANNED) {
    const hit = text.match(re);
    // "Apple Watch app" is allowed inside an explicit denial ("there is no…").
    if (hit && !/no Apple Watch app|keine Apple-Watch-App/i.test(text)) {
      fail(`${rel(file)}: contains "${hit[0]}" — ${why}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Terminology must match the app's own strings (§6.0).
//    German: Werkstatt / 3D-Überflug. English: Garage / 3D Flyover.
// ---------------------------------------------------------------------------
/**
 * Reader-visible text only. Asset filenames legitimately contain
 * "3d-flyover", so terminology must be judged on rendered copy, not markup.
 */
const visibleText = (html) =>
  (html.match(/<main[\s\S]*?<\/main>/) ?? [''])[0]
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

for (const file of pages.filter((f) => rel(f).startsWith('/de/'))) {
  const body = visibleText(await readFile(file, 'utf8'));
  if (/3D-?Flyover/i.test(body)) {
    fail(`${rel(file)}: uses "3D-Flyover"; the German app says "3D-Überflug"`);
  }
  if (/\bdie Garage\b/i.test(body)) {
    fail(`${rel(file)}: uses "Garage" as the feature name; German app says "Werkstatt"`);
  }
}
for (const file of pages.filter((f) => rel(f).startsWith('/en/'))) {
  const body = visibleText(await readFile(file, 'utf8'));
  if (/Werkstatt|Überflug/i.test(body)) {
    fail(`${rel(file)}: uses German feature names on an English page`);
  }
}

// ---------------------------------------------------------------------------
// 3. Head requirements on every page (§7.3, §8.3).
// ---------------------------------------------------------------------------
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const name = rel(file);

  if (!/<link rel="canonical" href="https:\/\/ridestreak\.de\//.test(html))
    fail(`${name}: missing absolute canonical`);
  for (const hl of ['de', 'en', 'x-default']) {
    if (!new RegExp(`hreflang="${hl}"`).test(html))
      fail(`${name}: missing hreflang="${hl}"`);
  }
  if (!/<meta name="apple-itunes-app" content="app-id=6748264927">/.test(html))
    fail(`${name}: missing Apple Smart App Banner meta`);
  if (!/og:image" content="https:\/\/ridestreak\.de\/og-image-(de|en)\.png"/.test(html))
    fail(`${name}: og:image is not the 1200x630 PNG`);
  if (/og:image[^>]*\.svg/.test(html))
    fail(`${name}: og:image still points at an SVG — no platform renders those`);

  const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1];
  if (!title) fail(`${name}: no <title>`);
  else if (title.length > 65) note(`${name}: <title> is ${title.length} chars (aim ≤60): ${title}`);

  const desc = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1];
  if (!desc) fail(`${name}: no meta description`);
  else if (desc.length < 80 || desc.length > 170)
    note(`${name}: meta description is ${desc.length} chars (aim 140–158)`);

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(`${name}: has ${h1s.length} <h1> elements, expected exactly 1`);

  const lang = (html.match(/<html lang="([^"]*)"/) ?? [])[1];
  const expected = name.startsWith('/en/') ? 'en' : 'de';
  if (lang !== expected) fail(`${name}: <html lang="${lang}">, expected "${expected}"`);
}

// ---------------------------------------------------------------------------
// 4. JSON-LD must parse and carry the required types (§7.3).
// ---------------------------------------------------------------------------
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) {
    fail(`${rel(file)}: no JSON-LD`);
    continue;
  }
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      fail(`${rel(file)}: JSON-LD does not parse — ${err.message}`);
      continue;
    }
    const types = (parsed['@graph'] ?? []).map((n) => n['@type']);
    if (JSON.stringify(parsed).includes('aggregateRating'))
      fail(`${rel(file)}: aggregateRating present — only 4 real ratings exist (§5.4)`);
    if (rel(file) === '/de/index.html' || rel(file) === '/en/index.html') {
      for (const t of ['MobileApplication', 'Organization', 'WebSite', 'FAQPage']) {
        if (!types.includes(t)) fail(`${rel(file)}: JSON-LD @graph missing ${t}`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 5. FAQ answers must be in the HTML source, not injected on click (§5.8).
// ---------------------------------------------------------------------------
for (const home of ['/de/index.html', '/en/index.html']) {
  const html = await readFile(path.join(DIST, home), 'utf8');
  const details = (html.match(/<details/g) ?? []).length;
  if (details < 11) fail(`${home}: ${details} FAQ items in the DOM, expected 11`);
  const ld = JSON.parse(
    (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) ?? [])[1]
  );
  const faq = ld['@graph'].find((n) => n['@type'] === 'FAQPage');
  for (const q of faq.mainEntity) {
    const answer = q.acceptedAnswer.text.slice(0, 40);
    const plain = html.replace(/<[^>]+>/g, ' ');
    const needle = answer.replace(/&/g, '&amp;');
    if (!plain.includes(needle) && !html.includes(needle))
      fail(`${home}: FAQ answer not found in rendered HTML — "${answer}…"`);
  }
}

// ---------------------------------------------------------------------------
// 6. Internal links must resolve to a real file (§12).
// ---------------------------------------------------------------------------
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    const candidates = href.endsWith('/')
      ? [path.join(DIST, href, 'index.html')]
      : [path.join(DIST, href), path.join(DIST, href, 'index.html')];
    if (!candidates.some((c) => existsSync(c)))
      fail(`${rel(file)}: broken internal link → ${href}`);
  }
}

// ---------------------------------------------------------------------------
// 7. Every image needs alt text (§7.5).
// ---------------------------------------------------------------------------
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(tag)) fail(`${rel(file)}: <img> without alt — ${tag.slice(0, 90)}`);
    if (!/\bwidth="/.test(tag) || !/\bheight="/.test(tag))
      note(`${rel(file)}: <img> without explicit dimensions (CLS risk)`);
  }
}

// ---------------------------------------------------------------------------
// 8. Pricing arithmetic — the old site shipped "Spare €2,89" against numbers
//    that yield €1,89 (§1A).
// ---------------------------------------------------------------------------
{
  const html = await readFile(path.join(DIST, '/de/index.html'), 'utf8');
  const monthly = 0.99, yearly = 9.99;
  const savings = (monthly * 12 - yearly).toFixed(2).replace('.', ',');
  if (!html.includes(savings))
    fail(`/de/: expected savings figure "${savings} €" not found in the pricing section`);
  if (/2,89/.test(html)) fail('/de/: the old, wrong "2,89" savings figure is still present');
}

// ---------------------------------------------------------------------------
// 8b. No unfilled placeholders may reach production.
//     A missing or incomplete Impressum is directly actionable in Germany
//     (Abmahnung), so an un-substituted "[Straße und Hausnummer]" must fail
//     the deploy rather than rely on someone noticing the page.
// ---------------------------------------------------------------------------
const PLACEHOLDER = /\[…\]|\[(Stra\u00dfe|PLZ|Anschrift|address|USt|optional|Adresse|Telefon|TODO)[^\]]*\]/i;

for (const file of pages) {
  const body = visibleText(await readFile(file, 'utf8'));
  const hit = body.match(PLACEHOLDER);
  if (hit) fail(`${rel(file)}: unfilled placeholder in page copy — "${hit[0]}"`);
}

// The legally required disclosures must actually be present on the Impressum.
{
  const html = await readFile(path.join(DIST, '/de/impressum/index.html'), 'utf8');
  const body = visibleText(html);
  for (const required of ['Tengstr. 36', '80796', 'M\u00fcnchen', '\u00a7 5 DDG', '\u00a7 19 UStG']) {
    if (!body.includes(required))
      fail(`/de/impressum/: missing required disclosure "${required}"`);
  }
  // Adjacent {expressions} on separate template lines collapse their
  // whitespace, which once rendered the postcode and city as "80796München".
  if (!body.includes('80796 M\u00fcnchen'))
    fail('/de/impressum/: postcode and city are not separated by a space');

  // A Postfach is not a ladungsfähige Anschrift under § 5 DDG.
  if (/postfach/i.test(body))
    fail('/de/impressum/: a Postfach is not a ladungsf\u00e4hige Anschrift under \u00a7 5 DDG');
}

// ---------------------------------------------------------------------------
// 9. Root files (§7.4).
// ---------------------------------------------------------------------------
for (const f of ['CNAME', 'robots.txt', 'llms.txt', 'sitemap-index.xml', 'og-image-de.png', 'og-image-en.png']) {
  if (!existsSync(path.join(DIST, f))) fail(`dist/${f} is missing`);
}
{
  const cname = await readFile(path.join(DIST, 'CNAME'), 'utf8');
  if (cname.trim() !== 'ridestreak.de')
    fail(`dist/CNAME says "${cname.trim()}" — the custom domain will detach`);
  const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
  for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
    if (new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*/`, 'i').test(robots))
      fail(`robots.txt blocks ${bot} — AI answer engines are a discovery channel (§7.4)`);
  }
}

// ---------------------------------------------------------------------------
// 10. Asset weight (§7.5).
// ---------------------------------------------------------------------------
{
  const heavy = [];
  for (const f of files.filter((f) => /\.(png|jpe?g|avif|webp)$/.test(f))) {
    const { size } = await stat(f);
    if (size > 900 * 1024) heavy.push(`${rel(f)} (${(size / 1024 / 1024).toFixed(1)} MB)`);
  }
  for (const h of heavy) note(`large image asset: ${h}`);
}

// ---------------------------------------------------------------------------
console.log(`Checked ${pages.length} pages.\n`);
if (notes.length) {
  console.log('Notes:');
  for (const n of notes) console.log(`  · ${n}`);
  console.log('');
}
if (problems.length) {
  console.log(`FAILED — ${problems.length} problem(s):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('All checks passed.');
