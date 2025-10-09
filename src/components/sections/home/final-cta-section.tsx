import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react'

const benefits = [
	'Réponse sous 48h',
	'Devis gratuit et sans engagement',
	'Visite et conseil gratuits',
	"50% de crédit d'impôt garanti",
]

export function FinalCtaSection() {
	return (
		<section className="relative py-16 md:py-24 overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image src="/usable/bg.jpg" alt="Jardin verdoyant" fill className="object-cover brightness-[0.3]" />
				<div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-green-900/60" />
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="max-w-3xl mx-auto text-center">
					{/* Heading */}
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
						Prêt à Redonner Vie à Votre Jardin ?
					</h2>
					<p className="text-xl text-white/90 mb-10">
						Demandez votre devis gratuit et profitez de 50% de réduction d'impôt
					</p>

					{/* Benefits List */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
						{benefits.map((benefit, index) => (
							<div
								key={index}
								className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white"
							>
								<CheckCircle2 className="h-5 w-5 text-green-300 shrink-0" />
								<span className="text-sm font-medium">{benefit}</span>
							</div>
						))}
					</div>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" variant="primary" className="text-lg px-8 py-6 shadow-xl" asChild>
							<Link href="/contact">
								Demander un Devis Gratuit
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
						<Button size="lg" className="text-lg px-8 py-6 bg-white hover:bg-white/90 text-primary shadow-xl" asChild>
							<a href="tel:0631043445">
								<Phone className="mr-2 h-5 w-5" />
								06 31 04 34 45
							</a>
						</Button>
					</div>

					{/* Small note */}
					<p className="text-sm text-white/70 mt-8">Intervention dans le Vignoble Nantais et la Vallée de la Loire</p>
				</div>
			</div>
		</section>
	)
}
