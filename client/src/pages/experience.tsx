import { uiText } from "@/content/ui-ar";
import { ArrowUpRight } from "lucide-react";
import { venueHistory, localizedPath, type Language } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { ContactForm } from "@/components/contact-form";

export function ExperiencePage({ language = "en" }: { language?: Language }) {
	const t = uiText(language);
	return (
		<>
			<section className="shell service-hero experience-hero">
				<div>
					<p className="eyebrow">
						{t("THE PLACES. THE PEOPLE. THE MUSIC.")}
					</p>
					<h1>
						{t("A decade of")}
						<br />
						{t("bringing nights")}
						<br />
						<span>{t("to life.")}</span>
					</h1>
					<p className="section-intro">
						{t("From Lebanon's lounges and sunset sessions to wedding celebrations. Every room brings a different energy. Every set tells a different story.")}
					</p>
					<Button asChild className="button-primary">
						<a href="#contact">
							{t("Book Your Event")} <ArrowUpRight aria-hidden="true" />
						</a>
					</Button>
				</div>
				<div className="service-hero-photo">
					<ResponsiveImage
						name="deejoe-experience-1"
						sizes={imageSizes.service}
						alt={t("DeeJoe mixing music at his DJ controller")}
						priority
					/>
				</div>
			</section>
			<section className="shell section venue-history">
				{["Residency", "Weddings"].map((category) => (
					<div className="venue-group" key={category}>
						<div className="venue-group-heading">
							<p className="eyebrow">
								{category === "Residency"
									? t("01 / RESIDENCIES & NIGHTLIFE")
									: t("02 / THE CELEBRATIONS")}
							</p>
							<h2>
								{category === "Residency"
									? t("Behind the decks.")
									: t("Part of their big day.")}
							</h2>
						</div>
						<div>
							{venueHistory
								.filter((venue) => venue.category === category)
								.map((venue) => (
									<article
										className="venue-row"
										key={venue.name}
									>
										<div>
											<h3>{venue.name}</h3>
											<p>
												{t(venue.location)} ·{" "}
												{t(venue.description)}
											</p>
										</div>
										<span><bdi>{language === "ar" ? venue.period.replace("Present", "حتى اليوم") : venue.period}</bdi></span>
									</article>
								))}
						</div>
					</div>
				))}
				<div className="experience-note">
					<h3>{t("And the nights in between.")}</h3>
					<p>
						{t("Private engagements, bachelor parties, and birthdays, plus appearances at many lounges including Gradient, Monte Carlo, and Fuego. Wedding collaborations with event planners include Events And More, It Takes Two Events and Pro Event.")}
					</p>
					<a className="text-link" href={localizedPath("/private-events/", language)}>
						{t("Explore private celebrations")}{" "}
						<ArrowUpRight aria-hidden="true" />
					</a>
				</div>
			</section>
			<ContactForm language={language} />
		</>
	);
}
