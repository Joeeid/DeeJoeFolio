import type { FAQ } from "@/content/site";
export function FAQSection({ items }: { items: FAQ[] }) {
	return (
		<section id="faq" className="section shell faq-section">
			<div>
				<p className="eyebrow">A FEW THINGS TO KNOW</p>
				<h2>
					Before the
					<br />
					first beat.
				</h2>
				<p className="section-intro">
					A little planning.
					<br />A lot to look forward to.
				</p>
			</div>
			<div className="faq-list">
				{items.map((item, index) => (
					<details key={item.question}>
						<summary>
							<span className="faq-number">0{index + 1}</span>
							<span>{item.question}</span>
							<span className="faq-toggle" aria-hidden="true">
								+
							</span>
						</summary>
						<p>{item.answer}</p>
					</details>
				))}
			</div>
		</section>
	);
}
