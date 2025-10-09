import type { Metadata } from 'next'
import { Accordion } from '@/components/ui/accordion'
import { FAQ_ITEMS, FAQ_CATEGORIES } from '@/lib/data/faq'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Phone } from 'lucide-react'

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
			<section className="bg-gradient-to-br from-primary/10 to-green-50 dark:from-primary/5 dark:to-green-950 py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Questions Fréquentes</h1>
						<p className="text-xl text-muted-foreground">
							Tout ce que vous devez savoir sur mes services et le crédit d'impôt
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Sections */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto space-y-16">
						{faqByCategory.map(({ category, label, items }) => (
							<div key={category}>
								<h2 className="text-3xl font-bold mb-8">{label}</h2>
								<Accordion
									items={items.map(item => ({
										value: item.id,
										title: item.question,
										children: item.answer,
									}))}
									type="single"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

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
									06 31 04 34 34 45
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
