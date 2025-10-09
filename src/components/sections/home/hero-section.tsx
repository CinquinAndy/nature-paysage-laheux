import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TaxCreditBanner } from '@/components/sections/shared/tax-credit-banner'
import { ArrowRight, Phone } from 'lucide-react'

export function HeroSection() {
	return (
		<section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/usable/bg.jpg"
					alt="Jardin paysagé en Loire-Atlantique"
					fill
					priority
					className="object-cover brightness-[0.65]"
					quality={90}
				/>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="max-w-4xl">
					{/* Badge */}
					<div className="mb-6 animate-fade-in-up">
						<TaxCreditBanner variant="compact" className="text-base sm:text-lg px-5 py-2.5" />
					</div>

					{/* Main Heading */}
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up animation-delay-100">
						<span className="relative inline-block">
							<span className="relative z-10">Jean-Luc Laheux</span>
							<svg
								className="absolute -inset-x-2 -inset-y-1 -z-10 opacity-90"
								viewBox="0 0 200 60"
								preserveAspectRatio="none"
							>
								<path
									d="M10,30 Q50,10 100,30 T190,30"
									fill="none"
									stroke="currentColor"
									strokeWidth="15"
									className="text-primary/40"
								/>
							</svg>
						</span>
						<br />
						<span className="text-white/95">Eco-Paysagiste à Monnières</span>
					</h1>

					{/* Subtitle */}
					<p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 font-medium animate-fade-in-up animation-delay-200">
						Pour un jardin florissant, agissez maintenant
					</p>
					<p className="text-base sm:text-lg md:text-xl text-green-200 mb-8 font-semibold animate-fade-in-up animation-delay-300">
						Avec 50% de crédit d'impôt
					</p>

					{/* Subtext */}
					<p className="text-base sm:text-lg text-white/80 mb-10 max-w-2xl animate-fade-in-up animation-delay-400">
						Entretien écologique de votre jardin en Loire-Atlantique. Une approche respectueuse de la nature et de votre
						budget.
					</p>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-500">
						<Button size="lg" variant="primary" className="text-base sm:text-lg px-8 py-6" asChild>
							<Link href="/contact">
								Demander un Devis Gratuit
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="text-base sm:text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
							asChild
						>
							<Link href="tel:0631043445">
								<Phone className="mr-2 h-5 w-5" />
								06 31 04 34 45
							</Link>
						</Button>
					</div>

					{/* Trust indicators */}
					<div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70 animate-fade-in-up animation-delay-600">
						<div className="flex items-center gap-2">
							<span className="text-green-400">✓</span>
							<span>Réponse sous 48h</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-green-400">✓</span>
							<span>Devis gratuit</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-green-400">✓</span>
							<span>Sans engagement</span>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
				<div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
					<div className="w-1.5 h-3 bg-white/60 rounded-full mx-auto animate-scroll-down" />
				</div>
			</div>
		</section>
	)
}
