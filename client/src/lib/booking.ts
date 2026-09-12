import { site } from "../content/site";

export const eventTypes = [
	["wedding", "Wedding"],
	["engagement", "Engagement"],
	["birthday", "Birthday"],
	["bachelor", "Bachelor party"],
	["proposal", "Proposal"],
	["prom", "Prom"],
	["private", "Private celebration"],
	["other", "Other celebration"],
] as const;
export interface BookingEnquiry {
	name: string;
	eventType: string;
	date: string;
	undecided: boolean;
	location: string;
	venue: string;
	message: string;
}
export type BookingErrors = Partial<Record<keyof BookingEnquiry, string>>;
export function localDate(now = new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function validateBooking(
	data: BookingEnquiry,
	today = localDate(),
): BookingErrors {
	const errors: BookingErrors = {};
	if (!data.name.trim()) errors.name = "Please enter your name.";
	if (!eventTypes.some(([value]) => value === data.eventType))
		errors.eventType = "Please choose your event type.";
	if (!data.location.trim())
		errors.location = "Please add a city and country.";
	if (!data.undecided) {
		const parsed = new Date(data.date + "T12:00:00Z");
		if (
			!/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
			Number.isNaN(parsed.getTime()) ||
			parsed.toISOString().slice(0, 10) !== data.date
		)
			errors.date = "Choose a valid date, or select ‘Date not decided'.";
		else if (data.date < today)
			errors.date = "Please choose today or a future date.";
	}
	return errors;
}
export function bookingMessage(data: BookingEnquiry) {
	const event =
		eventTypes.find(([value]) => value === data.eventType)?.[1] ??
		data.eventType;
	return [
		"Hi DeeJoe! I'd like to discuss my event.",
		"",
		`Name: ${data.name.trim()}`,
		`Event: ${event}`,
		`Date: ${data.undecided ? "Not decided" : data.date}`,
		`City / country: ${data.location.trim()}`,
		...(data.venue.trim() ? [`Venue: ${data.venue.trim()}`] : []),
		...(data.message.trim() ? ["", data.message.trim()] : []),
	].join("\n");
}
export function bookingLinks(data: BookingEnquiry) {
	const message = encodeURIComponent(bookingMessage(data));
	return {
		whatsapp: `https://wa.me/${site.phone}?text=${message}`,
		email: `mailto:${site.email}?subject=${encodeURIComponent("Event enquiry for DeeJoe")}&body=${message}`,
	};
}
