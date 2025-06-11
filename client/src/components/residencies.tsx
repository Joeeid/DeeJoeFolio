import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/motion";

interface ExperienceItem {
	title: string;
	venue: string;
	style: string;
	description: string;
}

const experiences: ExperienceItem[] = [
	{
		title: "Resident DJ",
		venue: "Aeon Lounge, Aspen Lounge",
		style: "Fusion Bazaar Night, Sunset Sessions",
		description:
			"Creating unforgettable experiences at one of Lebanon's premier venues.",
	},
	{
		title: "Event DJ",
		venue: "Lotus Venue, Movenpick Hotel, Jardin Des Lys",
		style: "Weddings, Engagements, Private Parties",
		description:
			"Specializing in creating personalized musical experiences for life's most important celebrations.",
	},
	{
		title: "Private DJ",
		venue: "Loyal Clients",
		style: "As Requested by the client",
		description:
			"Providing exclusive DJ services for private events, tailored to your specific needs and preferences.",
	},
];

export function Residencies() {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={staggerContainer}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
		>
			{experiences.map((item, index) => (
				<motion.div
					key={index}
					variants={fadeIn}
					className="gradient-border hover-card bg-background/40 backdrop-blur-sm"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<div className="p-6">
						<h3 className="text-xl font-bold mb-2 text-white">
							{item.title}
						</h3>
						<p className="text-[#ff6b6b] mb-2">{item.venue}</p>
						<p className="text-white/60 mb-4">{item.style}</p>
						<p className="text-white/80">{item.description}</p>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
