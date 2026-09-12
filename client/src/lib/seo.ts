import { site, structuredData, type PageMeta } from "../content/site.ts";
export function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
export function renderHead(page: PageMeta) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = site.origin + page.path;
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow"}">`,
    ...(page.noindex ? [] : [`<link rel="canonical" href="${url}">`]),
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:url" content="${url}">`,
    '<meta property="og:site_name" content="DeeJoe">',
    '<meta property="og:image" content="https://deejoelb.com/assets/og-image.jpg">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    '<meta name="twitter:image" content="https://deejoelb.com/assets/twitter-image.jpg">',
    ...(!page.noindex ? [`<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData(page)).replace(/</g, "\\u003c")}</script>`] : []),
  ].join("\n");
}
export function updateMetadata(page: PageMeta) {
  document.title = page.title;
  const values = {
    'meta[name="description"]': page.description,
    'meta[name="robots"]': page.noindex ? "noindex, follow" : "index, follow",
    'meta[property="og:title"]': page.title,
    'meta[property="og:description"]': page.description,
    'meta[property="og:url"]': site.origin + page.path,
    'meta[name="twitter:title"]': page.title,
    'meta[name="twitter:description"]': page.description,
  };
  for (const [selector, content] of Object.entries(values)) document.querySelector(selector)?.setAttribute("content", content);
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (page.noindex) canonical?.remove();
  else if (canonical) canonical.href = site.origin + page.path;
  const data = document.getElementById("structured-data");
  if (page.noindex) data?.remove();
  else if (data) data.textContent = JSON.stringify(structuredData(page));
}
