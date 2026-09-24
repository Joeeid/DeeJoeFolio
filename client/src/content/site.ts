export const site = {
	name: "DeeJoe",
	origin: "https://www.deejoelb.com",
	phone: "96170121188",
	phoneLabel: "+961 70 121 188",
	email: "bookings@deejoelb.com",
	instagram: "https://www.instagram.com/deejoe._/",
	anghami: "https://play.anghami.com/artist/20108346",
	featuredMix: {
		title: "Arabic X English Fusion Mix Vol. 1",
		url: "https://play.anghami.com/song/1146922507",
		embedUrl:
			"https://widget.anghami.com/song/1146922507/?theme=fulldark&layout=narrow&lang=en",
	},
	reviewsWidget: "f9bee7ee-3da1-450f-b5dd-3973b1787059",
	reviewsUrl: "https://www.google.com/search?q=DeeJoe+Lebanon+reviews",
};

export interface FAQ {
	question: string;
	answer: string;
}
export const faqs: FAQ[] = [
	{
		question: "What kind of events do you play?",
		answer: "Weddings, engagements, birthdays, bachelor parties, proposals, proms, and private celebrations. Tell me what you're planning and the atmosphere you have in mind.",
	},
	{
		question: "Can we choose the music?",
		answer: "Absolutely—your taste is the starting point. Share your favourite genres, must-play songs, and anything you'd rather skip when we discuss your event. My approach is open-format, so there's room for different tastes and generations on the dance floor.",
	},
	{
		question: "Do you travel outside Lebanon?",
		answer: "Of course, destination events are considered on request. Share your city, country, and preferred date so we can discuss availability and travel arrangements.",
	},
	{
		question: "How do I check availability and get a quote?",
		answer: "Fill in your event details below and continue on WhatsApp, or choose email. We'll discuss the date, location, and what you have in mind before agreeing on a quote. Sending an enquiry does not reserve a date.",
	},
	{
		question: "What if we haven't picked a date or venue yet?",
		answer: "That's fine. Select “Date not decided” and share the city or country you're considering. You can leave the venue blank and tell me more as your plans take shape.",
	},
];

export interface Service {
	path: string;
	eventType: string;
	label: string;
	serviceName: string;
	eyebrow: string;
	headline: string;
	intro: string;
	image: string;
	imageAlt: string;
	details: { title: string; text: string }[];
	venues: string[];
	faqs: FAQ[];
}
export const services: Service[] = [
	{
		path: "/weddings/",
		eventType: "wedding",
		label: "Weddings",
		serviceName: "Wedding DJ in Lebanon",
		eyebrow: "WEDDING DJ · LEBANON",
		headline: "A day that's yours. A night to remember.",
		intro: "Your favourite people, your favourite music. I'm DeeJoe, a wedding DJ in Lebanon bringing generations together through Arabic favourites and international tracks, from intimate celebrations to a full dance floor.",
		image: "deejoe-experience-2",
		imageAlt: "DeeJoe wearing headphones under red and blue lighting",
		details: [
			{
				title: "Your taste comes first",
				text: "Arabic favourites, R&B, house, or a little of everything. We'll talk about the songs you love, the ones to leave out, and the energy you want for your celebration.",
			},
			{
				title: "A feel for the room",
				text: "Over a decade behind the decks means knowing when to build the energy and when to let a moment breathe. The soundtrack follows the people on your dance floor.",
			},
			{
				title: "From Lebanon to your destination",
				text: "Wedding experience includes Lotus Venue, Jardin Des Lys, Movenpick Hotel, and Gilgamesh. Planning something abroad? Share your destination and date to discuss the possibilities.",
			},
		],
		venues: [
			"Movenpick Hotel · Raouche",
			"Le Royal Hotel · Dbayeh",
			"Jardin Des Lys · Faytroun",
			"Pleine Lune · Faytroun",
			"Le Royaume · Klayaat",
			"Villa Srour · Bikfaya",
		],
		faqs: [
			{
				question: "Can we share a wedding playlist?",
				answer: "Yes. Bring your must-play songs, favourite genres, and do-not-play list to our conversation. We'll discuss how they fit the flow of your celebration.",
			},
			{
				question: "Do you work with wedding planners?",
				answer: "My experience includes working with Lebanese event planners such as Events And More and Pro Event. Share your planner's details when we discuss your wedding.",
			},
			...faqs.slice(2, 4),
		],
	},
	{
		path: "/private-events/",
		eventType: "private",
		label: "Private celebrations",
		serviceName: "Private Party & Event DJ in Lebanon",
		eyebrow: "PRIVATE PARTY DJ · LEBANON",
		headline: "Good people. Great music. Your party.",
		intro: "An engagement, a birthday, or a night with your favourite people. As your private party DJ in Lebanon, I'll bring Arabic favourites and international tracks together for a celebration that feels like you.",
		image: "deejoe-experience-1",
		imageAlt: "DeeJoe mixing music at the decks in red sunglasses",
		details: [
			{
				title: "Every occasion has its own rhythm",
				text: "Engagements, birthdays, bachelor parties, proposals, and proms. Tell me who's coming and what you're celebrating so we can talk about the right atmosphere.",
			},
			{
				title: "No single-genre rule",
				text: "From Arabic commercial hits to house and R&B, open format means there's room for different tastes. Share the music your people love and we'll take it from there.",
			},
			{
				title: "Experience beyond the booth",
				text: "Alongside private parties, my venue experience includes Gradient, Monte Carlo, Le Royal, and residencies across Lebanon. Destination celebrations are considered on request.",
			},
		],
		venues: [
			"Engagements",
			"Birthdays",
			"Bachelor parties",
			"Proposals & proms",
		],
		faqs: [
			{
				question: "What should we share when booking a DJ for a private event?",
				answer: "Start with your occasion, date, location in Lebanon, and the music you enjoy. Share your venue if you've chosen one, along with must-play songs and anything you'd rather skip. We'll discuss availability and a quote around your plans.",
			},
			faqs[0], faqs[1], faqs[2], faqs[4],
		],
	},
];

