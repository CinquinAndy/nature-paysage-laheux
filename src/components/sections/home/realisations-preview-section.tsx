import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const realisationImages = [
	{ src: '/usable/IMG_20231117_093237.jpg', alt: 'Entretien de pelouse écologique' },
	{ src: '/usable/IMG_20240310_161440.jpg', alt: 'Taille de haies naturelle' },
	{ src: '/usable/IMG_20250402_142527.jpg', alt: 'Aménagement de jardin' },
	{ src: '/usable/IMG_20250803_122326_1.jpg', alt: 'Potager en permaculture' },
	{ src: '/usable/IMG_20250803_123919.jpg', alt: 'Massif fleuri' },
	{ src: '/usable/PXL_20251006_080220831.jpg', alt: 'Jardin entretenu' },
]

export function RealisationsPreviewSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Découvrez Mes Réalisations</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Exemples de jardins entretenus avec passion et respect de la nature
					</p>
				</div>

				{/* Image Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
					{realisationImages.map((image, index) => (
						<Link
							key={index}
							href="/realisations"
							className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
						>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className="object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							{/* Overlay on hover */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-4 left-4 right-4">
									<p className="text-white text-sm font-medium">{image.alt}</p>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* CTA */}
				<div className="text-center">
					<Button size="lg" variant="outline" asChild>
						<Link href="/realisations">
							Voir Toutes Mes Réalisations
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
