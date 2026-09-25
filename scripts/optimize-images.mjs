// Convierte las imágenes originales de /raw a WebP optimizado en src/assets/images.
// Los GIFs de producto traen el nombre y un marco de color pintados: se recortan para dejar sólo la foto.
import { readdir, mkdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const SRC = 'raw';
const OUT = 'src/assets/images';
const PRODUCT_CROP = { left: 5, top: 5, width: 230, height: 150 }; // sobre 240x191
const CROPS = {
  'logo-nuevo.jpg': { left: 0, top: 0, width: 905, height: 222 }, // QD + nombre, sin URL ni mascota
};
const MAX_WIDTH = { 'pozociego.png': 800, 'logo-nuevo.jpg': 905 };

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) continue;
  const crop = CROPS[file] ?? (ext === '.gif' ? PRODUCT_CROP : null);
  let img = sharp(join(SRC, file));
  if (crop) img = img.extract(crop);
  if (MAX_WIDTH[file]) img = img.resize({ width: MAX_WIDTH[file], withoutEnlargement: true });
  const out = join(OUT, `${basename(file, ext)}.webp`);
  const info = await img.webp({ quality: 82 }).toFile(out);
  console.log(`${file} -> ${out} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB)`);
}
