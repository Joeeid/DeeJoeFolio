import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/public/', import.meta.url));
const paths = ['/', '/weddings/', '/private-events/', '/experience/'];
const titles = new Set();
for (const path of [...paths, '/404.html']) {
  const html = await readFile(resolve(root, path === '/404.html' ? '404.html' : path.slice(1) + 'index.html'), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${path}`); titles.add(title);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `One h1: ${path}`);
  assert.ok(!/corporate|Book Now|Enquire about your date|experience-bg\.jpg/i.test(html), `Removed legacy copy: ${path}`);
  assert.ok(!/<!--(?:page-head|app-html)-->|opacity:0/.test(html), `Visible rendered HTML: ${path}`);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  if (path === '/404.html') {
    assert.ok(html.includes('noindex, follow')); assert.ok(!html.includes('rel="canonical"'));
    assert.ok(!html.includes('location.replace'));
  } else {
    assert.ok(html.includes(`rel="canonical" href="https://www.deejoelb.com${path}"`));
    assert.ok(html.includes('id="contact-form"') && html.includes('Continue on WhatsApp'));
    const data = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(data['@context'], 'https://schema.org');
    assert.ok(data['@graph'].some(item => item['@type'] === 'Person'));
  }
  // Every image, JS and stylesheet emitted into the HTML must exist.
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) await access(resolve(root, match[1].slice(1)));
  // Responsive WebP candidates must be present in the deployment artifact too.
  for (const match of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/gi)) {
    for (const candidate of match[1].split(',')) {
      const url = new URL(candidate.trim().split(/\s+/)[0], 'https://www.deejoelb.com' + path);
      if (url.origin === 'https://www.deejoelb.com' && url.pathname.startsWith('/assets/')) {
        await access(resolve(root, url.pathname.slice(1)));
      }
    }
  }
  // Internal links must resolve to a generated page and an existing anchor.
  for (const match of html.matchAll(/href="((?:\/|#)[^"]*)"/g)) {
    const url = new URL(match[1].replace(/&amp;/g, '&'), 'https://www.deejoelb.com' + path);
    if (url.pathname.startsWith('/assets/')) continue;
    const relative = url.pathname.replace(/^\//, '');
    const target = resolve(root, url.pathname.endsWith('.html') ? relative : (relative ? relative.replace(/\/?$/, '/') : '') + 'index.html');
    const targetHtml = await readFile(target, 'utf8');
    if (url.hash) assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `${path}: missing anchor ${match[1]}`);
  }
}
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
for (const path of paths) assert.ok(sitemap.includes('https://www.deejoelb.com' + path));
assert.ok(!sitemap.includes('404'));
assert.equal((await readFile(resolve(root, 'CNAME'), 'utf8')).trim(), 'www.deejoelb.com');
console.log('Static SEO, route, metadata, asset and anchor checks passed.');
