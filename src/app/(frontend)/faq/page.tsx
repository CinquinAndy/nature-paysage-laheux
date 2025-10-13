import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/faq/faq-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { CtaShader } from '@/components/ui/cta-shader'
import { getFaq, getFaqPageData, getMediaUrl } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'
import type { FaqPage } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
	const faqPage = await getFaqPageData()

	return generateSEOMetadata(faqPage, '/faq', {
		fallbackTitle: 'Questions Fréquentes | Jean-Luc Laheux Eco-Paysagiste',
		fallbackDescription:
			"Toutes vos questions sur le crédit d'impôt jardinage, mes méthodes écologiques et mes prestations en Loire-Atlantique. Réponses claires et transparentes.",
	})
}

/**
 * Category labels matching the FAQ collection schema
 */
const FAQ_CATEGORIES = {
	general: 'Questions Générales',
	services: 'Prestations & Services',
	tarifs: "Tarifs & Crédit d'Impôt",
	ecologie: 'Approche Écologique',
} as const

/**
 * Add Lorem Ipsum fallback values to easily identify missing content
 */
function addLoremFallbacks(faqPage: FaqPage): FaqPage {
	return {
		...faqPage,
		hero: {
			...faqPage.hero,
			title: faqPage.hero?.title || '🚨 LOREM: Questions Fréquentes',
			image: faqPage.hero?.image || null,
		},
		ctaSection: {
			...faqPage.ctaSection,
			title: faqPage.ctaSection?.title || '🚨 LOREM: Une Autre Question ?',
			description:
				faqPage.ctaSection?.description ||
				"🚨 LOREM: N'hésitez pas à me contacter directement. Je vous répondrai avec plaisir et transparence.",
			buttonText: faqPage.ctaSection?.buttonText || '🚨 LOREM: Me Contacter',
			buttonUrl: faqPage.ctaSection?.buttonUrl || '/contact',
			benefits:
				faqPage.ctaSection?.benefits && faqPage.ctaSection.benefits.length > 0
					? faqPage.ctaSection.benefits
					: [
							{ benefit: '🚨 LOREM: Réponse garantie sous 48h', id: 'lorem-benefit-1' },
							{ benefit: '🚨 LOREM: Conseil personnalisé et gratuit', id: 'lorem-benefit-2' },
							{ benefit: '🚨 LOREM: Transparence totale sur mes méthodes', id: 'lorem-benefit-3' },
							{ benefit: "🚨 LOREM: 50% de crédit d'impôt sur toutes mes prestations", id: 'lorem-benefit-4' },
						],
		},
	}
}

export default async function Page() {
	// Fetch data from Payload CMS
	const [faqPageRaw, allFaqItems] = await Promise.all([getFaqPageData(), getFaq()])

	// Add Lorem Ipsum fallbacks
	const faqPage = addLoremFallbacks(faqPageRaw)

	// Group FAQ items by category
	const faqByCategory = Object.entries(FAQ_CATEGORIES).map(([key, label]) => {
		const categoryKey = key as 'general' | 'services' | 'tarifs' | 'ecologie'

		// Find custom description from Payload if provided
		const customDesc = faqPage.categoryDescriptions?.find(desc => desc.category === categoryKey)

		return {
			category: categoryKey,
			label,
			description: customDesc?.description || `Découvrez toutes les informations concernant ${label.toLowerCase()}`,
			items: allFaqItems.filter(item => item.category === categoryKey),
		}
	})

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={faqPage.hero?.title || 'Questions Fréquentes'}
				imageSrc={getMediaUrl(faqPage.hero?.image) || '/usable/IMG_20231117_093237.jpg'}
				imageAlt="Questions fréquentes sur les services d'éco-paysagisme"
			/>

			{/* FAQ Sections by Category */}
			{faqByCategory.map(({ category, label, description, items }) => (
				<FaqSection
					key={category}
					title={label}
					description={description}
					categoryLabel={label}
					items={items}
					showCta={false}
				/>
			))}

			{/* CTA Section with Shader */}
			<CtaShader
				title={faqPage.ctaSection?.title || 'Une Autre Question ?'}
				description={
					faqPage.ctaSection?.description ||
					"N'hésitez pas à me contacter directement. Je vous répondrai avec plaisir et transparence."
				}
				buttonText={faqPage.ctaSection?.buttonText || 'Me Contacter'}
				buttonUrl={faqPage.ctaSection?.buttonUrl || '/contact'}
				items={
					faqPage.ctaSection?.benefits?.map(b => b.benefit || '').filter(Boolean) || [
						'Réponse garantie sous 48h',
						'Conseil personnalisé et gratuit',
						'Transparence totale sur mes méthodes',
						"50% de crédit d'impôt sur toutes mes prestations",
					]
				}
			/>
		</div>
	)
}
