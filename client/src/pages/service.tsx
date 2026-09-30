import { uiText } from "@/content/ui-ar";
import { ArrowUpRight } from "lucide-react";
import { site, localizedPath, type Service } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { FAQSection } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";

export function ServicePage({ service }: {service: Service}) {
  const t = uiText(service.language);
  const arabic = service.language === "ar";
  return <>
    <section className="shell service-hero"><div><nav className="breadcrumb" aria-label={t("Breadcrumb")}><a href={localizedPath("/", service.language)}>{t("Home")}</a> / <span aria-current="page">{service.label}</span></nav><p className="eyebrow">{service.eyebrow}</p><h1>{service.headline}</h1><p className="section-intro">{service.intro}</p><Button asChild className="button-primary"><a href="#contact">{t("Book Your Event")} <ArrowUpRight aria-hidden="true" /></a></Button></div><div className="service-hero-photo"><ResponsiveImage name={service.image} alt={service.imageAlt} sizes={imageSizes.service} priority /></div></section>
    <section className="shell section service-details" aria-label={service.serviceName}>{service.details.map((detail, index) => <article key={detail.title}><span className="eyebrow">0{index + 1}</span><h2>{detail.title}</h2><p>{detail.text}</p></article>)}</section>
    <div className="shell service-venues"><p className="eyebrow">{service.eventType === "wedding" ? t("WEDDING EXPERIENCE") : t("YOUR OCCASION")}</p><div>{service.venues.map(venue => <span key={venue}>{venue}</span>)}</div></div>
    <p className="shell destination-note">{arabic ? "من الأماكن اللي عزفت فيها لجوّ الحفلة." : "From the venues to the dance floor."} <a href={localizedPath("/experience/", service.language)}>{t("Explore my DJ experience")} <ArrowUpRight size={15} aria-hidden="true" /></a></p>
    {arabic && <div className="shell destination-note"><a href={site.featuredMix.url} target="_blank" rel="noopener noreferrer">اسمعوا ميكس عربي وعالمي على Anghami <ArrowUpRight size={15} aria-hidden="true" /></a><p><a href={service.eventType === "wedding" ? "/ar/private-events/" : "/ar/weddings/"}>{service.eventType === "wedding" ? "عم تخطّطوا لخطوبة أو حفلة خاصة؟" : "عم تحضّروا لعرس؟ تعرّفوا على خدمة الأعراس"}</a></p></div>}
    <FAQSection items={service.faqs} language={service.language} /><ContactForm initialEvent={service.eventType} language={service.language} />
  </>;
}
