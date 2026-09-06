/**
 * Generates the favicon set from public/app_logo.svg.
 *
 * The site previously shipped Create React App's default logo192.png and
 * logo512.png — the React atom — as its icon and apple-touch-icon, and Google
 * indexed it as the site's favicon. favicon.ico was also just the SVG bytes
 * under a .ico extension, which is not a valid ICO container.
 *
 * Run with:  node scripts/build-icons.mjs
 * Re-run whenever app_logo.svg changes.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const src = new URL('../public/app_logo.svg', import.meta.url);
const out = (name) => new URL(`../public/${name}`, import.meta.url);
const svg = await readFile(src);

const png = (size) =>
  sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/**
 * Minimal ICO container with embedded PNGs (supported since Windows Vista and
 * by every current browser). Avoids pulling in a dependency for ~30 lines.
 */
function buildIco(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(ENTRY);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

// PNG icons referenced from <head> and the web manifest.
for (const size of [180, 192, 512]) {
  const buf = await png(size);
  const name = size === 180 ? 'apple-touch-icon.png' : `logo${size}.png`;
  await writeFile(out(name), buf);
  console.log(`wrote public/${name} (${(buf.length / 1024).toFixed(1)} kB)`);
}

// Multi-resolution favicon.ico for crawlers and older browsers.
const icoSizes = [16, 32, 48];
const ico = buildIco(
  await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(size) })))
);
await writeFile(out('favicon.ico'), ico);
console.log(`wrote public/favicon.ico (${icoSizes.join('/')} px, ${(ico.length / 1024).toFixed(1)} kB)`);
