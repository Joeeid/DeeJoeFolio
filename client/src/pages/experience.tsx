import { ArrowUpRight } from "lucide-react";
import { venueHistory } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { ContactForm } from "@/components/contact-form";

export function ExperiencePage() {
	return (
		<>
			<section className="shell service-hero experience-hero">
				<div>
					<p className="eyebrow">
						THE PLACES. THE PEOPLE. THE MUSIC.
					</p>
					<h1>
						A decade of
						<br />
						bringing nights
						<br />
						<span>to life.</span>
					</h1>
					<p className="section-intro">
						From Lebanon's lounges and sunset sessions to wedding
						celebrations. Every room brings a different energy.
						Every set tells a different story.
					</p>
					<Button asChild className="button-primary">
						<a href="#contact">
							Book Your Event <ArrowUpRight aria-hidden="true" />
						</a>
					</Button>
				</div>
				<div className="service-hero-photo">
					<ResponsiveImage
						name="deejoe-experience-1"
						sizes={imageSizes.service}
						alt="DeeJoe mixing music at his DJ controller"
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
									? "01 / RESIDENCIES & NIGHTLIFE"
									: "02 / THE CELEBRATIONS"}
							</p>
							<h2>
								{category === "Residency"
									? "Behind the decks."
									: "Part of their big day."}
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
												{venue.location} ·{" "}
												{venue.description}
											</p>
										</div>
										<span>{venue.period}</span>
									</article>
								))}
						</div>
					</div>
				))}
				<div className="experience-note">
					<h3>And the nights in between.</h3>
					<p>
						Private engagements, bachelor parties, and birthdays,
						plus appearances at many lounges including Gradient,
						Monte Carlo, and Fuego. Wedding collaborations with
						event planners include Events And More, It Takes Two
						Events and Pro Event.
					</p>
					<a className="text-link" href="/private-events/">
						Explore private celebrations{" "}
						<ArrowUpRight aria-hidden="true" />
					</a>
				</div>
			</section>
			<ContactForm />
		</>
	);
}
