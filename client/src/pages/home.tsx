import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Music } from "@/components/music";
import { About } from "@/components/about";
import { Reviews } from "@/components/reviews";
import { FAQSection } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { faqs } from "@/content/site";

export function Services() {
	return (
		<section id="services" className="section shell">
			<div className="section-heading">
				<div>
					<p className="eyebrow">01 / THE OCCASION</p>
					<h2>
						Your people.
						<br />
						Your kind of party.
					</h2>
				</div>
				<p>
					From the first dance to the last track.
					<br />A soundtrack that feels like you.
				</p>
			</div>
			<div className="service-grid">
				<a className="service-card" href="/weddings/">
					<span className="service-number">01</span>
					<div>
						<h3>Weddings</h3>
						<p>
							For the moments you'll remember.
							<br />
							And the dance floor you won't want to leave.
						</p>
						<span className="text-link">
							Wedding DJ services <ArrowUpRight aria-hidden="true" />
						</span>
					</div>
				</a>
				<a className="service-card" href="/private-events/">
					<span className="service-number">02</span>
					<div>
						<h3>Private celebrations</h3>
						<p>
							Engagements, birthdays, and just-because nights.
							<br />
							Good company deserves good music.
						</p>
						<span className="text-link">
							Private party DJ services{" "}
							<ArrowUpRight aria-hidden="true" />
						</span>
					</div>
				</a>
			</div>
			<p className="destination-note">
				Made in Lebanon. Ready to travel.{" "}
				<a href="#contact">
					Destination events on request{" "}
					<ArrowUpRight size={15} aria-hidden="true" />
				</a>
			</p>
		</section>
	);
}

export default function Home() {
	return (
		<>
			<section
				id="home"
				className="hero shell"
				aria-labelledby="hero-title"
			>
				<div className="hero-copy">
					<p className="eyebrow">
						<span className="small-rule" /> OPEN FORMAT DJ · LEBANON
					</p>
					<h1 id="hero-title">
						Your night.
						<br />
						My <span>playlist.</span>
					</h1>
					<p className="hero-intro">
						I'm DeeJoe, an open-format DJ in Lebanon. Bringing people
						together for weddings, private parties, and nights that turn into mornings.
					</p>
					<div className="hero-actions">
						<Button asChild className="button-primary">
							<a href="#contact">
								Book Your Event{" "}
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
							Listen
						</a>
					</div>
					<div className="hero-footnote">
						<span>WEDDINGS & PRIVATE EVENTS</span>
						<a href="#services" aria-label="Explore DJ services">
							<ArrowDown size={18} aria-hidden="true" />
						</a>
					</div>
				</div>
				<div className="hero-visual">
					<ResponsiveImage
						name="deejoe-experience-1"
						sizes={imageSizes.hero}
						alt="DeeJoe at the decks, wearing red sunglasses and headphones"
						priority
					/>
					<div className="portrait-label">
						<span>DEEJOE</span>
						<span>FEEL THE CONNECTION.</span>
					</div>
					<span className="image-index">BEHIND THE DECKS / 01</span>
				</div>
			</section>
			<div className="genre-strip" aria-label="Music styles">
				<span>OPEN FORMAT</span>
				<i />
				<span>ARABIC HITS</span>
				<i />
				<span>AFRO HOUSE</span>
				<i />
				<span>TECHNO</span>
				<i />
				<span>R&B</span>
			</div>
			<Services />
			<Music />
			<About />
			<Reviews />
			<FAQSection items={faqs} />
			<ContactForm />
		</>
	);
}
