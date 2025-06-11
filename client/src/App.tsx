import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";

// Lazy load pages
const Home = lazy(() => import("@/pages/home"));
const ExperiencePage = lazy(() =>
	import("@/pages/experience").then((module) => ({
		default: module.ExperiencePage,
	}))
);
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component
function LoadingFallback() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
		</div>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<div className="dark">
					<Toaster />
					<Router>
						<Layout>
							<Suspense fallback={<LoadingFallback />}>
								<Routes>
									<Route path="/" element={<Home />} />
									<Route
										path="/experience"
										element={<ExperiencePage />}
									/>
									{/* Catch all route for 404 */}
									<Route path="*" element={<NotFound />} />
								</Routes>
							</Suspense>
						</Layout>
					</Router>
				</div>
			</TooltipProvider>
		</QueryClientProvider>
	);
}
