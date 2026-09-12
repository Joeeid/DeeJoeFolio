import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { BookingDatePicker } from "@/components/booking-date-picker";
import { site } from "@/content/site";
import {
	bookingLinks,
	eventTypes,
	localDate,
	validateBooking,
	type BookingEnquiry,
	type BookingErrors,
} from "@/lib/booking";
import { trackIntent } from "@/lib/analytics";

export function ContactForm({ initialEvent = "" }: { initialEvent?: string }) {
	const [data, setData] = useState<BookingEnquiry>({
		name: "",
		eventType: initialEvent,
		date: "",
		undecided: false,
		location: "",
		venue: "",
		message: "",
	});
	const [errors, setErrors] = useState<BookingErrors>({});
	const [status, setStatus] = useState("");
	const [handoff, setHandoff] = useState<{
		method: "whatsapp" | "email";
		url: string;
	} | null>(null);
	const [today, setToday] = useState("");
	const form = useRef<HTMLFormElement>(null);
	useEffect(() => {
		setToday(localDate());
	}, []);
	function update<K extends keyof BookingEnquiry>(
		key: K,
		value: BookingEnquiry[K],
	) {
		setData((previous) => ({ ...previous, [key]: value }));
		setErrors((previous) => ({
			...previous,
			[key]: undefined,
			...(key === "undecided" ? { date: undefined } : {}),
		}));
		setStatus("");
		setHandoff(null);
	}
	function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// Read the form as well as controlled state to include browser autofill.
		const fields = new FormData(event.currentTarget);
		const enquiry: BookingEnquiry = {
			name: String(fields.get("name") || ""),
			eventType: String(fields.get("eventType") || ""),
			date: String(fields.get("date") || ""),
			undecided: fields.has("undecided"),
			location: String(fields.get("location") || ""),
			venue: String(fields.get("venue") || ""),
			message: String(fields.get("message") || ""),
		};
		setData(enquiry);
		const nextErrors = validateBooking(enquiry);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length) {
			const first = Object.keys(nextErrors)[0];
			form.current
				?.querySelector<HTMLElement>("#booking-" + first)
				?.focus();
			return;
		}
		const method =
			(event.nativeEvent as SubmitEvent).submitter?.getAttribute(
				"data-method",
			) === "email"
				? "email"
				: "whatsapp";
		const link = bookingLinks(enquiry)[method];
		setHandoff({ method, url: link });
		trackIntent("contact_intent", method);
		// This happens directly in the user gesture, independently of analytics.
		if (method === "whatsapp")
			window.open(link, "_blank", "noopener,noreferrer");
		else window.location.href = link;
		setStatus(
			method === "whatsapp"
				? "Send your draft in WhatsApp to start the conversation. If it didn't open, use the link below. Your date is not reserved yet."
				: "Send your draft in your email app to start the conversation. If it didn't open, use the link below.",
		);
	}
	const errorFor = (field: keyof BookingEnquiry) =>
		errors[field] ? (
			<p className="field-error" id={"error-" + field}>
				{errors[field]}
			</p>
		) : null;
	const accessibility = (field: keyof BookingEnquiry) => ({
		"aria-invalid": Boolean(errors[field]),
		"aria-describedby": errors[field] ? "error-" + field : undefined,
	});
	return (
		<section id="contact" className="contact-section">
			<div className="shell section contact-grid">
				<div className="contact-copy">
					<p className="eyebrow">LET'S MAKE IT HAPPEN</p>
					<h2>
						A great night
						<br />
						starts with
						<br />
						<span>a hello.</span>
					</h2>
					<p>
						Tell me a little about your celebration.
						<br />
						We'll take it from there.
					</p>
					<div className="contact-details">
						<a
							href={"https://wa.me/" + site.phone}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() =>
								trackIntent("contact_intent", "whatsapp_direct")
							}
						>
							<MessageCircle size={19} aria-hidden="true" />
							{site.phoneLabel}
							<ArrowUpRight size={15} aria-hidden="true" />
						</a>
						<a
							href={"mailto:" + site.email}
							onClick={() =>
								trackIntent("contact_intent", "email_direct")
							}
						>
							<Mail size={19} aria-hidden="true" />
							{site.email}
						</a>
					</div>
					<p className="contact-location">
						Based in Lebanon.
						<br />
						Destination events on request.
					</p>
				</div>
				<div id="contact-form">
					<form
						ref={form}
						className="booking-form"
						onSubmit={submit}
						noValidate
					>
						<div className="form-heading">
							<h3>Your event, your way.</h3>
							<p>
								Required fields are marked with an asterisk (*).
							</p>
						</div>
						<div className="form-grid">
							<div className="field">
								<Label htmlFor="booking-name">
									Your name *
								</Label>
								<Input
									id="booking-name"
									name="name"
									autoComplete="name"
									maxLength={100}
									required
									placeholder="What should I call you?"
									value={data.name}
									onChange={(e) =>
										update("name", e.target.value)
									}
									{...accessibility("name")}
								/>
								{errorFor("name")}
							</div>
							<div className="field">
								<Label htmlFor="booking-eventType">
									What are we celebrating? *
								</Label>
								<Select
									name="eventType"
									required
									value={data.eventType}
									onValueChange={(value) =>
										update("eventType", value)
									}
								>
									<SelectTrigger
										id="booking-eventType"
										className="booking-control"
										{...accessibility("eventType")}
									>
										<SelectValue placeholder="Choose your event">
											{
												eventTypes.find(
													([value]) =>
														value ===
														data.eventType,
												)?.[1]
											}
										</SelectValue>
									</SelectTrigger>
									<SelectContent
										className="booking-event-options"
										position="popper"
										collisionPadding={12}
									>
										{eventTypes.map(([value, label]) => (
											<SelectItem
												className="booking-event-option"
												key={value}
												value={value}
											>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errorFor("eventType")}
							</div>
							<div className="field">
								<Label htmlFor="booking-date">
									Event date{!data.undecided && " *"}
								</Label>
								<BookingDatePicker
									minDate={today}
									disabled={data.undecided}
									value={data.date}
									onChange={(value) => update("date", value)}
									invalid={Boolean(errors.date)}
									describedBy={
										errors.date ? "error-date" : undefined
									}
								/>
								<label className="checkbox-label">
									<input
										type="checkbox"
										name="undecided"
										checked={data.undecided}
										onChange={(e) =>
											update(
												"undecided",
												e.target.checked,
											)
										}
									/>{" "}
									Date not decided
								</label>
								{errorFor("date")}
							</div>
							<div className="field">
								<Label htmlFor="booking-location">
									City / country *
								</Label>
								<Input
									id="booking-location"
									name="location"
									maxLength={150}
									required
									placeholder="e.g. Beirut, Lebanon"
									value={data.location}
									onChange={(e) =>
										update("location", e.target.value)
									}
									{...accessibility("location")}
								/>
								{errorFor("location")}
							</div>
							<div className="field full-width">
								<Label htmlFor="booking-venue">
									Venue <span>(optional)</span>
								</Label>
								<Input
									id="booking-venue"
									name="venue"
									maxLength={150}
									placeholder="If you have somewhere in mind"
									value={data.venue}
									onChange={(e) =>
										update("venue", e.target.value)
									}
								/>
							</div>
							<div className="field full-width">
								<Label htmlFor="booking-message">
									Anything else? <span>(optional)</span>
								</Label>
								<Textarea
									id="booking-message"
									name="message"
									rows={3}
									maxLength={1500}
									placeholder="Your music, your people, the vibe you're after…"
									value={data.message}
									onChange={(e) =>
										update("message", e.target.value)
									}
								/>
							</div>
						</div>
						<Button
							type="submit"
							data-method="whatsapp"
							className="button-primary form-submit"
						>
							Continue on WhatsApp{" "}
							<ArrowUpRight aria-hidden="true" />
						</Button>
						<p className="handoff-note">
							Opens a message draft. You send it in WhatsApp.
							<br />
							Availability and booking are confirmed in
							conversation.
						</p>
						<button
							type="submit"
							data-method="email"
							className="email-alternative"
						>
							<Mail size={16} aria-hidden="true" /> Prefer email?
							Prepare an email instead
						</button>
						{status && (
							<p className="form-status" role="status">
								{status}
							</p>
						)}
						{handoff && (
							<a
								className="text-link provider-link"
								href={handoff.url}
								target={
									handoff.method === "whatsapp"
										? "_blank"
										: undefined
								}
								rel="noopener noreferrer"
							>
								Open{" "}
								{handoff.method === "whatsapp"
									? "WhatsApp"
									: "email"}{" "}
								draft <ArrowUpRight aria-hidden="true" />
							</a>
						)}
						{Object.keys(errors).some(
							(key) => errors[key as keyof BookingErrors],
						) && (
							<p className="field-error" role="alert">
								Please check the highlighted fields.
							</p>
						)}
						<noscript>
							<p>
								Please use the WhatsApp or email links beside
								this form to discuss your event.
							</p>
						</noscript>
					</form>
				</div>
			</div>
		</section>
	);
}
