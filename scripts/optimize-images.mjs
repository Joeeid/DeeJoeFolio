import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { imageWidths } from '../client/src/content/images.ts';
const assets = fileURLToPath(new URL('../client/public/assets/', import.meta.url));
await mkdir(assets + 'optimized', { recursive: true });
for (const name of ['deejoe-experience-1', 'deejoe-experience-2', 'hero-bg']) {
  await Promise.all(imageWidths.map(width => sharp(assets + name + '.jpg').rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${assets}optimized/${name}-${width}.webp`)));
}
console.log(`Optimized 3 existing photos at ${imageWidths.length} responsive sizes.`);
