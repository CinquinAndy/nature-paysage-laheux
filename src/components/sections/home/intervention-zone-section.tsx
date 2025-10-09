import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CONTACT_INFO } from '@/lib/data/contact-info'

export function InterventionZoneSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-left mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Zone d'Intervention en Loire-Atlantique</h2>
					<p className="text-lg text-muted-foreground max-w-2xl">
						Basé à {CONTACT_INFO.address.city}, j'interviens dans le Vignoble Nantais et les communes environnantes
					</p>
				</div>

				<div className="max-w-4xl mx-auto">

					{/* Zone Info Card */}
					<div className="bg-primary/5 rounded-2xl p-8 md:p-10 border-2 border-primary/20 mb-8">
						<div className="flex items-start gap-4 mb-6">
							<div className="rounded-full bg-primary/10 p-3">
								<MapPin className="h-6 w-6 text-primary" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">{CONTACT_INFO.interventionZone.radius}</h3>
								<p className="text-muted-foreground">{CONTACT_INFO.address.city} et ses alentours</p>
							</div>
						</div>

						{/* Communes Grid */}
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{CONTACT_INFO.interventionZone.communes.map(commune => (
								<div
									key={commune}
									className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-primary/5 transition-colors"
								>
									<span className="text-primary">•</span>
									<span>{commune}</span>
								</div>
							))}
						</div>
					</div>

					{/* CTA */}
					<div className="text-center bg-muted/50 rounded-xl p-6">
						<p className="text-lg font-medium mb-4">
							N'hésitez pas à me contacter pour vérifier si j'interviens dans votre secteur
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button variant="primary" asChild>
								<Link href="/contact">Demander un Devis</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="tel:0631043445">
									<Phone className="mr-2 h-4 w-4" />
									06 31 04 34 45
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
