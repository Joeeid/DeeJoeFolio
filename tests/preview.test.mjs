import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { request } from 'node:http';
import { gunzipSync } from 'node:zlib';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createPreviewServer } from '../scripts/preview.mjs';

test('preview negotiates compression without changing bodies, routes or HEAD semantics', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'deejoe-preview-'));
  t.after(async () => {
    assert.equal(dirname(directory), tmpdir());
    await rm(directory, { recursive: true, force: true });
  });
  await mkdir(join(directory, 'assets/optimized'), { recursive: true });
  await mkdir(join(directory, 'weddings'));
  for (const [path, body] of Object.entries({
    'index.html': '<!doctype html><link href="/assets/site.css" rel="stylesheet"><script src="/assets/site.js"></script><h1>DeeJoe</h1>',
    'assets/site.css': 'body { color: white; }',
    'assets/site.js': 'console.log("DeeJoe");',
    'assets/site.json': '{"name":"DeeJoe"}',
    'assets/optimized/deejoe-experience-1-800.webp': 'already-compressed-image-fixture',
    'sitemap.xml': '<urlset></urlset>',
    'robots.txt': 'User-agent: *',
    '404.html': '<h1>Not found</h1>',
    'weddings/index.html': '<h1>Weddings</h1>',
  })) await writeFile(join(directory, path), body);
  const server = createPreviewServer(directory);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const { port } = server.address();
  const get = (path, encoding, method = 'GET') => new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path, method,
      headers: encoding === undefined ? {} : { 'Accept-Encoding': encoding } }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    req.end();
  });
  const plain = await get('/');
  const html = plain.body.toString();
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map(match => match[1]);
  assert.ok(assets.some(path => path.endsWith('.js')) && assets.some(path => path.endsWith('.css')));
  for (const path of ['/', ...assets, '/assets/site.json', '/sitemap.xml', '/robots.txt', '/llms.txt', '/missing-page/', '/404.html']) {
    const identity = await get(path, 'identity');
    const compressed = await get(path, 'gzip');
    assert.equal(compressed.status, identity.status, path);
    assert.equal(compressed.headers['content-encoding'], 'gzip', path);
    assert.equal(compressed.headers.vary, 'Accept-Encoding');
    assert.equal(compressed.headers['cache-control'], 'no-cache');
    assert.deepEqual(gunzipSync(compressed.body), identity.body, path);
    assert.equal(Number(compressed.headers['content-length']), compressed.body.length);
    const head = await get(path, 'gzip', 'HEAD');
    assert.equal(head.status, compressed.status);
    assert.equal(head.headers['content-length'], compressed.headers['content-length']);
    assert.equal(head.headers['content-encoding'], 'gzip');
    assert.equal(head.body.length, 0);
  }
  for (const encoding of ['br', 'gzip;q=0', '*;q=0', '*;q=1, gzip;q=0', 'gzip;q=0.3, identity;q=0.9']) {
    const result = await get('/', encoding);
    assert.equal(result.headers['content-encoding'], undefined, encoding);
    assert.deepEqual(result.body, plain.body);
  }
  for (const encoding of ['br, gzip', 'GZip; q=0.5', '*;q=0.5', 'gzip;q=1, identity;q=0']) {
    assert.equal((await get('/', encoding)).headers['content-encoding'], 'gzip', encoding);
  }
  const image = await get('/assets/optimized/deejoe-experience-1-800.webp', 'gzip');
  assert.equal(image.status, 200);
  assert.equal(image.headers['content-encoding'], undefined);
  assert.equal(image.headers['content-type'], 'image/webp');
  assert.equal((await get('/llms.txt')).status, 404);
  const redirect = await get('/weddings?source=test', 'gzip');
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.location, '/weddings/?source=test');
  assert.equal((await get('/weddings/')).status, 200);
});
