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
		email: "",
		eventType: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Create WhatsApp message
			const whatsappMessage = `Hi DeeJoe! I'm interested in booking you for my event.%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0AEvent Type: ${formData.eventType}%0AMessage: ${formData.message}`;

			// Open WhatsApp
			window.open(
				`https://wa.me/96170121188?text=${whatsappMessage}`,
				"_blank"
			);

			toast({
				title: "Redirecting to WhatsApp",
				description:
					"You'll be redirected to WhatsApp to complete your booking request.",
			});

			// Reset form
			setFormData({
				name: "",
				email: "",
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
						htmlFor="email"
						className="block text-foreground font-medium mb-2"
					>
						Email
					</Label>
					<Input
						id="email"
						type="email"
						required
						value={formData.email}
						onChange={(e) =>
							handleInputChange("email", e.target.value)
						}
						className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
						placeholder="your@email.com"
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
			</form>
		</div>
	);
}
