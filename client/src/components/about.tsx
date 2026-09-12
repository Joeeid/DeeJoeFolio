import { ArrowUpRight } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { venueHistory } from "@/content/site";

export function About() {
	return (
		<section id="experience" className="section shell about-section">
			<span id="events" className="anchor-alias" />
			<div className="section-heading">
				<div>
					<p className="eyebrow">03 / BEHIND THE DECKS</p>
					<h2>
						Read the room.
						<br />
						Bring it together.
					</h2>
				</div>
				<a href="/experience" className="text-link">
					Explore my experience <ArrowUpRight aria-hidden="true" />
				</a>
			</div>
			<div className="about-grid">
				<div className="about-photo">
					<ResponsiveImage
						name="hero-bg"
						sizes={imageSizes.about}
						alt="DeeJoe in a black T-shirt, photographed in profile"
					/>
					<span className="photo-caption">
						DEEJOE / OPEN FORMAT DJ
					</span>
				</div>
				<div id="about" className="about-copy">
					<p className="about-lead">
						Different people.
						<br />
						One dance floor.
					</p>
					<p>
						With over a decade in music, I've found that the best
						sets start with the people in front of you. It's about
						knowing the room, connecting different tastes, and
						finding the track that brings everyone together.
					</p>
					<p>
						From house and techno to Arabic commercial hits, my
						style crosses genres. I bring that same energy to
						weddings, intimate celebrations, and nights at venues
						across Lebanon.
					</p>
					<div className="about-facts">
						<div>
							<strong>10+</strong>
							<span>years in music</span>
						</div>
						<div>
							<strong>Open format</strong>
							<span>no boundaries, just good music</span>
						</div>
					</div>
				</div>
			</div>
			<div className="selected-venues">
				<p className="eyebrow">A FEW PLACES WE'VE MADE MEMORIES</p>
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
							<small>{venue.location}</small>
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
