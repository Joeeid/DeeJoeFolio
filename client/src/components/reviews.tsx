import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { trackIntent } from "@/lib/analytics";
import { Skeleton } from "@/components/ui/skeleton";

function ReviewsSkeleton() {
	return (
		<div className="reviews-loading" role="status">
			<span className="sr-only">Loading Google reviews…</span>
			<div aria-hidden="true">
				<div className="reviews-loading-heading">
					<div className="reviews-loading-heading-stars">
						<Skeleton className="review-placeholder review-placeholder-avatar" />
						<div className="review-placeholder-lines">
							<Skeleton className="review-placeholder review-placeholder-title" />
							<Skeleton className="review-placeholder review-placeholder-rating" />
						</div>
					</div>
					<Skeleton className="review-placeholder review-placeholder-button" />
				</div>
				<div className="review-placeholder-grid">
					{[0, 1, 2, 3].map((card) => (
						<div className="review-placeholder-card" key={card}>
							<div className="review-placeholder-author">
								<div>
									<Skeleton className="review-placeholder review-placeholder-name" />
									<Skeleton className="review-placeholder review-placeholder-date" />
								</div>
							</div>
							<Skeleton className="review-placeholder review-placeholder-rating" />
							<div className="review-placeholder-lines">
								<Skeleton className="review-placeholder" />
								<Skeleton className="review-placeholder" />
								<Skeleton className="review-placeholder review-placeholder-short" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function Reviews() {
	const [status, setStatus] = useState<"loading" | "ready" | "failed">(
		"loading",
	);
	const section = useRef<HTMLElement>(null);
	const widget = useRef<HTMLDivElement>(null);

	function hideElfsightLink() {
		section.current
			?.querySelectorAll<HTMLAnchorElement>('a[href*="elfsight.com"]')
			.forEach((link) => {
				if (
					link.style.getPropertyValue("display") !== "none" ||
					link.style.getPropertyPriority("display") !== "important"
				) {
					link.style.setProperty("display", "none", "important");
					link.style.setProperty("visibility", "hidden", "important");
				}
			});
	}

	useEffect(() => {
		let cancelled = false;
		let started = false;
		let script: HTMLScriptElement | null = null;
		let timeout: ReturnType<typeof setTimeout> | undefined;
		const onError = () => {
			if (!cancelled) setStatus("failed");
		};
		function checkReviews() {
			hideElfsightLink();
			// The platform script can finish before the review cards arrive.
			if (
				!cancelled &&
				widget.current?.querySelector(
					'a[href*="google.com/maps/reviews"]',
				)
			) {
				clearTimeout(timeout);
				setStatus("ready");
			}
		}
		// Keep late-injected credits hidden without a recurring timer.
		checkReviews();
		const creditObserver = new MutationObserver(checkReviews);
		if (widget.current)
			creditObserver.observe(widget.current, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["href", "style"],
			});
		function load() {
			if (started) return;
			started = true;
			trackIntent("reviews_open", "google_reviews_auto");
			timeout = setTimeout(onError, 15000);
			script = document.getElementById(
				"reviews-script",
			) as HTMLScriptElement | null;
			if (!script) {
				script = document.createElement("script");
				script.id = "reviews-script";
				script.src = "https://elfsightcdn.com/platform.js";
				script.async = true;
				script.addEventListener("error", onError);
				document.body.appendChild(script);
			} else script.addEventListener("error", onError);
			checkReviews();
		}
		// Automatic reviews, deferred until the section approaches the viewport.
		const observer =
			"IntersectionObserver" in window
				? new IntersectionObserver(
						(entries) => {
							if (entries.some((entry) => entry.isIntersecting)) {
								load();
								observer?.disconnect();
							}
						},
						{ rootMargin: "400px" },
					)
				: null;
		if (observer && section.current) observer.observe(section.current);
		else load();
		return () => {
			cancelled = true;
			clearTimeout(timeout);
			observer?.disconnect();
			creditObserver.disconnect();
			script?.removeEventListener("error", onError);
		};
	}, []);

	return (
		<section ref={section} id="reviews" className="reviews-section">
			<span id="testimonials" className="anchor-alias" />
			<div className="shell section">
				<div className="section-heading">
					<div>
						<p className="eyebrow">FROM THE DANCE FLOOR</p>
						<h2>
							Their night.
							<br />
							Their words.
						</h2>
					</div>
					<p>
						Hear from the people who've
						<br />
						shared a celebration with DeeJoe.
					</p>
				</div>
				<div className="reviews-panel" data-status={status}>
					{status === "loading" && <ReviewsSkeleton />}
					<div
						ref={widget}
						className="reviews-widget"
						aria-label="Google reviews"
						aria-busy={status === "loading"}
						aria-hidden={status !== "ready"}
					>
						<div className={`elfsight-app-${site.reviewsWidget}`} />
					</div>
				</div>
				<noscript>
					<style>{".reviews-panel { display: none; }"}</style>
					<p className="provider-note">
						Read the reviews using the Google link below.
					</p>
				</noscript>
				{status === "failed" && (
					<p role="status" className="provider-note">
						The reviews couldn't load. You can still find them on
						Google.
					</p>
				)}
				<a
					className="text-link provider-link"
					href={site.reviewsUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					Find DeeJoe's reviews on Google{" "}
					<ArrowUpRight aria-hidden="true" />
				</a>
			</div>
		</section>
	);
}
