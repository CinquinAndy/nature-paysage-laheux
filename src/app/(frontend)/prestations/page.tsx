import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { TaxCreditEligibility } from '@/components/sections/shared/tax-credit-eligibility'
import { CtaShader } from '@/components/ui/cta-shader'
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

			{/* CTA Section with Shader */}
			<CtaShader
				title="Une Prestation Vous Intéresse ?"
				description="Parlons de votre projet de jardin. Demandez votre devis gratuit et bénéficiez de 50% de crédit d'impôt sur toutes mes prestations."
				buttonText="Demander un Devis Gratuit"
				buttonUrl="/contact"
				items={[
					'Devis gratuit après visite',
					'Conseil personnalisé',
					'Réponse sous 48h',
					"50% de crédit d'impôt garanti",
				]}
				shaderVariant="energy"
			/>
		</div>
	)
}
