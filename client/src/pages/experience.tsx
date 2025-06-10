import { motion } from "framer-motion";

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

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export function ExperiencePage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-16">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="space-y-24"
				>
					<motion.div variants={fadeIn} className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
							Experience
						</h1>
						<p className="text-foreground/80 max-w-2xl mx-auto">
							A journey through my professional experience as a
							DJ, from residencies to special events, showcasing
							my versatility and expertise in creating
							unforgettable musical experiences.
						</p>
					</motion.div>

					{experiences.map((item, index) => (
						<motion.div
							key={index}
							variants={fadeIn}
							className={`flex flex-col ${
								index % 2 === 0
									? "lg:flex-row"
									: "lg:flex-row-reverse"
							} gap-8 items-center`}
						>
							{item.image && (
								<motion.div
									className="w-full lg:w-1/2 flex justify-center"
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}
								>
									<img
										src={item.image}
										alt={`${item.title} - ${item.description}`}
										className="w-auto h-[600px] object-contain rounded-lg shadow-lg"
										loading="lazy"
										decoding="async"
									/>
								</motion.div>
							)}
							<div className="w-full lg:w-1/2 space-y-6">
								<h2 className="text-3xl font-bold text-gradient">
									{item.title}
								</h2>
								<p className="text-foreground/80 text-lg">
									{item.description}
								</p>
								<div className="space-y-4">
									{item.venues.map((venue, venueIndex) => (
										<div
											key={venueIndex}
											className="border-l-2 border-primary pl-4"
										>
											<h3 className="text-xl font-semibold text-primary">
												{venue.name}
											</h3>
											<p className="text-foreground/60">
												{venue.period}
											</p>
											{venue.description && (
												<p className="text-foreground/80 mt-1">
													{venue.description}
												</p>
											)}
										</div>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
}
