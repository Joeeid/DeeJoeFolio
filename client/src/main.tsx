import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);

// One Google loader; no production tracking from the local preview.
if (window.location.hostname === "www.deejoelb.com" || window.location.hostname === "deejoelb.com") {
  import("./lib/load-analytics").then(({ loadAnalytics }) => loadAnalytics());
}
