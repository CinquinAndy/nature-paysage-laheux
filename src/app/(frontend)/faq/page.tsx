import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/faq/faq-section'
import { PageHero } from '@/components/sections/shared/page-hero'
import { CtaShader } from '@/components/ui/cta-shader'
import { FAQ_CATEGORIES, FAQ_ITEMS } from '@/lib/data/faq'

export const metadata: Metadata = {
	title: 'Questions Fréquentes | Jean-Luc Laheux Eco-Paysagiste',
	description:
		"Toutes vos questions sur le crédit d'impôt jardinage, mes méthodes écologiques et mes prestations en Loire-Atlantique. Réponses claires et transparentes.",
}

export default function FaqPage() {
	// Group FAQ items by category
	const faqByCategory = Object.entries(FAQ_CATEGORIES).map(([key, label]) => ({
		category: key,
		label,
		items: FAQ_ITEMS.filter(item => item.category === key),
	}))

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title="Questions Fréquentes"
				imageSrc="/usable/IMG_20231117_093237.jpg"
				imageAlt="Questions fréquentes sur les services d'éco-paysagisme"
			/>

			{/* FAQ Sections by Category */}
			{faqByCategory.map(({ category, label, items }) => (
				<FaqSection
					key={category}
					title={label}
					description={`Découvrez toutes les informations concernant ${label.toLowerCase()}`}
					categoryLabel={label}
					items={items}
					showCta={false}
				/>
			))}

			{/* CTA Section with Shader */}
			<CtaShader
				title="Une Autre Question ?"
				description="N'hésitez pas à me contacter directement. Je vous répondrai avec plaisir et transparence."
				buttonText="Me Contacter"
				buttonUrl="/contact"
				items={[
					'Réponse garantie sous 48h',
					'Conseil personnalisé et gratuit',
					'Transparence totale sur mes méthodes',
					"50% de crédit d'impôt sur toutes mes prestations",
				]}
			/>
		</div>
	)
}
