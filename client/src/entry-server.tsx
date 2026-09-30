import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { pages, notFoundMeta, arabicNotFoundMeta } from "./content/site";
import { renderHead } from "./lib/seo";
export { pages, notFoundMeta, arabicNotFoundMeta, renderHead };
export { site, alternatesFor } from "./content/site";
export function render(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><AppContent /></StaticRouter>);
}
