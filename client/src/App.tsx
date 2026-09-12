import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import { ExperiencePage } from "@/pages/experience";
import { ServicePage } from "@/pages/service";
import NotFound from "@/pages/not-found";
import { services, pageForPath } from "@/content/site";
import { updateMetadata } from "@/lib/seo";

export function AppContent() {
	const location = useLocation();
	useEffect(() => {
		updateMetadata(pageForPath(location.pathname));
		if (location.hash) {
			let id = location.hash.slice(1);
			try {
				id = decodeURIComponent(id);
			} catch {
				/* A malformed hash is harmless. */
			}
			requestAnimationFrame(() =>
				document.getElementById(id)?.scrollIntoView(),
			);
		}
	}, [location.pathname, location.hash]);
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				{services.map((service) => (
					<Route
						key={service.path}
						path={service.path}
						element={<ServicePage service={service} />}
					/>
				))}
				<Route path="/experience" element={<ExperiencePage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}
export default function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}
