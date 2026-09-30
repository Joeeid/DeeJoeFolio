import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { pageForPath } from "./content/site";
import "./index.css";

const root = document.getElementById("root")!;
// GitHub Pages serves the shared English 404 document for unknown Arabic URLs.
// Render that error in Arabic without attempting to hydrate a different language.
const page = pageForPath(window.location.pathname);
const localeMismatch = document.documentElement.lang !== (page.language ?? "en");
if (root.hasChildNodes() && !localeMismatch) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);

// One Google loader; no production tracking from the local preview.
if (window.location.hostname === "www.deejoelb.com" || window.location.hostname === "deejoelb.com") {
  import("./lib/load-analytics").then(({ loadAnalytics }) => loadAnalytics());
}
