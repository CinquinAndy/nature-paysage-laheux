import { FeatureCarousel } from '@/components/ui/animated-feature-carousel'

export function TaxCreditSection() {
	// Images for the carousel - using local images from public/usable/
	const images = {
		alt: "Processus de crédit d'impôt",
		step1img1: '/usable/IMG_20231117_093237.jpg',
		step1img2: '/usable/IMG_20240310_161440.jpg',
		step2img1: '/usable/IMG_20250402_142527.jpg',
		step2img2: '/usable/IMG_20250803_122326_1.jpg',
		step3img: '/usable/IMG_20250803_123919.jpg',
		step4img: '/usable/PXL_20251006_080220831.jpg',
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
