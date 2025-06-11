import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";
import { Residencies } from "@/components/residencies";
import { Experience } from "@/components/experience";
import { ContactForm } from "@/components/contact-form";

interface ExperienceItem {
	title: string;
	venues: {
		name: string;
		period: string;
		description?: string;
	}[];
	description: string;
	image?: string;
}

const experiences: ExperienceItem[] = [
	{
		title: "Resident DJ",
		venues: [
			{
				name: "Aeon Lounge, Aghbe",
				period: "2022 - Present",
				description:
					"Weekly residency for Fusion Bazaar Night and Sunset Sessions",
			},
			{
				name: "Aspen Lounge, Jeita",
				period: "2024 - Present",
				description: "Weekly residency for Fusion Bazaar Night",
			},
			{
				name: "Tonic Bar, Jounieh",
				period: "2024 - Present",
				description: "Monthly residency for Fusion Bazaar Night",
			},
			{
				name: "Azure Beach Resort, Nahr El Kalb",
				period: "2022 - 2024",
				description:
					"Summer residency that included Bazaar Nights, Sunset Sessions, and Private Parties",
			},
			{
				name: "Twenty Two Pub, Gemmayze",
				period: "2021 - 2024",
				description:
					"Resident DJ for Fusion Bazaar Nights and Rnb Nights",
			},
			{
				name: "Momento Club, Jounieh",
				period: "2023 - 2023",
				description: "Resident DJ for Fusion Bazaar Nights",
			},
			{
				name: "Sea Level, Jounieh",
				period: "2022- 2022",
				description:
					"Summer residency for Beach Fusion Bazaar and Sunset Sessions",
			},
			{
				name: "FirePit, Mayrouba",
				period: "2021- 2021",
				description: "Friday residency for Fusion Bazaar Night",
			},
			{
				name: "El Puerto, Kaslik",
				period: "2021- 2021",
				description:
					"Summer residency for Fusion Bazaar Night and Deep House Nights",
			},
			{
				name: "Lumberyard, Beit Chabeb",
				period: "2021- 2021",
				description:
					"Summer residency for Fusion Bazaar Night and Deep House Oriental Nights",
			},
		],
		description:
			"Creating unforgettable experiences at Lebanon's most prestigious venues.",
		image: "/assets/deejoe-experience-1.jpg",
	},
	{
		title: "Wedding Specialist",
		venues: [
			{
				name: "Event Planners",
				period: "2022 - Present",
				description:
					"Working with top event planners in Lebanon such as Events And More, Pro Event, etc.",
			},
			{
				name: "Lotus Venue, Faytroun",
				period: "2022 - Present",
				description: "Exclusive DJ for high-end weddings",
			},
			{
				name: "Jardin Des Lys, Faytroun",
				period: "2022 - Present",
				description: "Exclusive DJ for high-end weddings",
			},
			{
				name: "Movenpick Hotel, Raouche",
				period: "2023 - 2024",
				description: "Exclusive DJ for high-end weddings",
			},
			{
				name: "Gilgamesh, Rabieh",
				period: "2022 - 2024",
				description: "Exclusive DJ for small cozy weddings",
			},
		],
		description:
			"Crafting perfect soundtracks for couples' special days, from intimate gatherings to grand celebrations.",
		image: "/assets/deejoe-experience-2.jpg",
	},
	{
		title: "Private Events",
		venues: [
			{
				name: "Corporate Events",
				period: "2021 - Present",
				description:
					"Annual company parties, businesses openings, and corporate celebrations",
			},
			{
				name: "Private Parties",
				period: "2021 - Present",
				description:
					"Exclusive gatherings and VIP events. Created unique engagements, bachelors and birthdays.",
			},
			{
				name: "More",
				period: "2021 - Present",
				description:
					"Had the pleasure of single-time DJing for multiple venues such as Gradient, Monte Carlo, Le Royal, etc.",
			},
		],
		description:
			"Delivering professional entertainment for various private events, ensuring each occasion is unique and memorable.",
	},
];

export function ExperiencePage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Hero Section */}
			<section
				id="experience-hero"
				className="min-h-[60vh] flex items-center justify-center relative overflow-hidden"
				aria-label="Experience Hero Section"
			>
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
					style={{
						backgroundImage: 'url("/assets/experience-bg.jpg")',
					}}
					role="img"
					aria-label="DeeJoe DJ performance background"
				/>

				{/* Gradient Overlay */}
				<div
					className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background z-10"
					aria-hidden="true"
				/>

				<div className="container mx-auto px-4 py-20 relative z-20">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="max-w-3xl mx-auto text-center"
					>
						<motion.h1
							variants={fadeIn}
							className="text-4xl md:text-6xl mb-6 text-gradient animate-pulse-slow font-salvar"
						>
							EXPERIENCE
						</motion.h1>
						<motion.p
							variants={fadeIn}
							className="text-xl md:text-2xl text-foreground/80"
						>
							From residencies to special events, I bring energy
							and expertise to every performance.
						</motion.p>
					</motion.div>
				</div>
			</section>

			{/* Current Residencies Section */}
			<section
				id="residencies"
				className="py-20 relative overflow-hidden"
				aria-label="Current Residencies"
			>
				<div
					className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a0a] to-[#0f0f0f]"
					aria-hidden="true"
				/>
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="text-center mb-12"
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-4 text-white"
						>
							Current Residencies
						</motion.h2>
						<motion.p
							variants={fadeIn}
							className="text-white/90 max-w-2xl mx-auto"
						>
							Regular venues where you can find me performing
						</motion.p>
					</motion.div>
					<Residencies />
				</div>
			</section>

			{/* Past Events Section */}
			<section
				id="past-events"
				className="py-20 relative overflow-hidden"
				aria-label="Past Events"
			>
				<div
					className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#ff3b3b]/10 to-[#0a0a0a]"
					aria-hidden="true"
				/>
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="text-center mb-12"
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-4 text-white"
						>
							Past Experience
						</motion.h2>
						<motion.p
							variants={fadeIn}
							className="text-white/90 max-w-2xl mx-auto"
						>
							Every experience is unique and memorable
						</motion.p>
					</motion.div>
					<Experience />
				</div>
			</section>

			{/* Contact Form Section */}
			<section
				id="contact"
				className="py-20 relative overflow-hidden"
				aria-label="Contact Form"
			>
				<div
					className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a0a] to-[#0f0f0f]"
					aria-hidden="true"
				/>
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="text-center mb-12"
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-4 text-white"
						>
							Book Your Event
						</motion.h2>
						<motion.p
							variants={fadeIn}
							className="text-white/90 max-w-2xl mx-auto"
						>
							Let's create an unforgettable experience together
						</motion.p>
					</motion.div>
					<div className="max-w-2xl mx-auto">
						<ContactForm />
					</div>
				</div>
			</section>
		</div>
	);
}
