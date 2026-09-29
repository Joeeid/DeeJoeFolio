import { uiText } from "@/content/ui-ar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { pageForPath, alternatesFor } from "@/content/site";
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
	{ href: "/experience/", label: "Experience" },
	{ href: "/#reviews", label: "Reviews" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const page = pageForPath(useLocation().pathname);
	const arabic = page.language === "ar-LB";
	const t = uiText(page.language);
	const links = arabic ? [
		{ href: "/ar/weddings/", label: "الأعراس" },
		{ href: "/ar/private-events/", label: "الحفلات الخاصة" },
		{ href: "/#music", label: "الموسيقى" },
		{ href: "/experience/", label: "الخبرة (EN)" },
	] : navigation;
	const alternate = alternatesFor(page).find(item => item.language === (arabic ? "en" : "ar-LB"))?.path;
	const bookingHref = page.noindex
		? "/#contact"
		: "#contact";
	return (
		<>
			<a href="#main" className="skip-link">
				{t("Skip to content")}
			</a>
			<header className="site-header">
				<div className="shell header-inner">
					<a dir="ltr" className="wordmark" href="/" aria-label={t("DeeJoe home")}>
						DEEJOE<span>.</span>
					</a>
					<nav aria-label={t("Main navigation")} className="desktop-nav">
						{links.map((item) => (
							<a key={item.href} href={item.href}>
								{item.label}
							</a>
						))}
					</nav>
					{alternate && <a className="language-switch" href={alternate} hrefLang={arabic ? "en" : "ar-LB"} lang={arabic ? "en" : "ar-LB"} dir={arabic ? "ltr" : "rtl"}>{arabic ? "English" : "العربية"}</a>}
					<Button asChild className="button-primary header-booking">
						<a href={bookingHref}>
							{t("Book Your Event")} <ArrowUpRight aria-hidden="true" />
						</a>
					</Button>
					<Dialog open={menuOpen} onOpenChange={setMenuOpen}>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="mobile-menu-trigger"
								aria-label={t("Open navigation")}
							>
								<Menu />
							</Button>
						</DialogTrigger>
						<DialogContent dir={arabic ? "rtl" : "ltr"} className="navigation-dialog">
							<DialogTitle dir="ltr" className="wordmark">
								DEEJOE<span>.</span>
							</DialogTitle>
							<DialogDescription>
								{t("Find your soundtrack.")}
							</DialogDescription>
							<nav aria-label={t("Mobile navigation")}>
								{links.map((item) => (
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
										{t("Book Your Event")}{" "}
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
					<a dir="ltr" className="wordmark" href="/">
						DEEJOE<span>.</span>
					</a>
					<p>{t("Bringing life to every beat.")}</p>
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
						{t("Get in touch")}{" "}
						<ArrowUpRight size={17} aria-hidden="true" />
					</a>
				</div>
				<nav className="footer-languages" aria-label={arabic ? "الخدمات بالعربية" : "Services in Arabic"} lang="ar-LB" dir="rtl"><a href="/ar/weddings/" hrefLang="ar-LB">الأعراس</a><a href="/ar/private-events/" hrefLang="ar-LB">الحفلات الخاصة</a></nav>
				<div className="footer-bottom">
					<span>© DeeJoe</span>
					<span>{t("BASED IN LEBANON. MUSIC WITHOUT BORDERS.")}</span>
				</div>
			</footer>
			<div className="mobile-booking-bar">
				<span>{t("Let's make it a night.")}</span>
				<a href={bookingHref}>
					{t("Book Your Event")}{" "}
					<ArrowUpRight size={17} aria-hidden="true" />
				</a>
			</div>
		</>
	);
}
