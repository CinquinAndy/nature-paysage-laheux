import { Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'Mes Réalisations de Jardins Écologiques | Jean-Luc Laheux',
	description:
		"Découvrez mes réalisations d'entretien de jardin écologique en Loire-Atlantique. Photos avant-après, projets de potagers, tailles, rénovations naturelles.",
}

const realisations = [
	{ src: '/usable/IMG_20231117_093237.jpg', title: 'Entretien de pelouse naturelle', location: 'Monnières' },
	{ src: '/usable/IMG_20240310_161440.jpg', title: 'Taille raisonnée de haies', location: 'Vignoble Nantais' },
	{ src: '/usable/IMG_20250402_142527.jpg', title: 'Aménagement paysager écologique', location: 'Clisson' },
	{ src: '/usable/IMG_20250803_122326_1.jpg', title: 'Potager en permaculture', location: 'La Haie-Fouassière' },
	{ src: '/usable/IMG_20250803_123919.jpg', title: 'Entretien de massifs fleuris', location: 'Haute-Goulaine' },
	{ src: '/usable/PXL_20251006_080220831.jpg', title: 'Jardin naturel entretenu', location: 'Vallée de la Loire' },
]

export default function RealisationsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/10 to-green-50 dark:from-primary/5 dark:to-green-950 py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Mes Réalisations en Loire-Atlantique</h1>
						<p className="text-xl text-muted-foreground">
							Découvrez des jardins entretenus avec passion et respect de la nature
						</p>
					</div>
				</div>
			</section>

			{/* Introduction */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-lg text-muted-foreground leading-relaxed">
							Chaque jardin est unique et raconte une histoire. Ici, je partage avec vous mes interventions, mes
							découvertes et mes apprentissages au fil des saisons. Vous y trouverez des exemples concrets de ce que je
							réalise : transformations de jardins, créations de potagers, entretiens réguliers...
						</p>
						<p className="text-base text-muted-foreground mt-4">
							<strong className="text-primary">Tous ces projets ont bénéficié du crédit d'impôt de 50%</strong> pour mes
							clients.
						</p>
					</div>
				</div>
			</section>

			{/* Gallery */}
			<section className="py-8 md:py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{realisations.map(realisation => (
							<div
								key={realisation.src}
								className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
							>
								<Image
									src={realisation.src}
									alt={realisation.title}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								{/* Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
									<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
										<h3 className="text-xl font-bold mb-1">{realisation.title}</h3>
										<p className="text-sm text-white/80">{realisation.location}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 md:py-24 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4">Envie du Même Résultat Pour Votre Jardin ?</h2>
						<p className="text-lg text-muted-foreground mb-8">Chaque projet est unique. Parlons du vôtre.</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="primary" asChild>
								<Link href="/contact">Demander un Devis Gratuit</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<a href="tel:0631043445">
									<Phone className="mr-2 h-5 w-5" />
									06 31 04 34 45
								</a>
							</Button>
						</div>
						<div className="mt-8 text-sm text-muted-foreground space-y-1">
							<p>✓ Visite et conseil gratuits</p>
							<p>✓ Approche écologique garantie</p>
							<p>✓ 50% de crédit d'impôt sur toutes mes prestations</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
