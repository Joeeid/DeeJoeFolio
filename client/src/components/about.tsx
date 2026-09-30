import { uiText } from "@/content/ui-ar";
import { ArrowUpRight } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { venueHistory, localizedPath, type Language } from "@/content/site";

export function About({ language = "en" }: { language?: Language }) {
	const t = uiText(language);
	return (
		<section id="experience" className="section shell about-section">
			<span id="events" className="anchor-alias" />
			<div className="section-heading">
				<div>
					<p className="eyebrow">{t("03 / BEHIND THE DECKS")}</p>
					<h2>
						{t("Read the room.")}
						<br />
						{t("Bring it together.")}
					</h2>
				</div>
				<a href={localizedPath("/experience/", language)} className="text-link">
					{t("Explore my experience")} <ArrowUpRight aria-hidden="true" />
				</a>
			</div>
			<div className="about-grid">
				<div className="about-photo">
					<ResponsiveImage
						name="hero-bg"
						sizes={imageSizes.about}
						alt={t("DeeJoe in a black T-shirt, photographed in profile")}
					/>
					<span className="photo-caption">
						{t("DEEJOE / OPEN FORMAT DJ")}
					</span>
				</div>
				<div id="about" className="about-copy">
					<p className="about-lead">
						{t("Different people.")}
						<br />
						{t("One dance floor.")}
					</p>
					<p>
						{t("With over a decade in music, I've found that the best sets start with the people in front of you. It's about knowing the room, connecting different tastes, and finding the track that brings everyone together.")}
					</p>
					<p>
						{t("From house and techno to Arabic commercial hits, my style crosses genres. I bring that same energy to weddings, intimate celebrations, and nights at venues across Lebanon.")}
					</p>
					<div className="about-facts">
						<div>
							<strong>10+</strong>
							<span>{t("years in music")}</span>
						</div>
						<div>
							<strong>Open format</strong>
							<span>{t("no boundaries, just good music")}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="selected-venues">
				<p className="eyebrow">{t("A FEW PLACES WE'VE MADE MEMORIES")}</p>
				<div>
					{[
						...venueHistory
							.filter((venue) => venue.category === "Residency")
							.slice(0, 2),
						...venueHistory
							.filter((venue) => venue.category === "Weddings")
							.slice(0, 2),
					].map((venue) => (
						<span key={venue.name}>
							{venue.name}
							<small>{t(venue.location)}</small>
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
