/**
 * Generates public/og-image-{de,en}.png at 1200×630.
 *
 * The old site pointed og:image at app_logo.svg. Facebook, LinkedIn, X,
 * WhatsApp, Slack and iMessage all ignore SVG, so every shared link previewed
 * as bare text (brief §1A, defect 1). These are real PNGs with the headline
 * baked in, so the preview says something even at thumbnail size.
 *
 * Run with:  node scripts/build-og-images.mjs
 * Re-run whenever the headline copy changes.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

// The real app icon, rendered from the same SVG that ships as the favicon.
const LOGO_PX = 84;
const logoSvg = await readFile(
  new URL('../public/app_logo.svg', import.meta.url)
);
const logoPng = await sharp(logoSvg)
  .resize(LOGO_PX, LOGO_PX)
  .png()
  .toBuffer();
const logoDataUri = `data:image/png;base64,${logoPng.toString('base64')}`;

const W = 1200;
const H = 630;

const CARDS = {
  de: {
    kicker: 'iPhone · Kostenlos',
    line1: 'Deine Fahrten.',
    line2: 'Dein Material.',
    line3: 'Dein Fortschritt.',
    sub: 'Radsport-Analysen aus Apple Health – plus eine Werkstatt,\ndie den Verschleiß mitzählt.',
  },
  en: {
    kicker: 'iPhone · Free',
    line1: 'Your rides.',
    line2: 'Your gear.',
    line3: 'Your progress.',
    sub: 'Cycling analysis from Apple Health – plus a garage\nthat counts the wear.',
  },
};

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg({ kicker, line1, line2, line3, sub }) {
  const subLines = sub.split('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2DD4B5"/>
      <stop offset="1" stop-color="#00D4AA"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.12" r="0.75">
      <stop offset="0" stop-color="#00D4AA" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#00D4AA" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0A0A0B"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#rule)"/>

  <g transform="translate(80,64)">
    <clipPath id="iconClip">
      <rect width="${LOGO_PX}" height="${LOGO_PX}" rx="${Math.round(LOGO_PX * 0.22)}"/>
    </clipPath>
    <image href="${logoDataUri}" width="${LOGO_PX}" height="${LOGO_PX}" clip-path="url(#iconClip)"/>
    <text x="${LOGO_PX + 22}" y="36" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
          font-size="32" font-weight="700" fill="#F5F7FA" letter-spacing="-0.7">Ride<tspan fill="#00D4AA">Streak</tspan></text>
    <text x="${LOGO_PX + 22}" y="63" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
          font-size="17" font-weight="500" fill="#8A94A6" letter-spacing="1.6">${esc(kicker.toUpperCase())}</text>
  </g>

  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700"
     font-size="82" letter-spacing="-2.6" fill="#F5F7FA">
    <text x="80" y="290">${esc(line1)}</text>
    <text x="80" y="378">${esc(line2)}</text>
    <text x="80" y="466" fill="#00D4AA">${esc(line3)}</text>
  </g>

  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25"
     font-weight="400" fill="#C3C9D4">
    ${subLines
      .map((l, i) => `<text x="80" y="${536 + i * 34}">${esc(l)}</text>`)
      .join('\n    ')}
  </g>
</svg>`;
}

for (const [locale, card] of Object.entries(CARDS)) {
  const png = await sharp(Buffer.from(svg(card))).png({ quality: 90 }).toBuffer();
  const path = new URL(`../public/og-image-${locale}.png`, import.meta.url);
  await writeFile(path, png);
  console.log(`wrote public/og-image-${locale}.png (${(png.length / 1024).toFixed(0)} kB)`);
}
