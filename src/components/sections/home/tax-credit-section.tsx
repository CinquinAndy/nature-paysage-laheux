import { FeatureCarousel } from '@/components/ui/animated-feature-carousel'

export function TaxCreditSection() {
	// Images pour le carrousel - utiliser des images d'Unsplash
	const images = {
		alt: "Processus de crédit d'impôt",
		step1img1: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1740&auto=format&fit=crop',
		step1img2: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1740&auto=format&fit=crop',
		step2img1: 'https://images.unsplash.com/photo-1554224311-beee460ae6fb?q=80&w=1661&auto=format&fit=crop',
		step2img2: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1674&auto=format&fit=crop',
		step3img: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1740&auto=format&fit=crop',
		step4img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1742&auto=format&fit=crop',
	}

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-left mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
						Comment Profiter de 50% de Réduction d'Impôt ?
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl">
						Un processus simple en 4 étapes pour économiser sur vos travaux de jardinage
					</p>
				</div>

				{/* Animated Feature Carousel */}
				<div className="mb-12">
					<FeatureCarousel image={images} />
				</div>
			</div>
		</section>
	)
}
