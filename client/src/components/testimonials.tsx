import { motion } from "framer-motion";

interface Testimonial {
	name: string;
	role: string;
	content: string;
	event: string;
	date: string;
}

const testimonials: Testimonial[] = [
	{
		name: "Sarah & Tony",
		role: "Wedding Couple",
		content:
			"DeeJoe made our wedding reception absolutely unforgettable. His ability to read the crowd and keep everyone dancing was incredible. The music selection was perfect, and he seamlessly blended different genres to keep all our guests entertained.",
		event: "Wedding Reception",
		date: "June 2024",
	},
	{
		name: "Lotus Venue",
		role: "Event Manager",
		content:
			"DeeJoe's been one of our go-to DJs for weddings and private events, and for good reason. He's got this amazing ability to create the perfect atmosphere - from the first to the last song, he keeps the dance floor packed. Our brides and grooms always rave about how he made their special day even more magical.",
		event: "Resident DJ",
		date: "2022-Present",
	},
	{
		name: "Aeon Lounge",
		role: "Management Team",
		content:
			"DeeJoe is undoubtedly one of the best open format DJs we've had the pleasure of working with. His versatility and ability to seamlessly blend different genres creates an electric atmosphere that keeps our venue packed night after night.",
		event: "Resident DJ",
		date: "2022-Present",
	},
];

export function Testimonials() {
	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{testimonials.map((testimonial, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
				>
					<div className="flex items-center mb-4">
						<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
							<i className="fas fa-user text-primary"></i>
						</div>
						<div className="ml-4">
							<h3 className="font-medium">{testimonial.name}</h3>
							<p className="text-sm text-muted-foreground">
								{testimonial.role}
							</p>
						</div>
					</div>
					<p className="text-muted-foreground mb-4 italic flex-grow">
						"{testimonial.content}"
					</p>
					<div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
						<span>{testimonial.event}</span>
						<span>{testimonial.date}</span>
					</div>
				</motion.div>
			))}
		</div>
	);
}
