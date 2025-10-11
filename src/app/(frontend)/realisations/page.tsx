import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { RealisationCard } from '@/components/sections/shared/realisation-card'
import { CtaShader } from '@/components/ui/cta-shader'
import { REALISATIONS } from '@/lib/data/realisations'

export const metadata: Metadata = {
	title: 'Mes Réalisations de Jardins Écologiques | Jean-Luc Laheux',
	description:
		"Découvrez mes réalisations d'entretien de jardin écologique en Loire-Atlantique. Photos avant-après, projets de potagers, tailles, rénovations naturelles.",
}

export default function RealisationsPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title="Mes Réalisations en Loire-Atlantique"
				imageSrc="/usable/IMG_20250803_122326_1.jpg"
				imageAlt="Réalisations de jardins écologiques en Loire-Atlantique"
			/>

			{/* Introduction */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<p className="text-lg text-muted-foreground leading-relaxed">
							Chaque jardin est unique et raconte une histoire. Ici, je partage avec vous mes interventions, mes
							découvertes et mes apprentissages au fil des saisons. Vous y trouverez des exemples concrets de ce que je
							réalise : transformations de jardins, créations de potagers, entretiens réguliers...
						</p>
						<p className="text-base text-muted-foreground mt-4">
							<strong className="text-primary">Tous ces projets ont bénéficié du crédit d'impôt de 50%</strong> pour mes
							clients.
						</p>
					</div>
				</div>
			</section>

			{/* Gallery */}
			<section className="py-8 md:py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{REALISATIONS.map(realisation => (
							<Link
								key={realisation.id}
								href={`/realisations/${realisation.id}`}
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
				title="Envie du Même Résultat Pour Votre Jardin ?"
				description="Chaque projet est unique. Parlons du vôtre et donnons vie à votre jardin écologique."
				buttonText="Demander un Devis Gratuit"
				buttonUrl="/contact"
				items={[
					'Visite et conseil gratuits',
					'Approche écologique garantie',
					'Réponse sous 48h',
					"50% de crédit d'impôt sur toutes mes prestations",
				]}
				shaderVariant="nature"
			/>
		</div>
	)
}
