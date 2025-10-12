import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { RealisationCard } from '@/components/sections/shared/realisation-card'
import { CtaShader } from '@/components/ui/cta-shader'
import { getMediaUrl, getRealisations, getRealisationsPageData } from '@/lib/payload'
import type { RealisationsPage as RealisationsPageType } from '@/payload-types'

export const metadata: Metadata = {
	title: 'Mes Réalisations de Jardins Écologiques | Jean-Luc Laheux',
	description:
		"Découvrez mes réalisations d'entretien de jardin écologique en Loire-Atlantique. Photos avant-après, projets de potagers, tailles, rénovations naturelles.",
}

/**
 * Add Lorem Ipsum fallback values to realisations page data to easily identify missing content
 */
function addLoremFallbacks(pageData: RealisationsPageType): RealisationsPageType {
	return {
		...pageData,
		hero: {
			...pageData.hero,
			title: pageData.hero?.title || '🚨 LOREM: Mes Réalisations en Loire-Atlantique',
			image: pageData.hero?.image || null,
		},
		introduction: {
			...pageData.introduction,
			paragraph1:
				pageData.introduction?.paragraph1 ||
				'🚨 LOREM: Chaque jardin est unique et raconte une histoire. Ici, je partage avec vous mes interventions, mes découvertes et mes apprentissages au fil des saisons. Vous y trouverez des exemples concrets de ce que je réalise : transformations de jardins, créations de potagers, entretiens réguliers...',
			paragraph2: pageData.introduction?.paragraph2 || null,
		},
		ctaSection: {
			...pageData.ctaSection,
			title: pageData.ctaSection?.title || '🚨 LOREM: Envie du Même Résultat Pour Votre Jardin ?',
			description:
				pageData.ctaSection?.description ||
				'🚨 LOREM: Chaque projet est unique. Parlons du vôtre et donnons vie à votre jardin écologique.',
			buttonText: pageData.ctaSection?.buttonText || '🚨 LOREM: Demander un Devis Gratuit',
			buttonUrl: pageData.ctaSection?.buttonUrl || '/contact',
			benefits:
				pageData.ctaSection?.benefits && pageData.ctaSection.benefits.length > 0
					? pageData.ctaSection.benefits.map((b, i) => ({
							...b,
							benefit: b.benefit || `🚨 LOREM: Avantage ${i + 1}`,
						}))
					: [
							{ benefit: '🚨 LOREM: Visite et conseil gratuits', id: 'lorem-benefit-1' },
							{ benefit: '🚨 LOREM: Approche écologique garantie', id: 'lorem-benefit-2' },
							{ benefit: '🚨 LOREM: Réponse sous 48h', id: 'lorem-benefit-3' },
							{ benefit: "🚨 LOREM: 50% de crédit d'impôt sur toutes mes prestations", id: 'lorem-benefit-4' },
						],
		},
	}
}

export default async function RealisationsListPage() {
	// Fetch all data from Payload CMS
	const [pageDataRaw, realisations] = await Promise.all([getRealisationsPageData(), getRealisations()])

	// Add Lorem Ipsum fallbacks to easily identify missing content
	const pageData = addLoremFallbacks(pageDataRaw)

	const heroImageUrl = getMediaUrl(pageData.hero?.image)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={pageData.hero?.title || 'Mes Réalisations en Loire-Atlantique'}
				imageSrc={heroImageUrl || '/usable/IMG_20250803_122326_1.jpg'}
				imageAlt="Réalisations de jardins écologiques en Loire-Atlantique"
			/>

			{/* Introduction */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						{pageData.introduction?.paragraph1 && (
							<p className="text-lg text-muted-foreground leading-relaxed">{pageData.introduction.paragraph1}</p>
						)}
						{pageData.introduction?.paragraph2 && (
							<p className="text-base text-muted-foreground mt-4">{pageData.introduction.paragraph2}</p>
						)}
					</div>
				</div>
			</section>

			{/* Gallery */}
			<section className="py-8 md:py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{realisations.map(realisation => (
							<Link
								key={realisation.id}
								href={`/realisations/${realisation.slug}`}
								className="hover:scale-105 transition-all duration-300 cursor-pointer"
							>
								<RealisationCard realisation={realisation} />
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section with Shader */}
			<CtaShader
				title={pageData.ctaSection?.title || 'Envie du Même Résultat Pour Votre Jardin ?'}
				description={pageData.ctaSection?.description || 'Chaque projet est unique. Parlons du vôtre.'}
				buttonText={pageData.ctaSection?.buttonText || 'Demander un Devis Gratuit'}
				buttonUrl={pageData.ctaSection?.buttonUrl || '/contact'}
				items={
					pageData.ctaSection?.benefits?.map(b => b.benefit || '') || [
						'Visite et conseil gratuits',
						'Approche écologique garantie',
						'Réponse sous 48h',
						"50% de crédit d'impôt sur toutes mes prestations",
					]
				}
			/>
		</div>
	)
}
