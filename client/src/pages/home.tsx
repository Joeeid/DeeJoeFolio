import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { UpcomingEvents } from "@/components/upcoming-events";
import { Testimonials } from "@/components/testimonials";
import { Residencies } from "@/components/residencies";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function Home() {
	useEffect(() => {
		// Handle initial hash in URL
		const handleInitialHash = () => {
			const hash = window.location.hash.slice(1); // Remove the # symbol
			if (hash) {
				const element = document.getElementById(hash);
				if (element) {
					setTimeout(() => {
						const navHeight = 80;
						const elementPosition =
							element.getBoundingClientRect().top;
						const offsetPosition =
							elementPosition + window.pageYOffset - navHeight;

						window.scrollTo({
							top: offsetPosition,
							behavior: "smooth",
						});
					}, 100);
				}
			}
			window.history.pushState(null, "", window.location.pathname);
		};

		handleInitialHash();
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			// Update URL hash
			window.history.pushState(null, "", `#${sectionId}`);

			const navHeight = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - navHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	const scrollToContactForm = () => {
		const contactForm = document.querySelector("#contact-form");
		if (contactForm) {
			// Update URL hash
			window.history.pushState(null, "", "#contact");

			const navHeight = 80;
			const elementPosition = contactForm.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - navHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Hero Section */}
			<section
				id="home"
				className="min-h-screen flex items-center justify-center relative overflow-hidden"
			>
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-[center_top_15%] bg-no-repeat z-0"
					style={{
						backgroundImage:
							'url("/assets/images/hero-bg.jpg")',
					}}
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background z-10" />

				<div className="container mx-auto px-4 py-32 relative z-20">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="max-w-3xl mx-auto text-center"
					>
						<motion.h1
							variants={fadeIn}
							className="text-5xl md:text-7xl mb-6 text-gradient animate-pulse-slow font-salvar"
						>
							DEEJOE
						</motion.h1>
						<motion.p
							variants={fadeIn}
							className="text-xl md:text-2xl text-foreground/80 mb-8"
						>
							Professional DJ & Music Producer
						</motion.p>
						<motion.div
							variants={fadeIn}
							className="flex justify-center gap-4"
						>
							<Button
								onClick={scrollToContactForm}
								className="bg-[#ff3b3b] hover:bg-[#e62e2e] text-white px-8 py-6 text-lg hover-glow"
							>
								Book Now
							</Button>
							<Button
								onClick={() => scrollToSection("experience")}
								variant="outline"
								className="border-[#ff3b3b] text-[#ff3b3b] bg-transparent hover:bg-[#ff3b3b]/10 px-8 py-6 text-lg"
							>
								Where to find me
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a0a] to-[#0f0f0f]" />
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="max-w-6xl mx-auto"
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-12 text-center"
						>
							About DeeJoe
						</motion.h2>
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<motion.div
								variants={fadeIn}
								className="prose prose-lg text-foreground"
							>
								<p className="text-lg leading-relaxed">
									With over a decade of experience in the
									music industry, DeeJoe has established
									himself as one of Lebanon's premier Open
									Format DJs. Specializing in creating
									unforgettable experiences through music, he
									has performed at esteemed venues and events
									across the country.
								</p>
								<p className="text-lg leading-relaxed">
									His unique style blends various genres, from
									house and techno to arabic commercial hits,
									ensuring every event is a memorable
									celebration. Whether it's a wedding,
									corporate event, or club night, DeeJoe
									brings energy and professionalism to every
									performance.
								</p>
							</motion.div>
							<motion.div
								variants={fadeIn}
								className="relative rounded-lg overflow-hidden hover-card max-w-md mx-auto"
							>
								<img
									src="/assets/images/deejoe-portrait.jpg"
									alt="DeeJoe professional portrait"
									className="w-full h-auto rounded-lg"
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Experience Section */}
			<section id="experience" className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#ff3b3b]/10 to-[#0a0a0a]" />
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="text-center mb-12"
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-4 text-white"
						>
							Current Residencies
						</motion.h2>
						<motion.p
							variants={fadeIn}
							className="text-white/90 max-w-2xl mx-auto"
						>
							From residencies to special events, I bring energy
							and expertise to every performance.
						</motion.p>
					</motion.div>
					<Residencies />
					<div className="text-center mt-8">
						<Link to="/experience">
							<Button
								variant="outline"
								className="border-white text-white hover:bg-white/10"
							>
								View Full Experience
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Events Section */}
			<section id="events" className="py-20 bg-background ">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-12 text-center"
						>
							Upcoming Events
						</motion.h2>
						<UpcomingEvents />
					</motion.div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section
				id="testimonials"
				className="py-20 relative overflow-hidden"
			>
				<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#ff6b6b]/5 to-[#0f0f0f]" />
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-12 text-center"
						>
							Client Testimonials
						</motion.h2>
						<Testimonials />
					</motion.div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#ff8c8c]/5 to-background" />
				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainer}
						className="max-w-6xl mx-auto"
					>
						<motion.h2
							variants={fadeIn}
							className="text-3xl md:text-4xl font-bold mb-8 text-center"
						>
							Get in Touch
						</motion.h2>
						<motion.p
							variants={fadeIn}
							className="text-center text-foreground/80 mb-12"
						>
							Ready to make your event special? Contact me to
							discuss your requirements.
						</motion.p>
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<motion.div variants={fadeIn} className="space-y-6">
								<motion.div
									variants={fadeIn}
									className="relative rounded-lg overflow-hidden hover-card max-w-md mx-auto"
									animate={{ y: [0, -10, 0] }}
								>
									<img
										src="/assets/images/deejoe-socialmedia.jpg"
										alt="DeeJoe social media"
										className="w-full h-auto rounded-lg"
									/>
								</motion.div>
							</motion.div>
							<motion.div variants={fadeIn} className="space-y-6">
								<motion.div
									className="gradient-border hover-card"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<div className="p-6">
										<h3 className="text-xl font-bold mb-4 text-gradient">
											Contact Information
										</h3>
										<div className="space-y-4">
											<p className="flex items-center text-foreground/80 hover:text-primary transition-colors">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 mr-3"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
													/>
												</svg>
												<a
													href="https://wa.me/96170121188"
													target="_blank"
													rel="noopener noreferrer"
													className="hover:text-primary transition-colors"
												>
													+961 70 121 188
												</a>
											</p>
											<p className="flex items-center text-foreground/80 hover:text-primary transition-colors">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 mr-3"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
													/>
												</svg>
												<a
													href="mailto:deejoe.lb@gmail.com"
													className="hover:text-primary transition-colors"
												>
													deejoe.lb@gmail.com
												</a>
											</p>
										</div>
									</div>
								</motion.div>
								<motion.div
									className="gradient-border hover-card"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<div className="p-6">
										<h3 className="text-xl font-bold mb-4 text-gradient">
											Follow Me
										</h3>
										<div className="flex space-x-6">
											<a
												href="https://www.instagram.com/deejoe._/"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground/80 hover:text-primary transition-colors flex items-center"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
													/>
												</svg>
												Instagram
											</a>
											<a
												href="https://www.anghami.com/artist/20108346"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground/80 hover:text-primary transition-colors flex items-center"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
													/>
												</svg>
												Anghami
											</a>
											<a
												href="https://soundcloud.com/deejoe-471494667"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground/80 hover:text-primary transition-colors flex items-center"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-5 h-5 mr-2"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
													/>
												</svg>
												SoundCloud
											</a>
										</div>
									</div>
								</motion.div>
								<motion.div
									variants={fadeIn}
									className="gradient-border hover-card"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<div id="contact-form">
										<ContactForm />
									</div>
								</motion.div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}