export const venueHistory = [
	{
		name: "Aeon Lounge",
		location: "Aghbe",
		period: "2022–2026",
		description: "Fusion Bazaar Night & Sunset Sessions",
		category: "Residency",
	},
	{
		name: "Aspen Lounge",
		location: "Jeita",
		period: "2024–2026",
		description: "Fusion Bazaar Night",
		category: "Residency",
	},
	{
		name: "Nama by the Sea",
		location: "Jounieh",
		period: "2026",
		description: "Fusion Bazaar Night",
		category: "Residency",
	},
	{
		name: "O Sommet",
		location: "Zaarour",
		period: "2025–2026",
		description: "Commercial House",
		category: "Residency",
	},
	{
		name: "Tonic Bar",
		location: "Jounieh",
		period: "2024–2025",
		description: "Monthly Fusion Bazaar Night",
		category: "Residency",
	},
	{
		name: "Azure Beach Resort",
		location: "Nahr El Kalb",
		period: "2022–2024",
		description: "Bazaar nights, sunset sessions & private parties",
		category: "Residency",
	},
	{
		name: "Twenty Two Pub",
		location: "Gemmayze",
		period: "2021–2024",
		description: "Fusion Bazaar & R&B nights",
		category: "Residency",
	},
	{
		name: "Momento Club",
		location: "Jounieh",
		period: "2023",
		description: "Fusion Bazaar nights",
		category: "Residency",
	},
	{
		name: "Sea Level",
		location: "Jounieh",
		period: "2022",
		description: "Beach Fusion Bazaar & Sunset Sessions",
		category: "Residency",
	},
	{
		name: "FirePit",
		location: "Mayrouba",
		period: "2021",
		description: "Friday Fusion Bazaar nights",
		category: "Residency",
	},
	{
		name: "El Puerto",
		location: "Kaslik",
		period: "2021",
		description: "Fusion Bazaar & Deep House nights",
		category: "Residency",
	},
	{
		name: "Lumberyard",
		location: "Beit Chabeb",
		period: "2021",
		description: "Fusion Bazaar & Deep House Oriental nights",
		category: "Residency",
	},
	{
		name: "Movenpick Hotel",
		location: "Raouche",
		period: "2023–2024",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Le Royal Hotel",
		location: "Dbayeh",
		period: "2023–2025",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Jardin Des Lys",
		location: "Faytroun",
		period: "2022–Present",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Lotus Venue",
		location: "Faytroun",
		period: "2022–Present",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Villa Srour",
		location: "Bikfaya",
		period: "2022-2023",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Le Royaume",
		location: "Klayaat",
		period: "2026",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Tanit Venue",
		location: "Zakrit",
		period: "2026",
		description: "Wedding celebrations",
		category: "Weddings",
	},
	{
		name: "Pleine Lune",
		location: "Faytroun",
		period: "2023–2025",
		description: "Wedding celebrations",
		category: "Weddings",
	},
];

