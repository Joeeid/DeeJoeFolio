import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const sections = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
	{ id: "experience", label: "Experience" },
	// { id: "events", label: "Events" },
	{ id: "testimonials", label: "Testimonials" },
	{ id: "contact", label: "Contact" },
];

export function Layout({ children }: LayoutProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	// Scroll to top when pathname changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		if (isHomePage) {
			const handleScroll = () => {
				const scrollPosition = window.scrollY + 100;

				for (const section of sections) {
					const element = document.getElementById(section.id);
					if (element) {
						const { offsetTop, offsetHeight } = element;
						if (
							scrollPosition >= offsetTop &&
							scrollPosition < offsetTop + offsetHeight
						) {
							setActiveSection(section.id);
							break;
						}
					}
				}
			};

			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [isHomePage]);

	const scrollToSection = (sectionId: string) => {
		if (isHomePage) {
			const element = document.getElementById(sectionId);
			if (element) {
				setIsMobileMenuOpen(false);
				setTimeout(() => {
					element.scrollIntoView({ behavior: "smooth" });
					setActiveSection(sectionId);
				}, 100);
			}
		} else {
			window.location.href = `/#${sectionId}`;
		}
	};

	const scrollToContactForm = () => {
		if (isHomePage) {
			const contactForm = document.querySelector("#contact-form");
			if (contactForm) {
				setIsMobileMenuOpen(false);
				setTimeout(() => {
					const navHeight = 80;
					const elementPosition =
						contactForm.getBoundingClientRect().top;
					const offsetPosition =
						elementPosition + window.pageYOffset - navHeight;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth",
					});
					setActiveSection("contact");
				}, 100);
			}
		} else {
			window.location.href = "/#contact-form";
		}
	};

	const menuVariants = {
		closed: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.2,
				ease: "easeInOut",
			},
		},
		open: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.2,
				ease: "easeInOut",
			},
		},
	};

	const iconVariants = {
		closed: { rotate: 0 },
		open: { rotate: 180 },
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<Link
							to="/"
							className="text-2xl text-gradient font-salvar"
						>
							DEEJOE
						</Link>
						<div className="hidden md:flex items-center gap-8">
							{sections.map((section) => (
								<button
									key={section.id}
									onClick={() => scrollToSection(section.id)}
									className={`text-sm font-medium transition-colors ${
										(isHomePage &&
											activeSection === section.id) ||
										(!isHomePage &&
											location.pathname ===
												"/experience" &&
											section.id === "experience")
											? "text-primary"
											: "text-foreground/60 hover:text-foreground"
									}`}
								>
									{section.label}
								</button>
							))}
							<Button
								onClick={scrollToContactForm}
								className="bg-[#ff3b3b] hover:bg-[#e62e2e] text-white"
							>
								Book Now
							</Button>
						</div>
						<motion.button
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className="md:hidden p-2 relative w-10 h-10"
							animate={isMobileMenuOpen ? "open" : "closed"}
							variants={iconVariants}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							<AnimatePresence mode="wait">
								{isMobileMenuOpen ? (
									<motion.div
										key="close"
										initial={{ opacity: 0, rotate: -90 }}
										animate={{ opacity: 1, rotate: 0 }}
										exit={{ opacity: 0, rotate: 90 }}
										transition={{ duration: 0.2 }}
										className="absolute inset-0 flex items-center justify-center"
									>
										<X className="h-6 w-6" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ opacity: 0, rotate: 90 }}
										animate={{ opacity: 1, rotate: 0 }}
										exit={{ opacity: 0, rotate: -90 }}
										transition={{ duration: 0.2 }}
										className="absolute inset-0 flex items-center justify-center"
									>
										<Menu className="h-6 w-6" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial="closed"
							animate="open"
							exit="closed"
							variants={menuVariants}
							className="md:hidden border-b border-border overflow-hidden"
						>
							<div className="container mx-auto px-4 py-4 space-y-4">
								{sections.map((section) => (
									<motion.button
										key={section.id}
										onClick={() => {
											scrollToSection(section.id);
											setIsMobileMenuOpen(false);
										}}
										className={`block w-full text-left text-sm font-medium transition-colors ${
											(isHomePage &&
												activeSection === section.id) ||
											(!isHomePage &&
												location.pathname ===
													"/experience" &&
												section.id === "experience")
												? "text-primary"
												: "text-foreground/60 hover:text-foreground"
										}`}
										whileHover={{ x: 4 }}
										transition={{ duration: 0.2 }}
									>
										{section.label}
									</motion.button>
								))}
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										onClick={() => {
											scrollToContactForm();
											setIsMobileMenuOpen(false);
										}}
										className="w-full bg-[#ff3b3b] hover:bg-[#e62e2e] text-white"
									>
										Book Now
									</Button>
								</motion.div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>

			{/* Main Content */}
			<main className="flex-grow pt-16">{children}</main>

			{/* Footer */}
			<footer className="py-8 bg-background border-t border-border">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<h2 className="text-2xl text-primary font-salvar">
								DEEJOE
							</h2>
							<p className="text-foreground/60">
								Professional DJ & Music Producer
							</p>
						</div>
						<div className="text-foreground/60">
							© {new Date().getFullYear()} DeeJoe. All rights
							reserved.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
