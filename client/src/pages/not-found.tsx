import { localizedPath, type Language } from "@/content/site";
import { uiText } from "@/content/ui-ar";
import { ArrowUpRight } from "lucide-react";
export default function NotFound({ language = "en" }: { language?: Language }) {
 const arabic = language === "ar-LB";
 const t = uiText(language);
	return (
		<section className="shell not-found">
			<p className="eyebrow">{arabic ? "404 / ضاعت النغمة" : "404 / WRONG TRACK"}</p>
			<h1>
				{arabic ? "خلّينا نرجع للموسيقى." : <>Let's get you<br />back to the music.</>}
			</h1>
			<p>{arabic ? "هالصفحة مش موجودة، بس السهرة بعدها بأوّلها." : "This page couldn't be found. The night's still young."}</p>
			<a className="button-primary inline-flex items-center" href={localizedPath("/", language)}>
				{arabic ? "ارجعوا للرئيسية" : "Return home"} <ArrowUpRight size={18} aria-hidden="true" />
			</a>
			<a className="text-link" href={localizedPath("/#contact", language)}>
				{t("Book Your Event")} <ArrowUpRight aria-hidden="true" />
			</a>
		</section>
	);
}
