'use client'

import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EnhancedShaderBackground } from '@/components/ui/enhanced-shader-background'

interface CtaShaderProps {
	title?: string
	description?: string
	buttonText?: string
	buttonUrl?: string
	items?: string[]
	shaderVariant?: 'nature' | 'energy' | 'calm'
	shaderColors?: string[]
}

const defaultItems = [
	'Réponse sous 48h',
	'Devis gratuit et sans engagement',
	'Visite et conseil gratuits',
	"50% de crédit d'impôt garanti",
]

export function CtaShader({
	title = 'Prêt à Redonner Vie à Votre Jardin ?',
	description = "Demandez votre devis gratuit et profitez de 50% de réduction d'impôt. Intervention dans le Vignoble Nantais et la Vallée de la Loire.",
	buttonText = 'Demander un Devis Gratuit',
	buttonUrl = '/contact',
	items = defaultItems,
	shaderVariant = 'nature',
	shaderColors,
}: CtaShaderProps) {
	return (
		<section className="relative py-32 overflow-hidden">
			{/* Enhanced Multi-Layer Shader Background */}
			<EnhancedShaderBackground variant={shaderVariant} colors={shaderColors} />

			{/* Content */}
			<div className="relative z-10 container mx-auto">
				<div className="flex justify-center">
					<div className="max-w-5xl">
						<div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-background backdrop-blur-md border border-white/20 px-6 py-10 md:flex-row lg:px-20 lg:py-16 shadow-2xl">
							<div className="md:w-1/2">
								<h4 className="mb-4 text-2xl font-bold md:text-3xl text-foreground">{title}</h4>
								<p className="text-foreground/90 text-lg mb-6">{description}</p>
								<Button className="bg-white hover:bg-white/90 text-primary font-semibold " size="lg" asChild>
									<Link href={buttonUrl}>
										{buttonText} <ArrowRight className="ml-2 size-4" />
									</Link>
								</Button>
							</div>
							<div className="md:w-1/3">
								<ul className="flex flex-col space-y-3 text-sm font-medium">
									{items.map(item => (
										<li className="flex items-center text-foreground" key={item}>
											<Check className="mr-4 size-5 flex-shrink-0 text-green-300" />
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
