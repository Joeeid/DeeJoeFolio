import test from 'node:test';
import assert from 'node:assert/strict';
import { pages, services, site, notFoundMeta, structuredData } from '../client/src/content/site';
import { renderHead, updateMetadata } from '../client/src/lib/seo';

test('service entities and breadcrumbs agree with their page and visible content', () => {
  for (const page of pages) {
    const data = structuredData(page);
    assert.ok(!Array.isArray(data));
    const graph = data['@graph'] as Array<Record<string, any>>;
    const ids = graph.map(item => item['@id']);
    assert.equal(new Set(ids).size, ids.length);
    // Every internal entity reference must resolve inside this page's graph.
    const visit = (value: any) => {
      if (!value || typeof value !== 'object') return;
      if (Object.keys(value).length === 1 && value['@id']) assert.ok(ids.includes(value['@id']), value['@id']);
      for (const child of Object.values(value)) visit(child);
    };
    visit(graph);
    const service = services.find(item => item.path === page.path);
    const entity = graph.find(item => item['@type'] === 'Service');
    if (!service) { assert.equal(entity, undefined); continue; }
    assert.equal(entity?.name, service.serviceName);
    assert.equal(entity?.description, service.intro);
    assert.equal(entity?.url, site.origin + page.path);
    assert.deepEqual(entity?.areaServed, { '@type': 'Country', name: 'Lebanon' });
    const crumbs = graph.find(item => item['@type'] === 'BreadcrumbList')?.itemListElement;
    assert.deepEqual(crumbs.map((item: any) => [item.position, item.name, item.item]), [
      [1, 'Home', site.origin + '/'], [2, service.label, site.origin + page.path],
    ]);
  }
});

test('head safely escapes content and excludes canonical/schema on 404s', () => {
  const page = { ...pages[0], title: 'DJ " & <party>', description: '</script><script>alert(1)</script>' };
  const html = renderHead(page);
  assert.ok(html.includes('<title>DJ &quot; &amp; &lt;party&gt;</title>'));
  assert.ok(!html.includes('<script>alert(1)</script>'));
  const json = html.match(/type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(json);
  assert.equal(JSON.parse(json)['@graph'].find((item: any) => item['@type'] === 'WebPage').description, page.description);
  const missing = renderHead(notFoundMeta);
  assert.ok(missing.includes('noindex, follow'));
  assert.ok(!missing.includes('rel="canonical"') && !missing.includes('application/ld+json'));
});

test('client navigation restores canonical and JSON-LD after a 404 without duplicates', () => {
  // Small document adapter: exercise navigation behavior without a browser dependency.
  const nodes: ElementStub[] = [];
  class ElementStub {
    id = ''; rel = ''; href = ''; type = ''; textContent = '';
    remove() { nodes.splice(nodes.indexOf(this), 1); }
  }
  const original = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const documentStub = {
    title: '',
    head: { appendChild(node: ElementStub) { nodes.push(node); } },
    createElement() { return new ElementStub(); },
    querySelector(selector: string) { return selector === 'link[rel="canonical"]' ? nodes.find(node => node.rel === 'canonical') ?? null : null; },
    getElementById(id: string) { return nodes.find(node => node.id === id) ?? null; },
  };
  Object.defineProperty(globalThis, 'document', { value: documentStub, configurable: true });
  try {
    for (const page of [notFoundMeta, pages[2], pages[2], notFoundMeta, pages[1], pages[0]]) {
      updateMetadata(page);
      assert.equal(documentStub.title, page.title);
      const canonicals = nodes.filter(node => node.rel === 'canonical');
      const scripts = nodes.filter(node => node.id === 'structured-data');
      assert.equal(canonicals.length, page.noindex ? 0 : 1);
      assert.equal(scripts.length, page.noindex ? 0 : 1);
      if (!page.noindex) {
        assert.equal(canonicals[0].href, site.origin + page.path);
        assert.equal(scripts[0].type, 'application/ld+json');
        assert.deepEqual(JSON.parse(scripts[0].textContent), structuredData(page));
      }
    }
  } finally {
    if (original) Object.defineProperty(globalThis, 'document', original);
    else Reflect.deleteProperty(globalThis, 'document');
  }
});
