import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		eventType: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Create email message
			const emailSubject = `Booking Request from ${formData.name}`;
			const emailBody = `Hi DeeJoe! I'm interested in booking you for my event.

Name: ${formData.name}
Phone: ${formData.phone}
Event Type: ${formData.eventType}
Message: ${formData.message}`;

			// Open email client
			window.open(
				`mailto:bookings@deejoelb.com?subject=${encodeURIComponent(
					emailSubject
				)}&body=${encodeURIComponent(emailBody)}`,
				"_blank"
			);

			toast({
				title: "Opening Email Client",
				description:
					"Your default email client will open with a pre-filled message.",
			});

			// Reset form
			setFormData({
				name: "",
				phone: "",
				eventType: "",
				message: "",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className="gradient-border p-6">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<Label
						htmlFor="name"
						className="block text-foreground font-medium mb-2"
					>
						Name
					</Label>
					<Input
						id="name"
						type="text"
						required
						value={formData.name}
						onChange={(e) =>
							handleInputChange("name", e.target.value)
						}
						className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
						placeholder="Your Name"
					/>
				</div>

				<div>
					<Label
						htmlFor="phone"
						className="block text-foreground font-medium mb-2"
					>
						Phone Number
					</Label>
					<Input
						id="phone"
						type="tel"
						required
						value={formData.phone}
						onChange={(e) =>
							handleInputChange("phone", e.target.value)
						}
						className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
						placeholder="+961 XX XXX XXX"
					/>
				</div>

				<div>
					<Label
						htmlFor="eventType"
						className="block text-foreground font-medium mb-2"
					>
						Event Type
					</Label>
					<Select
						value={formData.eventType}
						onValueChange={(value) =>
							handleInputChange("eventType", value)
						}
					>
						<SelectTrigger className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors">
							<SelectValue placeholder="Select event type" />
						</SelectTrigger>
						<SelectContent className="bg-background border border-border text-foreground">
							<SelectItem value="wedding">Wedding</SelectItem>
							<SelectItem value="corporate">
								Corporate Event
							</SelectItem>
							<SelectItem value="private">
								Private Party
							</SelectItem>
							<SelectItem value="club">Club Night</SelectItem>
							<SelectItem value="beach">Beach Party</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label
						htmlFor="message"
						className="block text-foreground font-medium mb-2"
					>
						Message
					</Label>
					<Textarea
						id="message"
						rows={4}
						required
						value={formData.message}
						onChange={(e) =>
							handleInputChange("message", e.target.value)
						}
						className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none"
						placeholder="Tell me about your event..."
					/>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-4 rounded-lg font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</Button>
				<p className="text-sm text-gray-400 italic text-center">
					Note: Expect a call from the team for further discussion
					about your event.
				</p>
			</form>
		</div>
	);
}