export interface PageMeta {
	path: string;
	title: string;
	description: string;
	noindex?: boolean;
}
export const pages: PageMeta[] = [
	{
		path: "/",
		title: "DJ in Lebanon for Weddings & Private Parties | DeeJoe",
		description:
			"Meet DeeJoe, an open-format DJ in Lebanon for weddings and private parties. Arabic favourites, international tracks, and a soundtrack shaped around your crowd.",
	},
	{
		path: "/weddings/",
		title: "Wedding DJ in Lebanon | DeeJoe",
		description:
			"Looking for a wedding DJ in Lebanon? DeeJoe brings Arabic favourites, international music and Lebanese venue experience to a celebration that feels like you.",
	},
	{
		path: "/private-events/",
		title: "Private Party DJ in Lebanon | Private Events | DeeJoe",
		description:
			"DeeJoe is your private event DJ in Lebanon for birthdays, engagements and bachelor parties. Arabic and international music, shaped around your guests. Enquire.",
	},
	{
		path: "/experience/",
		title: "DJ Experience & Venues in Lebanon | DeeJoe",
		description:
			"Explore DeeJoe's DJ residencies and wedding experience at Aeon Lounge, Aspen Lounge, Lotus Venue, Jardin Des Lys and venues across Lebanon.",
	},
];
export const notFoundMeta: PageMeta = {
	path: "/404.html",
	title: "Page Not Found | DeeJoe",
	description:
		"This page could not be found. Explore DeeJoe's music, DJ services and booking information.",
	noindex: true,
};
export function pageForPath(path: string): PageMeta {
	const normalized = path === "/" ? "/" : path.replace(/\/+$/, "") + "/";
	return pages.find((page) => page.path === normalized) ?? notFoundMeta;
}
export function structuredData(page: PageMeta) {
	if (page.noindex) return [];
	const person = {
		"@type": "Person",
		"@id": site.origin + "/#artist",
		name: site.name,
		jobTitle: "Open-format DJ",
		url: site.origin + "/",
		telephone: "+" + site.phone,
		email: site.email,
		image: site.origin + "/assets/deejoe-portrait.jpg",
		description:
			"Lebanon-based DJ for weddings, engagements and private celebrations. Destination events on request.",
		sameAs: [site.instagram, site.anghami],
	};
	const webpage = {
		"@type": "WebPage",
		"@id": site.origin + page.path,
		url: site.origin + page.path,
		name: page.title,
		description: page.description,
		inLanguage: "en",
		isPartOf: { "@id": site.origin + "/#website" },
		about: { "@id": person["@id"] },
	};
	const service = services.find((service) => service.path === page.path);
	return {
		"@context": "https://schema.org",
		"@graph": [
			person,
			{
				"@type": "WebSite",
				"@id": site.origin + "/#website",
				url: site.origin + "/",
				name: site.name,
				inLanguage: "en",
				publisher: { "@id": person["@id"] },
			},
			{
				...webpage,
				...(service ? {
					mainEntity: { "@id": site.origin + service.path + "#service" },
					breadcrumb: { "@id": site.origin + service.path + "#breadcrumb" },
				} : {}),
			},
			...(service
				? [
						{
							"@type": "Service",
							"@id": site.origin + service.path + "#service",
							name: service.serviceName,
							serviceType: service.eventType === "wedding" ? "Wedding DJ" : "Private party and event DJ",
							provider: { "@id": person["@id"] },
							areaServed: { "@type": "Country", name: "Lebanon" },
							url: site.origin + service.path,
							description: service.intro,
						},
						{
							"@type": "BreadcrumbList",
							"@id": site.origin + service.path + "#breadcrumb",
							itemListElement: [
								{ "@type": "ListItem", position: 1, name: "Home", item: site.origin + "/" },
								{ "@type": "ListItem", position: 2, name: service.label, item: site.origin + service.path },
							],
						},
					]
				: []),
		],
	};
}
