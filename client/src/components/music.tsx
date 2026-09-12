import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { site } from "@/content/site";
import { trackIntent } from "@/lib/analytics";

function MusicSkeleton() {
	return (
		<div className="music-loading" role="status">
			<span className="sr-only">Loading Anghami player...</span>
			<div className="music-placeholder-content" aria-hidden="true">
				<Skeleton className="music-placeholder music-placeholder-cover" />
				<Skeleton className="music-placeholder music-placeholder-title" />
				<Skeleton className="music-placeholder music-placeholder-artist" />
				<Skeleton className="music-placeholder music-placeholder-timeline" />
				<div className="music-placeholder-controls">
					<Skeleton className="music-placeholder music-placeholder-control" />
					<Skeleton className="music-placeholder music-placeholder-play" />
					<Skeleton className="music-placeholder music-placeholder-control" />
				</div>
			</div>
		</div>
	);
}

export function Music() {
	const section = useRef<HTMLElement>(null);
	const [attempt, setAttempt] = useState(0);
	const [status, setStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");

	useEffect(() => {
		// Match the reviews section: start loading 400px before it enters view.
		const observer = "IntersectionObserver" in window
			? new IntersectionObserver((entries) => {
				if (entries.some(entry => entry.isIntersecting)) {
					setStatus("loading");
					observer?.disconnect();
				}
			}, { rootMargin: "400px" })
			: null;
		if (observer && section.current) observer.observe(section.current);
		else setStatus("loading");
		return () => observer?.disconnect();
	}, []);

	useEffect(() => {
		if (status !== "loading") return;
		const timeout = setTimeout(() => setStatus("failed"), 30000);
		return () => clearTimeout(timeout);
	}, [status, attempt]);

	function retryPlayer() {
		setAttempt((current) => current + 1);
		setStatus("loading");
	}
	return (
		<section ref={section} id="music" className="music-section">
			<div className="shell section music-grid">
				<div>
					<p className="eyebrow">02 / PRESS PLAY</p>
					<h2>
						A little taste
						<br />
						of <span>my sound.</span>
					</h2>
					<p className="section-intro">
						Arabic favourites. House grooves. Unexpected
						connections. Get to know the music before we make your
						night.
					</p>
					<a
						className="text-link"
						href={site.anghami}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() =>
							trackIntent("music_open", "anghami_external")
						}
					>
						View my Anghami profile{" "}
						<ArrowUpRight aria-hidden="true" />
					</a>
				</div>
				<div className="music-player">
					<div className="music-player-panel" data-status={status} aria-busy={status === "loading"}>
						{(status === "idle" || status === "loading") && <MusicSkeleton />}
						{status !== "idle" && (
							<iframe
								key={attempt}
								title={site.featuredMix.title + " on Anghami"}
								src={site.featuredMix.embedUrl}
								width="100%"
								height="600"
								scrolling="no"
								loading="eager"
								allow="autoplay; encrypted-media; fullscreen"
								referrerPolicy="strict-origin-when-cross-origin"
								onLoad={() => setStatus("ready")}
								onError={() => setStatus("failed")}
							/>
						)}
					</div>
					{status === "failed" && (
						<p className="provider-note" role="status">
							The player is taking too long to load. Try reloading it or listen directly on Anghami.
						</p>
					)}
					<noscript><style>{".music-player-panel { display: none; }"}</style></noscript>
					<p className="provider-note">
						Player not working?{" "}
						<button type="button" onClick={retryPlayer}>
							Reload player
						</button>{" or "}
						<a
							href={site.featuredMix.url}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() =>
								trackIntent("music_open", "anghami_mix")
							}
						>
							Listen directly on Anghami.
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
