import { lazy, Suspense, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { localDate } from "@/lib/booking";

const Calendar = lazy(() => import("@/components/ui/calendar").then(module => ({ default: module.Calendar })));

interface BookingDatePickerProps {
	value: string;
	minDate: string;
	disabled: boolean;
	invalid: boolean;
	describedBy?: string;
	onChange: (value: string) => void;
}

export function BookingDatePicker({ value, minDate, disabled, invalid, describedBy, onChange }: BookingDatePickerProps) {
	const [open, setOpen] = useState(false);
	// Local noon avoids UTC conversion moving a selected calendar day.
	const selected = value ? new Date(value + "T12:00:00") : undefined;
	const earliest = minDate ? new Date(minDate + "T00:00:00") : undefined;
	return (
		<>
			<input type="hidden" name="date" value={value} disabled={disabled} />
			<span id="booking-date-description" className="sr-only">An event date is required unless Date not decided is checked.</span>
			<Popover open={open && !disabled} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button type="button" id="booking-date" className="booking-control booking-date-trigger" disabled={disabled} aria-invalid={invalid} aria-describedby={["booking-date-description", describedBy].filter(Boolean).join(" ")} data-placeholder={!selected || undefined}>
						<span>{disabled ? "Date not decided" : selected ? selected.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Choose your date"}</span>
						<CalendarDays size={18} aria-hidden="true" />
					</button>
				</PopoverTrigger>
				<PopoverContent className="booking-calendar-popover" align="start" collisionPadding={12} aria-label="Choose your event date">
					<Suspense fallback={<div className="booking-calendar" role="status">Loading calendar...</div>}>
						<Calendar
							className="booking-calendar"
							mode="single"
							selected={selected}
							defaultMonth={selected || earliest}
							startMonth={earliest}
							disabled={earliest ? { before: earliest } : undefined}
							autoFocus
							onSelect={date => { if (date) { onChange(localDate(date)); setOpen(false); } }}
							classNames={{
								weekday: "booking-calendar-weekday",
								day: "booking-calendar-cell",
								day_button: "booking-calendar-day",
								selected: "booking-calendar-selected",
								today: "booking-calendar-today",
								disabled: "booking-calendar-disabled",
								outside: "booking-calendar-outside",
								button_previous: "booking-calendar-nav",
								button_next: "booking-calendar-nav",
							}}
						/>
					</Suspense>
				</PopoverContent>
			</Popover>
		</>
	);
}
