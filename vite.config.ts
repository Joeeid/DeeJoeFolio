import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { pageForPath } from "./client/src/content/site.ts";
import { renderHead } from "./client/src/lib/seo.ts";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "deejoe-page-head",
      apply: "serve",
      transformIndexHtml: {
        order: "pre",
        handler(html, context) {
          return html.replace("<!--page-head-->", renderHead(pageForPath(new URL(context.originalUrl ?? context.path, "http://localhost").pathname))).replace("<!--app-html-->", "");
        },
      },
    },
  ],
  root: path.resolve(import.meta.dirname, "client"),
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "client/src") } },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
  },
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
});
