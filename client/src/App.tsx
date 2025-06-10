import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import { ExperiencePage } from "@/pages/experience";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<div className="dark">
					<Toaster />
					<Router>
						<Layout>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route
									path="/experience"
									element={<ExperiencePage />}
								/>
							</Routes>
						</Layout>
					</Router>
				</div>
			</TooltipProvider>
		</QueryClientProvider>
	);
}
