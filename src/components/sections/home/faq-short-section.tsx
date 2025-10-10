'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FAQ_SHORT } from '@/lib/data/faq'

export function FaqShortSection() {
	return (
		<section className="py-20 lg:py-40 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
					{/* Left Column - Intro */}
					<div className="flex gap-10 flex-col">
						<div className="flex gap-4 flex-col">
							<div>
								<Badge variant="outline">FAQ</Badge>
							</div>
							<div className="flex gap-2 flex-col">
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-xl text-left">Questions Fréquentes</h2>
								<p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
									Réponses aux questions les plus courantes sur mes services d'entretien de jardin écologique
								</p>
							</div>
							<div className="mt-4">
								<Button className="gap-4" variant="outline" asChild>
									<Link href="/faq">
										Voir Toutes les Questions <ArrowRight className="w-4 h-4" />
									</Link>
								</Button>
							</div>
						</div>
					</div>

					{/* Right Column - Accordion */}
					<AccordionRoot type="single" collapsible className="w-full">
						{FAQ_SHORT.map(item => (
							<AccordionItem key={item.id} value={item.id}>
								<AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
								<AccordionContent className="text-muted-foreground whitespace-pre-wrap">{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</AccordionRoot>
				</div>
			</div>
		</section>
	)
}
