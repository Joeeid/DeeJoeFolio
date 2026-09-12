import { useState } from "react";
import { useLocation } from "react-router-dom";
import { pageForPath } from "@/content/site";
import { Menu, ArrowUpRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";

const navigation = [
	{ href: "/#services", label: "Services" },
	{ href: "/#music", label: "Music" },
	{ href: "/experience", label: "Experience" },
	{ href: "/#reviews", label: "Reviews" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const bookingHref = pageForPath(useLocation().pathname).noindex
		? "/#contact"
		: "#contact";
	return (
		<>
			<a href="#main" className="skip-link">
				Skip to content
			</a>
			<header className="site-header">
				<div className="shell header-inner">
					<a className="wordmark" href="/" aria-label="DeeJoe home">
						DEEJOE<span>.</span>
					</a>
					<nav aria-label="Main navigation" className="desktop-nav">
						{navigation.map((item) => (
							<a key={item.href} href={item.href}>
								{item.label}
							</a>
						))}
					</nav>
					<Button asChild className="button-primary header-booking">
						<a href={bookingHref}>
							Book Your Event <ArrowUpRight aria-hidden="true" />
						</a>
					</Button>
					<Dialog open={menuOpen} onOpenChange={setMenuOpen}>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="mobile-menu-trigger"
								aria-label="Open navigation"
							>
								<Menu />
							</Button>
						</DialogTrigger>
						<DialogContent className="navigation-dialog">
							<DialogTitle className="wordmark">
								DEEJOE<span>.</span>
							</DialogTitle>
							<DialogDescription>
								Find your soundtrack.
							</DialogDescription>
							<nav aria-label="Mobile navigation">
								{navigation.map((item) => (
									<DialogClose asChild key={item.href}>
										<a href={item.href}>
											{item.label}
											<ArrowUpRight aria-hidden="true" />
										</a>
									</DialogClose>
								))}
								<DialogClose asChild>
									<a
										href={bookingHref}
										className="mobile-book-link"
									>
										Book Your Event{" "}
										<ArrowUpRight aria-hidden="true" />
									</a>
								</DialogClose>
							</nav>
						</DialogContent>
					</Dialog>
				</div>
			</header>
			<main id="main" tabIndex={-1}>
				{children}
			</main>
			<footer className="site-footer shell">
				<div>
					<a className="wordmark" href="/">
						DEEJOE<span>.</span>
					</a>
					<p>Bringing life to every beat.</p>
				</div>
				<div className="footer-links">
					<a
						href="https://www.instagram.com/deejoe._/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<rect x="2" y="2" width="20" height="20" rx="5" />
							<circle cx="12" cy="12" r="4" />
							<circle cx="18" cy="6" r="0.5" fill="currentColor" />
						</svg> Instagram
					</a>
					<a
						href="https://play.anghami.com/artist/20108346"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Headphones size={17} aria-hidden="true" /> Anghami
					</a>
					<a href="mailto:bookings@deejoelb.com">
						Get in touch{" "}
						<ArrowUpRight size={17} aria-hidden="true" />
					</a>
				</div>
				<div className="footer-bottom">
					<span>© DeeJoe</span>
					<span>BASED IN LEBANON. MUSIC WITHOUT BORDERS.</span>
				</div>
			</footer>
			<div className="mobile-booking-bar">
				<span>Let's make it a night.</span>
				<a href={bookingHref}>
					Book Your Event{" "}
					<ArrowUpRight size={17} aria-hidden="true" />
				</a>
			</div>
		</>
	);
}
