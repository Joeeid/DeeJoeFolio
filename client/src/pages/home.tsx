import { uiText } from "@/content/ui-ar";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Music } from "@/components/music";
import { About } from "@/components/about";
import { Reviews } from "@/components/reviews";
import { FAQSection } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { faqs, localizedPath, type Language } from "@/content/site";

export function Services({ language = "en" }: { language?: Language }) {
	const t = uiText(language);
	return (
		<section id="services" className="section shell">
			<div className="section-heading">
				<div>
					<p className="eyebrow">{t("01 / THE OCCASION")}</p>
					<h2>
						{t("Your people.")}
						<br />
						{t("Your kind of party.")}
					</h2>
				</div>
				<p>
					{t("From the first dance to the last track.")}
					<br />{t("A soundtrack that feels like you.")}
				</p>
			</div>
			<div className="service-grid">
				<a className="service-card" href={localizedPath("/weddings/", language)}>
					<span className="service-number">01</span>
					<div>
						<h3>{t("Weddings")}</h3>
						<p>
							{t("For the moments you'll remember.")}
							<br />
							{t("And the dance floor you won't want to leave.")}
						</p>
						<span className="text-link">
							{t("Wedding DJ services")} <ArrowUpRight aria-hidden="true" />
						</span>
					</div>
				</a>
				<a className="service-card" href={localizedPath("/private-events/", language)}>
					<span className="service-number">02</span>
					<div>
						<h3>{t("Private celebrations")}</h3>
						<p>
							{t("Engagements, birthdays, and just-because nights.")}
							<br />
							{t("Good company deserves good music.")}
						</p>
						<span className="text-link">
							{t("Private party DJ services")}{" "}
							<ArrowUpRight aria-hidden="true" />
						</span>
					</div>
				</a>
			</div>
			<p className="destination-note">
				{t("Made in Lebanon. Ready to travel.")}{" "}
				<a href="#contact">
					{t("Destination events on request")}{" "}
					<ArrowUpRight size={15} aria-hidden="true" />
				</a>
			</p>
		</section>
	);
}

export default function Home({ language = "en" }: { language?: Language }) {
	const t = uiText(language);
	return (
		<>
			<section
				id="home"
				className="hero shell"
				aria-labelledby="hero-title"
			>
				<div className="hero-copy">
					<p className="eyebrow">
						<span className="small-rule" /> {t("OPEN FORMAT DJ · LEBANON")}
					</p>
					<h1 id="hero-title">
						{t("Your night.")}
						<br />
						{language === "ar" ? <>والموسيقى <span>عليّي.</span></> : <>My <span>playlist.</span></>}
					</h1>
					<p className="hero-intro">
						{t("I'm DeeJoe, an open-format DJ in Lebanon. Bringing people together for weddings, private parties, and nights that turn into mornings.")}
					</p>
					<div className="hero-actions">
						<Button asChild className="button-primary">
							<a href="#contact">
								{t("Book Your Event")}{" "}
								<ArrowUpRight aria-hidden="true" />
							</a>
						</Button>
						<a className="listen-link" href="#music">
							<span className="play-circle">
								<Play
									size={15}
									fill="currentColor"
									aria-hidden="true"
								/>
							</span>{" "}
							{t("Listen")}
						</a>
					</div>
					<div className="hero-footnote">
						<span>{t("WEDDINGS & PRIVATE EVENTS")}</span>
						<a href="#services" aria-label={t("Explore DJ services")}>
							<ArrowDown size={18} aria-hidden="true" />
						</a>
					</div>
				</div>
				<div className="hero-visual">
					<ResponsiveImage
						name="deejoe-experience-1"
						sizes={imageSizes.hero}
						alt={t("DeeJoe at the decks, wearing red sunglasses and headphones")}
						priority
					/>
					<div className="portrait-label">
						<span>DEEJOE</span>
						<span>{t("FEEL THE CONNECTION.")}</span>
					</div>
					<span className="image-index">{t("BEHIND THE DECKS / 01")}</span>
				</div>
			</section>
			<div className="genre-strip" aria-label={t("Music styles")}>
				<span>OPEN FORMAT</span>
				<i />
				<span>{t("ARABIC HITS")}</span>
				<i />
				<span>AFRO HOUSE</span>
				<i />
				<span>TECHNO</span>
				<i />
				<span>R&B</span>
			</div>
			<Services language={language} />
			<Music language={language} />
			<About language={language} />
			<Reviews language={language} />
			<FAQSection items={faqs.map(item => ({ question: t(item.question), answer: t(item.answer) }))} language={language} />
			<ContactForm language={language} />
		</>
	);
}
