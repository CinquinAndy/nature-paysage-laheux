import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import { FAQ_SHORT } from '@/lib/data/faq'
import { ArrowRight } from 'lucide-react'

export function FaqShortSection() {
	const faqItems = FAQ_SHORT.map(item => ({
		value: item.id,
		title: item.question,
		children: item.answer,
	}))

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-left mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h2>
					<p className="text-lg text-muted-foreground max-w-2xl">
						Réponses aux questions les plus courantes sur mes services
					</p>
				</div>

				<div className="max-w-3xl mx-auto">
					{/* FAQ Accordion */}
					<Accordion items={faqItems} type="single" className="mb-8" />

					{/* CTA */}
					<div className="text-center mt-10">
						<p className="text-muted-foreground mb-4">D'autres questions ?</p>
						<Button variant="outline" asChild>
							<Link href="/faq">
								Voir Toutes les Questions
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
