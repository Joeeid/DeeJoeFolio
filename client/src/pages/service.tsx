import { ArrowUpRight } from "lucide-react";
import { type Service } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/responsive-image";
import { imageSizes } from "@/content/images";
import { FAQSection } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";

export function ServicePage({ service }: {service: Service}) {
  return <>
    <section className="shell service-hero"><div><a className="breadcrumb" href="/#services">Services / {service.label}</a><p className="eyebrow">{service.eyebrow}</p><h1>{service.headline}</h1><p className="section-intro">{service.intro}</p><Button asChild className="button-primary"><a href="#contact">Book Your Event <ArrowUpRight aria-hidden="true" /></a></Button></div><div className="service-hero-photo"><ResponsiveImage name={service.image} alt={service.imageAlt} sizes={imageSizes.service} priority /></div></section>
    <section className="shell section service-details" aria-label={service.label + " DJ service"}>{service.details.map((detail, index) => <article key={detail.title}><span className="eyebrow">0{index + 1}</span><h2>{detail.title}</h2><p>{detail.text}</p></article>)}</section>
    <div className="shell service-venues"><p className="eyebrow">{service.eventType === "wedding" ? "WEDDING EXPERIENCE" : "YOUR OCCASION"}</p><div>{service.venues.map(venue => <span key={venue}>{venue}</span>)}</div></div>
    <FAQSection items={service.faqs} /><ContactForm initialEvent={service.eventType} />
  </>;
}
