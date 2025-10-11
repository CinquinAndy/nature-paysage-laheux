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

			{/* CTA Section */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-4">Une Autre Question ?</h2>
						<p className="text-lg text-muted-foreground mb-8">N'hésitez pas à me contacter directement</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="primary" asChild>
								<Link href="/contact">Me Contacter</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="tel:0631043445">
									<Phone className="mr-2 h-5 w-5" />
									06 31 04 34 45
								</Link>
							</Button>
						</div>
						<p className="mt-6 text-sm text-muted-foreground">Réponse garantie sous 48h</p>
					</div>
				</div>
			</section>
		</div>
	)
}
