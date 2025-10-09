import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { SERVICES } from '@/lib/data/services'
import { TaxCreditBanner } from '@/components/sections/shared/tax-credit-banner'
import { ArrowRight } from 'lucide-react'

export function ServicesPreviewSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Mes Prestations d'Entretien de Jardin</h2>
					<p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
						Toutes mes prestations bénéficient de 50% de réduction d'impôt
					</p>
					<div className="flex justify-center">
						<TaxCreditBanner variant="default" />
					</div>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
					{SERVICES.map(service => (
						<ServiceCard key={service.id} service={service} showImage={true} />
					))}
				</div>

				{/* CTA */}
				<div className="text-center">
					<Button size="lg" variant="primary" asChild>
						<Link href="/prestations">
							Voir Toutes Mes Prestations
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
