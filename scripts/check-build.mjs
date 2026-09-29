import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../dist/public/', import.meta.url));
const paths = ['/', '/weddings/', '/private-events/', '/experience/', '/ar/weddings/', '/ar/private-events/'];
const titles = new Set();
const descriptions = new Set();
for (const path of [...paths, '/404.html']) {
  const html = await readFile(resolve(root, path === '/404.html' ? '404.html' : path.slice(1) + 'index.html'), 'utf8');
  const arabic = path.startsWith('/ar/');
  assert.ok(html.includes(`<html lang="${arabic ? 'ar-LB' : 'en'}" dir="${arabic ? 'rtl' : 'ltr'}">`), `HTML language/direction: ${path}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${path}`); titles.add(title);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `One h1: ${path}`);
  assert.ok(!/corporate|Book Now|Enquire about your date|experience-bg\.jpg/i.test(html), `Removed legacy copy: ${path}`);
  assert.ok(!/<!--(?:page-head|app-html)-->|opacity:0/.test(html), `Visible rendered HTML: ${path}`);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(description && !descriptions.has(description), `Unique description: ${path}`);
  descriptions.add(description);
  for (const [attribute, prefix] of [['property', 'og'], ['name', 'twitter']]) {
    assert.ok(html.includes(`${attribute}="${prefix}:title" content="${title}"`), `Social title: ${path}`);
    assert.ok(html.includes(`${attribute}="${prefix}:description" content="${description}"`), `Social description: ${path}`);
    const image = html.match(new RegExp(`${attribute}="${prefix}:image" content="([^"]+)"`))?.[1];
    assert.ok(image?.startsWith('https://www.deejoelb.com/assets/'), `Canonical image origin: ${path}`);
    await access(resolve(root, new URL(image).pathname.slice(1)));
    assert.ok(html.includes(`${attribute}="${prefix}:image:alt"`));
  }
  if (path === '/404.html') {
    assert.ok(html.includes('noindex, follow')); assert.ok(!html.includes('rel="canonical"'));
    assert.ok(!html.includes('location.replace'));
  } else {
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Single canonical: ${path}`);
    assert.ok(html.includes('name="robots" content="index, follow"'));
    assert.ok(html.includes(`property="og:url" content="https://www.deejoelb.com${path}"`));
    assert.ok(html.includes(`rel="canonical" href="https://www.deejoelb.com${path}"`));
    assert.ok(html.includes('id="contact-form"') && html.includes(arabic ? 'كمّلوا على WhatsApp' : 'Continue on WhatsApp'));
    const data = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(data['@context'], 'https://schema.org');
    assert.ok(data['@graph'].some(item => item['@type'] === 'Person'));
    assert.equal((html.match(/type="application\/ld\+json"/g) || []).length, 1);
    const webpage = data['@graph'].find(item => item['@type'] === 'WebPage');
    assert.equal(webpage.url, 'https://www.deejoelb.com' + path);
    for (const item of data['@graph']) {
      if (item.image) await access(resolve(root, new URL(item.image).pathname.slice(1)));
    }
    assert.equal(webpage.inLanguage, arabic ? 'ar-LB' : 'en');
    assert.ok(html.includes(`property="og:locale" content="${arabic ? 'ar_LB' : 'en_US'}"`));
    if (/\/(weddings|private-events)\/$/.test(path)) {
      const service = data['@graph'].find(item => item['@type'] === 'Service');
      assert.equal(service.url, webpage.url);
      assert.equal(webpage.mainEntity['@id'], service['@id']);
      assert.ok(html.includes(`aria-label="${arabic ? 'مسار التصفّح' : 'Breadcrumb'}"`));
      const breadcrumb = data['@graph'].find(item => item['@type'] === 'BreadcrumbList');
      assert.equal(webpage.breadcrumb['@id'], breadcrumb['@id']);
      assert.equal(breadcrumb.itemListElement[0].name, arabic ? 'الرئيسية' : 'Home');
      assert.equal(breadcrumb.itemListElement[1].item, webpage.url);
      const englishPath = path.replace(/^\/ar/, '');
      for (const [language, alternate] of [['en', englishPath], ['ar-LB', '/ar' + englishPath], ['x-default', englishPath]]) {
        assert.ok(html.includes(`rel="alternate" hreflang="${language}" href="https://www.deejoelb.com${alternate}"`), `Alternate: ${path} → ${language}`);
      }
      assert.equal((html.match(/rel="alternate" hreflang=/g) || []).length, 3);
      assert.ok(html.includes(`href="${arabic ? englishPath : '/ar' + path}"`));
      if (arabic) {
        assert.match(title, /[\u0600-\u06ff]/);
        assert.match(description, /[\u0600-\u06ff]/);
        assert.match(service.name, /دي جي/);
        assert.equal(service.serviceType, service.name);
        assert.match(breadcrumb.itemListElement[1].name, /[\u0600-\u06ff]/);
      }
      assert.ok(html.includes('aria-current="page"'));
    }
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
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(locations.sort(), paths.map(path => 'https://www.deejoelb.com' + path).sort());
assert.ok(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
for (const entry of sitemap.matchAll(/<url>(.*?)<\/url>/gs)) {
  const path = new URL(entry[1].match(/<loc>(.*?)<\/loc>/)[1]).pathname;
  if (!/\/(weddings|private-events)\/$/.test(path)) continue;
  const englishPath = path.replace(/^\/ar/, '');
  for (const [lang, alternate] of [['en', englishPath], ['ar-LB', '/ar' + englishPath], ['x-default', englishPath]]) {
    assert.ok(entry[1].includes(`<xhtml:link rel="alternate" hreflang="${lang}" href="https://www.deejoelb.com${alternate}"/>`));
  }
}
const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes('Sitemap: https://www.deejoelb.com/sitemap.xml'));
for (const [, disallowed] of robots.matchAll(/^Disallow:\s*(\S+)/gm)) {
  assert.ok(!paths.some(path => path.startsWith(disallowed)), `Public route blocked by ${disallowed}`);
}
assert.equal((await readFile(resolve(root, 'CNAME'), 'utf8')).trim(), 'www.deejoelb.com');
console.log('Static SEO, route, metadata, asset and anchor checks passed.');
