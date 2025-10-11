import { Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { TaxCreditEligibility } from '@/components/sections/shared/tax-credit-eligibility'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/data/services'

export const metadata: Metadata = {
	title: "Mes Prestations d'Eco-Paysagiste | Jean-Luc Laheux - Loire-Atlantique",
	description:
		"Tonte écologique, désherbage naturel, taille raisonnée, potager en permaculture. Toutes mes prestations bénéficient de 50% de crédit d'impôt. Devis gratuit.",
}

export default function PrestationsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title="Mes Prestations Écologiques"
				imageSrc="/usable/IMG_20250803_123919.jpg"
				imageAlt="Prestations paysagistes écologiques"
			/>

			{/* Services Grid */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{SERVICES.map(service => (
							<Link
								key={service.id}
								href={`/prestations/${service.id}`}
								className="hover:scale-105 transition-all duration-300 cursor-pointer"
							>
								<ServiceCard key={service.id} service={service} showImage={true} ctaText="Voir les détails" />
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Tax Credit Eligibility Section with Tabs */}
			<TaxCreditEligibility />

			{/* CTA Section */}
			<section className="py-16 md:py-24 bg-primary/5">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">Une Prestation Vous Intéresse ?</h2>
						<p className="text-xl text-muted-foreground mb-8">Parlons de votre projet de jardin</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="primary" asChild>
								<Link href="/contact">Demander un Devis Gratuit</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="tel:0631043445">
									<Phone className="mr-2 h-5 w-5" />
									06 31 04 34 45
								</Link>
							</Button>
						</div>
						<div className="mt-8 text-sm text-muted-foreground space-y-1">
							<p>✓ Devis gratuit après visite</p>
							<p>✓ Conseil personnalisé</p>
							<p>✓ 50% de crédit d'impôt garanti</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
