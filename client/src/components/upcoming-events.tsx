import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Event {
	date: string;
	venue: string;
	location: string;
	time: string;
	type: string;
}

export function UpcomingEvents() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				// Replace with your Google Sheets API endpoint
				const response = await fetch("/api/events");
				const data = await response.json();
				setEvents(data);
			} catch (err) {
				setError("Failed to load events");
				console.error("Error fetching events:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	if (loading) {
		return (
			<div className="bg-muted rounded-lg p-6 text-center">
				<p className="text-muted-foreground">
					Loading upcoming events...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-muted rounded-lg p-6 text-center">
				<p className="text-muted-foreground">{error}</p>
			</div>
		);
	}

	if (events.length === 0) {
		return (
			<div className="bg-muted rounded-lg p-6 text-center">
				<p className="text-muted-foreground">
					No upcoming events scheduled.
				</p>
			</div>
		);
	}

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{events.map((event, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
				>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center">
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
								<i className="fas fa-calendar text-primary"></i>
							</div>
							<div className="ml-4">
								<h3 className="font-medium">{event.venue}</h3>
								<p className="text-sm text-muted-foreground">
									{event.date}
								</p>
							</div>
						</div>
						<span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
							{event.type}
						</span>
					</div>
					<div className="space-y-2">
						<p className="text-muted-foreground">
							<i className="fas fa-clock mr-2"></i>
							{event.time}
						</p>
						<p className="text-muted-foreground">
							<i className="fas fa-map-marker-alt mr-2"></i>
							{event.location}
						</p>
					</div>
				</motion.div>
			))}
		</div>
	);
}
