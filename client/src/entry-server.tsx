import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { pages, notFoundMeta } from "./content/site";
import { renderHead } from "./lib/seo";
export { pages, notFoundMeta, renderHead };
export { site } from "./content/site";
export function render(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><AppContent /></StaticRouter>);
}
