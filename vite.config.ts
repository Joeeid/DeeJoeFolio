import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
	plugins: [
		react(),
		runtimeErrorOverlay(),
		...(process.env.NODE_ENV !== "production" &&
		process.env.REPL_ID !== undefined
			? [
					await import("@replit/vite-plugin-cartographer").then((m) =>
						m.cartographer()
					),
			  ]
			: []),
	],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "client", "src"),
			"@shared": path.resolve(import.meta.dirname, "shared"),
			"@assets": path.resolve(import.meta.dirname, "attached_assets"),
		},
	},
	root: path.resolve(import.meta.dirname, "client"),
	build: {
		outDir: path.resolve(import.meta.dirname, "dist/public"),
		emptyOutDir: true,
		cssCodeSplit: true,
		cssMinify: true,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						if (id.includes("react") || id.includes("react-dom")) {
							return "vendor";
						}
					}
					if (id.endsWith(".css")) {
						return "styles";
					}
				},
				// Enable content hashing for better cache busting
				entryFileNames: "assets/[name].[hash].js",
				chunkFileNames: "assets/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
		},
		// Enable source maps in production for better debugging
		sourcemap: true,
		// Optimize chunk size
		chunkSizeWarningLimit: 1000,
		// Enable minification
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	server: {
		fs: {
			strict: true,
			deny: ["**/.*"],
		},
	},
});
