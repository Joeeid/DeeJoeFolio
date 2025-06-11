import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
	const formattedTime = new Date().toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	});

	console.log(`${formattedTime} [${source}] ${message}`);
}

// Cache control middleware for static assets
function cacheControl(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	const ext = path.extname(req.path).toLowerCase();

	// Cache static assets for 1 year in production
	if (process.env.NODE_ENV === "production") {
		if (
			ext.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
		) {
			res.setHeader(
				"Cache-Control",
				"public, max-age=31536000, immutable"
			);
			res.setHeader(
				"Expires",
				new Date(Date.now() + 31536000000).toUTCString()
			);
		}
	} else {
		// In development, disable caching for all assets
		res.setHeader(
			"Cache-Control",
			"no-store, no-cache, must-revalidate, proxy-revalidate"
		);
		res.setHeader("Pragma", "no-cache");
		res.setHeader("Expires", "0");
	}

	next();
}

export async function setupVite(app: Express, server: Server) {
	const serverOptions = {
		middlewareMode: true,
		hmr: { server },
		allowedHosts: true as true,
	};

	const vite = await createViteServer({
		...viteConfig,
		configFile: false,
		customLogger: {
			...viteLogger,
			error: (msg, options) => {
				viteLogger.error(msg, options);
				process.exit(1);
			},
		},
		server: serverOptions,
		appType: "custom",
	});

	app.use(cacheControl);
	app.use(vite.middlewares);
	app.use("*", async (req, res, next) => {
		const url = req.originalUrl;

		try {
			const clientTemplate = path.resolve(
				import.meta.dirname,
				"..",
				"client",
				"index.html"
			);

			// always reload the index.html file from disk incase it changes
			let template = await fs.promises.readFile(clientTemplate, "utf-8");
			template = template.replace(
				`src="/src/main.tsx"`,
				`src="/src/main.tsx?v=${nanoid()}"`
			);
			const page = await vite.transformIndexHtml(url, template);
			res.status(200).set({ "Content-Type": "text/html" }).end(page);
		} catch (e) {
			vite.ssrFixStacktrace(e as Error);
			next(e);
		}
	});
}

export function serveStatic(app: Express) {
	const distPath = path.resolve(import.meta.dirname, "public");

	if (!fs.existsSync(distPath)) {
		throw new Error(
			`Could not find the build directory: ${distPath}, make sure to build the client first`
		);
	}

	// Apply cache control middleware before serving static files
	app.use(cacheControl);
	app.use(
		express.static(distPath, {
			etag: true,
			lastModified: true,
			maxAge: "1y",
			immutable: true,
		})
	);

	// fall through to index.html if the file doesn't exist
	app.use("*", (_req, res) => {
		res.sendFile(path.resolve(distPath, "index.html"));
	});
}
