export function WhatsAppButton() {
	const whatsappNumber = "96170121188";
	const whatsappUrl = `https://wa.me/${whatsappNumber}`;

	return (
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center justify-center w-16 h-16 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
			aria-label="Contact us on WhatsApp"
			title="Contact us on WhatsApp"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				md-width="24"
				md-height="24"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-8 h-8 md:w-6 md:h-6"
			>
				<path d="M12 0C5.373 0 0 5.373 0 12c0 2.148.528 4.185 1.547 5.977L0 24l6.223-1.547C8.815 23.472 10.852 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.840 0-3.635-.396-5.294-1.149l-.38-.19-3.940.98.98-3.940-.19-.38C1.396 15.635 1 13.840 1 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" />
				<path d="M16.67 14.5c-.28-.14-1.65-.82-1.91-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.89 1.1-.16.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.41-1.68-1.57-1.96-.16-.28-.02-.43.12-.57.12-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.48-.17-.01-.36-.01-.55-.01-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36 0 1.39 1.01 2.74 1.15 2.93.14.19 1.99 3.05 4.83 4.27.68.33 1.21.47 1.62.6.68.21 1.3.19 1.79.11.55-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33z" />
			</svg>
		</a>
	);
}
