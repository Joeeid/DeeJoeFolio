import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-background">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="w-full max-w-md mx-4 border-primary/20">
					<CardContent className="pt-6">
						<div className="flex mb-4 gap-2 items-center">
							<AlertCircle className="h-8 w-8 text-[#ff3b3b]" />
							<h1 className="text-2xl font-bold text-gradient">
								Page Not Found
							</h1>
						</div>

						<p className="mt-4 text-foreground/80">
							The page you're looking for doesn't exist or has
							been moved.
						</p>

						<div className="mt-6 flex justify-center">
							<Link to="/">
								<Button className="bg-[#ff3b3b] hover:bg-[#e62e2e] text-white">
									Return Home
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
