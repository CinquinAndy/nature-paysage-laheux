import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/data/services'

export function ServicesPreviewSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between">
					{/* Section Header */}
					<div className="text-left mb-12 md:mb-16">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Mes Prestations d'Entretien de Jardin</h2>
						<p className="text-lg text-muted-foreground mb-6 max-w-2xl">
							Toutes mes prestations bénéficient de 50% de réduction d'impôt
						</p>
					</div>
					{/* CTA */}
					<div className="text-center">
						<Button size="lg" variant="primary" asChild>
							<Link href="/prestations" className="flex items-center">
								Voir Toutes Mes Prestations
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
					{SERVICES.map(service => (
						<Link
							key={service.id}
							href={`/prestations/${service.id}`}
							className="hover:scale-105 transition-all duration-300 cursor-pointer"
						>
							<ServiceCard key={service.id} service={service} showImage={true} />
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
