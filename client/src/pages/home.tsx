import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
// import { GalleryModal } from "@/components/gallery-modal";
import { ContactForm } from "@/components/contact-form";

// const galleryImages = [
// 	{
// 		src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=1200",
// 		thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
// 		alt: "DJ performing at outdoor festival",
// 	}
// ];

export default function Home() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	// const [selectedImage, setSelectedImage] = useState<number | null>(null);

	const { ref: heroRef, isIntersecting: isHeroVisible } =
		useIntersectionObserver();
	const { ref: aboutRef, isIntersecting: isAboutVisible } =
		useIntersectionObserver();
	const { ref: experienceRef, isIntersecting: isExperienceVisible } =
		useIntersectionObserver();
	const { ref: socialRef, isIntersecting: isSocialVisible } =
		useIntersectionObserver();
	const { ref: contactRef, isIntersecting: isContactVisible } =
		useIntersectionObserver();

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const offsetTop = element.offsetTop - 120;
			window.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});
		}
		setMobileMenuOpen(false);
	};

	return (
		<div className="min-h-screen bg-[hsl(0,0%,4%)] text-white overflow-x-hidden">
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-40 bg-[hsl(0,0%,4%)]/90 backdrop-blur-md border-b ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="font-salvar text-xl text-primary">
							DEEJOE
						</div>
						<div className="hidden md:flex space-x-8">
							<button
								onClick={() => scrollToSection("home")}
								className="text-gray-300 hover:text-primary transition-colors"
							>
								Home
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="text-gray-300 hover:text-primary transition-colors"
							>
								About
							</button>
							<button
								onClick={() => scrollToSection("experience")}
								className="text-gray-300 hover:text-primary transition-colors"
							>
								Experience
							</button>
							<button
								onClick={() => scrollToSection("gallery")}
								className="text-gray-300 hover:text-primary transition-colors"
							>
								Gallery
							</button>
							<button
								onClick={() => scrollToSection("contact")}
								className="text-gray-300 hover:text-primary transition-colors"
							>
								Contact
							</button>
						</div>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="md:hidden text-white"
						>
							<i className="fas fa-bars text-xl"></i>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden bg-[hsl(0,0%,10%)]/95 backdrop-blur-md border-t">
						<div className="px-4 py-4 space-y-4">
							<button
								onClick={() => scrollToSection("home")}
								className="block text-gray-300 hover:text-primary transition-colors"
							>
								Home
							</button>
							<button
								onClick={() => scrollToSection("about")}
								className="block text-gray-300 hover:text-primary transition-colors"
							>
								About
							</button>
							<button
								onClick={() => scrollToSection("experience")}
								className="block text-gray-300 hover:text-primary transition-colors"
							>
								Experience
							</button>
							<button
								onClick={() => scrollToSection("gallery")}
								className="block text-gray-300 hover:text-primary transition-colors"
							>
								Gallery
							</button>
							<button
								onClick={() => scrollToSection("contact")}
								className="block text-gray-300 hover:text-primary transition-colors"
							>
								Contact
							</button>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<section
				id="home"
				ref={heroRef}
				className="hero-bg min-h-screen flex items-center justify-center pt-28 pb-16"
			>
				<div
					className={`text-center ${
						isHeroVisible ? "animate-fade-in" : "opacity-0"
					}`}
				>
					<h1 className="font-salvar text-6xl md:text-8xl lg:text-9xl mb-4">
						DEEJOE
					</h1>
					<p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
						Bringing Life to Every Beat
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<a
							href="https://wa.me/96170121188"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gradient-to-r from-primary to-secondary text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
						>
							<i className="fab fa-whatsapp mr-2"></i>Book Me Now
						</a>
						<button
							onClick={() => scrollToSection("experience")}
							className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-black transition-colors"
						>
							View Experience
						</button>
					</div>
				</div>
				{/* Floating DJ Elements */}
				<div className="absolute bottom-10 mx-auto animate-float">
					<i className="fas fa-headphones text-4xl text-primary opacity-70"></i>
				</div>
			</section>

			{/* About Me Section */}
			<section
				id="about"
				ref={aboutRef}
				className="py-20 px-4 max-w-7xl mx-auto"
			>
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div
						className={`${
							isAboutVisible ? "animate-slide-up" : "opacity-0"
						}`}
					>
						<h2 className="font-poppins font-bold text-4xl md:text-5xl mb-8 text-primary">
							About DeeJoe
						</h2>
						<p className="text-lg text-gray-300 leading-relaxed mb-8">
							DeeJoe is an open-format DJ from Lebanon, known for
							creating unforgettable musical journeys through
							powerful blends of genres. Since 2020, he performed
							at top venues and elite events across the country,
							curating every set with precision, creativity, and a
							deep connection to the crowd.
						</p>
						<p className="text-lg text-gray-300 leading-relaxed mb-8">
							Whether it's a wedding, beach party, club night, or
							a fusion-themed event, DeeJoe delivers high-energy
							performances that turn moments into memories.
						</p>

						{/* Contact Info */}
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<i className="fas fa-envelope text-primary text-xl"></i>
								<a
									href="mailto:deejoe.lb@gmail.com"
									className="text-gray-300 hover:text-primary transition-colors"
								>
									deejoe.lb@gmail.com
								</a>
							</div>
							<div className="flex items-center space-x-4">
								<i className="fab fa-whatsapp text-primary text-xl"></i>
								<a
									href="https://wa.me/96170121188"
									className="text-gray-300 hover:text-primary transition-colors"
								>
									+961 70 121 188
								</a>
							</div>
							<div className="flex items-center space-x-4">
								<i className="fas fa-map-marker-alt text-primary text-xl"></i>
								<span className="text-gray-300">
									Beit El Chaar, Lebanon
								</span>
							</div>
						</div>
					</div>

					<div
						className={`${
							isAboutVisible ? "animate-slide-down" : "opacity-0"
						}`}
					>
						<img
							src="/public/assets/images/deejoe-portrait.jpg"
							alt="DeeJoe professional DJ portrait"
							className="rounded-2xl shadow-2xl w-full h-auto neon-glow"
						/>
					</div>
				</div>
			</section>

			{/* Experience Section */}
			<section
				id="experience"
				ref={experienceRef}
				className="py-20 px-4 bg-gradient-to-b from-transparent to-[hsl(0,0%,10%)]/50"
			>
				<div className="max-w-7xl mx-auto">
					<h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-primary animate-slide-up">
						Experience & Venues
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Experience Cards */}
						<div className="glass-card rounded-xl p-6 animate-slide-up">
							<div className="flex items-center mb-4">
								<i className="fas fa-music text-secondary text-2xl mr-3"></i>
								<h3 className="font-poppins font-bold text-xl">
									Lotus Venue
								</h3>
							</div>
							<p className="text-gray-300 mb-2">
								Resident DJ • 2022-Present
							</p>
							<p className="text-gray-400 mb-4">
								Jardin Des Lys, Byblos Palace
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="bg-[hsl(25,100%,50%)]/20 text-primary px-3 py-1 rounded-full text-sm">
									Deep House
								</span>
								<span className="bg-[hsl(30,100%,60%)]/20 text-secondary px-3 py-1 rounded-full text-sm">
									Bazaar Fusion
								</span>
							</div>
						</div>

						<div
							className="glass-card rounded-xl p-6 animate-slide-up"
							style={{ animationDelay: "0.1s" }}
						>
							<div className="flex items-center mb-4">
								<i className="fas fa-cocktail text-secondary text-2xl mr-3"></i>
								<h3 className="font-poppins font-bold text-xl">
									Twenty Two
								</h3>
							</div>
							<p className="text-gray-300 mb-2">
								Guest DJ • 2021-2023
							</p>
							<p className="text-gray-400 mb-4">
								Gemmayze District
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="bg-[hsl(25,100%,50%)]/20 text-primary px-3 py-1 rounded-full text-sm">
									Tech House
								</span>
								<span className="bg-[hsl(30,100%,60%)]/20 text-secondary px-3 py-1 rounded-full text-sm">
									Progressive
								</span>
							</div>
						</div>

						<div
							className="glass-card rounded-xl p-6 animate-slide-up"
							style={{ animationDelay: "0.2s" }}
						>
							<div className="flex items-center mb-4">
								<i className="fas fa-umbrella-beach text-secondary text-2xl mr-3"></i>
								<h3 className="font-poppins font-bold text-xl">
									Azure Beach Resort
								</h3>
							</div>
							<p className="text-gray-300 mb-2">
								Summer Resident • 2022
							</p>
							<p className="text-gray-400 mb-4">Coastal Venue</p>
							<div className="flex flex-wrap gap-2">
								<span className="bg-[hsl(25,100%,50%)]/20 text-primary px-3 py-1 rounded-full text-sm">
									Beach House
								</span>
								<span className="bg-[hsl(30,100%,60%)]/20 text-secondary px-3 py-1 rounded-full text-sm">
									Chill Out
								</span>
							</div>
						</div>

						<div
							className="glass-card rounded-xl p-6 animate-slide-up"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="flex items-center mb-4">
								<i className="fas fa-water text-secondary text-2xl mr-3"></i>
								<h3 className="font-poppins font-bold text-xl">
									Sea Level
								</h3>
							</div>
							<p className="text-gray-300 mb-2">
								Resident DJ • 2021-2022
							</p>
							<p className="text-gray-400 mb-4">Jounieh</p>
							<div className="flex flex-wrap gap-2">
								<span className="bg-[hsl(25,100%,50%)]/20 text-primary px-3 py-1 rounded-full text-sm">
									Commercial
								</span>
								<span className="bg-[hsl(30,100%,60%)]/20 text-secondary px-3 py-1 rounded-full text-sm">
									Open Format
								</span>
							</div>
						</div>

						<div
							className="glass-card rounded-xl p-6 animate-slide-up"
							style={{ animationDelay: "0.4s" }}
						>
							<div className="flex items-center mb-4">
								<i className="fas fa-hotel text-secondary text-2xl mr-3"></i>
								<h3 className="font-poppins font-bold text-xl">
									Hemingway's
								</h3>
							</div>
							<p className="text-gray-300 mb-2">
								Guest DJ • 2020-2023
							</p>
							<p className="text-gray-400 mb-4">
								Movenpick Beirut
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="bg-[hsl(25,100%,50%)]/20 text-primary px-3 py-1 rounded-full text-sm">
									Lounge
								</span>
								<span className="bg-[hsl(30,100%,60%)]/20 text-secondary px-3 py-1 rounded-full text-sm">
									Jazz Fusion
								</span>
							</div>
						</div>

						<div
							className="glass-card rounded-xl p-6 animate-slide-up"
							style={{ animationDelay: "0.5s" }}
						>
							<div className="flex items-center mb-4">
								<i className="fas fa-heart text-secondary text-2xl mr-3"></i>
								<h3 className="font-poppins font-bold text-xl">
									Private Events
								</h3>
							</div>
							<p className="text-gray-300 mb-2">
								Wedding Specialist • 2020-Present
							</p>
							<p className="text-gray-400 mb-4">
								La Chicane, Villa Srour, Movenpick
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="bg-[hsl(25,100%,50%)]/20 text-primary px-3 py-1 rounded-full text-sm">
									Wedding
								</span>
								<span className="bg-[hsl(30,100%,60%)]/20 text-secondary px-3 py-1 rounded-full text-sm">
									Corporate
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section
			<section
				id="gallery"
				ref={galleryRef}
				className="py-20 px-4 max-w-7xl mx-auto"
			>
				<h2 className="font-poppins font-bold text-4xl md:text-5xl text-center mb-16 text-primary animate-slide-up">
					Performance Gallery
				</h2>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{galleryImages.map((image, index) => (
						<div
							key={index}
							className="gallery-item cursor-pointer overflow-hidden rounded-xl group animate-slide-up"
							style={{ animationDelay: `${index * 0.1}s` }}
							onClick={() => setSelectedImage(index)}
						>
							<img
								src={image.thumb}
								alt={image.alt}
								className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
							/>
						</div>
					))}
				</div>
			</section>

			{/* Gallery Modal
			<GalleryModal
				images={galleryImages}
				selectedIndex={selectedImage}
				onClose={() => setSelectedImage(null)}
			/> */}

			{/* Social Media Section */}
			<section
				ref={socialRef}
				className="py-20 px-4 bg-gradient-to-r from-[hsl(0,0%,10%)] to-[hsl(0,0%,18%)]"
			>
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
					<div
						className={`${
							isSocialVisible ? "animate-slide-down" : "opacity-0"
						}`}
					>
						<img
							src="/public/assets/images/deejoe-socialmedia.jpg"
							alt="DeeJoe social media engagement"
							className="rounded-2xl shadow-2xl w-full h-auto neon-glow"
						/>
					</div>
					<div
						className={`text-center ${
							isSocialVisible ? "animate-slide-up" : "opacity-0"
						}`}
					>
						<h2 className="font-poppins font-bold text-4xl md:text-5xl mb-8 text-primary animate-slide-up">
							Follow the Beat
						</h2>
						<p className="text-xl text-gray-300 mb-12 animate-slide-up">
							Stay connected for the latest mixes, events, and
							behind-the-scenes content
						</p>

						<div className="flex justify-center space-x-8">
							<a
								href="https://instagram.com/deejoe._"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col items-center space-y-3 p-6 w-40 bg-[hsl(0,0%,10%)] glass-card rounded-xl hover:neon-glow transition-all duration-300"
							>
								<i className="fab fa-instagram text-4xl text-secondary group-hover:scale-110 transition-transform"></i>
								<span className="text-sm text-gray-400">
									Instagram
								</span>
								<span className="text-gray-300 font-medium">
									@deejoe._
								</span>
							</a>

							<a
								href="https://play.anghami.com/artist/20108346"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex flex-col items-center space-y-3 p-6 w-40 bg-[hsl(0,0%,10%)] glass-card rounded-xl hover:neon-glow transition-all duration-300"
								style={{ animationDelay: "0.1s" }}
							>
								<i className="fas fa-music text-4xl text-secondary group-hover:scale-110 transition-transform"></i>
								<span className="text-sm text-gray-400">
									Anghami
								</span>
								<span className="text-gray-300 font-medium">
									DeeJoe
								</span>
							</a>
						</div>

						{/* Embedded Anghami Player */}
						<div
							className="mt-12 max-w-lg mx-auto animate-slide-up"
							style={{ animationDelay: "0.2s" }}
						>
							<div className="glass-card rounded-xl p-6">
								<h3 className="font-poppins font-bold text-xl mb-4 text-secondary text-center">
									Latest Track
								</h3>
								<iframe
									src="https://widget.anghami.com/song/1146922507/?theme=fulldark&layout=wide&lang=en"
									width="100%"
									height="auto"
									className="rounded-lg"
								></iframe>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section
				id="contact"
				ref={contactRef}
				className="py-20 px-4 max-w-7xl mx-auto"
			>
				<div className="grid lg:grid-cols-2 gap-12">
					<div className="animate-slide-up">
						<h2 className="font-poppins font-bold text-4xl md:text-5xl mb-8 text-primary">
							Let's Create Magic
						</h2>
						<p className="text-xl text-gray-300 mb-8">
							Ready to elevate your event? Let's discuss how we
							can make your celebration unforgettable.
						</p>

						<div className="space-y-6">
							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-[hsl(25,100%,50%)]/20 rounded-full flex items-center justify-center">
									<i className="fab fa-whatsapp text-secondary text-xl"></i>
								</div>
								<div>
									<p className="text-white font-medium">
										WhatsApp
									</p>
									<a
										href="https://wa.me/96170121188"
										className="text-gray-300 hover:text-secondary transition-colors"
									>
										+961 70 121 188
									</a>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-[hsl(25,100%,50%)]/20 rounded-full flex items-center justify-center">
									<i className="fas fa-envelope text-secondary text-xl"></i>
								</div>
								<div>
									<p className="text-white font-medium">
										Email
									</p>
									<a
										href="mailto:deejoe.lb@gmail.com"
										className="text-gray-300 hover:text-secondary transition-colors"
									>
										deejoe.lb@gmail.com
									</a>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-[hsl(25,100%,50%)]/20 rounded-full flex items-center justify-center">
									<i className="fas fa-map-marker-alt text-secondary text-xl"></i>
								</div>
								<div>
									<p className="text-white font-medium">
										Location
									</p>
									<p className="text-gray-300">
										Beit El Chaar, Lebanon
									</p>
								</div>
							</div>
						</div>
					</div>

					<div
						className="glass-card rounded-xl p-8 animate-slide-up"
						style={{ animationDelay: "0.2s" }}
					>
						<ContactForm />
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-[hsl(0,0%,18%)] py-12 px-4 border-t border-[hsl(25,100%,50%)]/20">
				<div className="max-w-7xl mx-auto text-center">
					<div className="font-poppins font-bold text-2xl text-primary mb-4">
						DeeJoe
					</div>
					<p className="text-gray-400 mb-4">
						Professional DJ • Lebanon
					</p>
					<p className="text-gray-500 text-sm">
						© 2025 DeeJoe. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
