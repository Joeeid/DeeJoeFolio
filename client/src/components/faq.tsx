import type { FAQ, Language } from "@/content/site";
export function FAQSection({ items, language = "en" }: { items: FAQ[]; language?: Language }) {
	return (
		<section id="faq" className="section shell faq-section">
			<div>
				<p className="eyebrow">{language === "ar" ? "قبل ما نبلّش" : "A FEW THINGS TO KNOW"}</p>
				<h2>
					{language === "ar" ? "أسئلة قبل الحفلة" : <>Before the<br />first beat.</>}
				</h2>
				<p className="section-intro">
					{language === "ar" ? "شوي تخطيط، وكتير لحظات حلوة ناطرينها." : <>A little planning.<br />A lot to look forward to.</>}
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
