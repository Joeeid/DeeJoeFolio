// Static hosting preview: deliberately returns 404 for unknown paths, like GitHub Pages.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
const compress = promisify(gzip);
const root = fileURLToPath(new URL('../dist/public/', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.ttf': 'font/ttf' };
const compressible = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg']);

function acceptsGzip(header = '') {
  const encodings = new Map(header.toLowerCase().split(',').map(entry => {
    const [name, ...parameters] = entry.trim().split(';');
    const parameter = parameters.map(value => value.trim()).find(value => value.startsWith('q='));
    const quality = parameter ? Number(parameter.slice(2)) : 1;
    return [name, Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0];
  }));
  const gzipQuality = encodings.get('gzip') ?? encodings.get('*') ?? 0;
  // Prefer compression unless the client explicitly prefers identity.
  return gzipQuality > 0 && gzipQuality >= (encodings.get('identity') ?? 0);
}

export function createPreviewServer(directory = root) {
return createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let target = resolve(directory, '.' + pathname);
    if (target !== resolve(directory) && !target.startsWith(resolve(directory) + sep)) { response.writeHead(403); response.end(); return; }
    let status;
    try { status = await stat(target); } catch { /* Serve real 404 below. */ }
    if (status?.isDirectory()) {
      if (!pathname.endsWith('/')) { response.writeHead(301, { Location: pathname + '/' + new URL(request.url, 'http://localhost').search }); response.end(); return; }
      target = resolve(target, 'index.html');
    }
    let content;
    try { content = await readFile(target); response.statusCode = pathname === '/404.html' ? 404 : 200; }
    catch { content = await readFile(resolve(directory, '404.html')); target = '404.html'; response.statusCode = 404; }
    response.setHeader('Content-Type', mime[extname(target)] || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    if (compressible.has(extname(target))) {
      response.setHeader('Vary', 'Accept-Encoding');
      if (acceptsGzip(request.headers['accept-encoding'])) {
        content = await compress(content);
        response.setHeader('Content-Encoding', 'gzip');
      }
    }
    response.setHeader('Content-Length', content.length);
    if (request.method === 'HEAD') response.end(); else response.end(content);
  } catch { response.writeHead(400); response.end('Bad request'); }
});
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
const port = Number(process.env.PORT || 4173);
createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Production preview: http://127.0.0.1:${port}/`));
}
