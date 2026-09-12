import { build } from 'vite';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
// Generate ignored WebPs before Vite copies client/public into dist/public.
import './optimize-images.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist/public');
await build({ configFile: resolve(root, 'vite.config.ts') });
await build({
  configFile: resolve(root, 'vite.config.ts'),
  build: {
    ssr: resolve(root, 'client/src/entry-server.tsx'),
    outDir: resolve(root, 'dist/prerender'),
    copyPublicDir: false,
    rolldownOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
});
const { render, renderHead, pages, notFoundMeta } = await import(pathToFileURL(resolve(root, 'dist/prerender/entry-server.mjs')).href);
const template = await readFile(resolve(output, 'index.html'), 'utf8');
if (!template.includes('<!--page-head-->') || !template.includes('<!--app-html-->')) throw new Error('Missing prerender placeholders.');
for (const page of [...pages, notFoundMeta]) {
  const target = resolve(output, page.noindex ? '404.html' : page.path.slice(1) + 'index.html');
  await mkdir(dirname(target), { recursive: true });
  const html = template.replace('<!--page-head-->', () => renderHead(page)).replace('<!--app-html-->', () => render(page.noindex ? '/404.html' : page.path));
  await writeFile(target, html);
}
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(page => `  <url><loc>https://www.deejoelb.com${page.path}</loc></url>`).join('\n') + '\n</urlset>\n';
await writeFile(resolve(output, 'sitemap.xml'), sitemap);
await copyFile(resolve(root, 'CNAME'), resolve(output, 'CNAME'));
console.log(`Prerendered ${pages.length} public routes and a genuine 404 page to dist/public.`);
