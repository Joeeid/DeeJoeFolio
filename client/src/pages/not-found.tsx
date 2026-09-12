import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
	return (
		<section className="shell not-found">
			<p className="eyebrow">404 / WRONG TRACK</p>
			<h1>
				Let's get you
				<br />
				back to the music.
			</h1>
			<p>This page couldn't be found. The night's still young.</p>
			<a className="button-primary inline-flex items-center" href="/">
				Return home <ArrowUpRight size={18} aria-hidden="true" />
			</a>
			<a className="text-link" href="/#contact">
				Book Your Event <ArrowUpRight aria-hidden="true" />
			</a>
		</section>
	);
}
