import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Badge } from '@/components/ui/badge'
import { CtaShader } from '@/components/ui/cta-shader'
import { REALISATIONS } from '@/lib/data/realisations'

interface RealisationPageProps {
	params: Promise<{
		id: string
	}>
}

// Fonction pour formater la date en français
function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

// Génération des métadonnées dynamiques
export async function generateMetadata({ params }: RealisationPageProps): Promise<Metadata> {
	const { id } = await params
	const realisation = REALISATIONS.find(r => r.id === id)

	if (!realisation) {
		return {
			title: 'Réalisation non trouvée',
		}
	}

	return {
		title: `${realisation.title} - ${realisation.location} | Jean-Luc Laheux`,
		description: realisation.description,
	}
}

// Génération des chemins statiques
export async function generateStaticParams() {
	return REALISATIONS.map(realisation => ({
		id: realisation.id,
	}))
}

export default async function RealisationPage({ params }: RealisationPageProps) {
	const { id } = await params
	const realisation = REALISATIONS.find(r => r.id === id)

	if (!realisation) {
		notFound()
	}

	// Trouver d'autres réalisations similaires (même catégorie)
	const similarRealisations = REALISATIONS.filter(
		r => r.category === realisation.category && r.id !== realisation.id
	).slice(0, 3)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero title={realisation.title} imageSrc={realisation.image} imageAlt={realisation.title} />

			{/* Back Button */}
			<section className="py-6 border-b">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<Link
						href="/realisations"
						className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
					>
						<ArrowLeft className="w-4 h-4" />
						Retour aux réalisations
					</Link>
				</div>
			</section>

			{/* Content */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						{/* Meta Info */}
						<div className="flex flex-wrap items-center gap-4 mb-8">
							<Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm">
								<Calendar className="w-4 h-4" />
								{formatDate(realisation.date)}
							</Badge>
							<Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm">
								<MapPin className="w-4 h-4" />
								{realisation.location}
							</Badge>
							<Badge variant="default" className="px-4 py-2 text-sm capitalize">
								{realisation.category}
							</Badge>
						</div>

						{/* Features */}
						<div className="mb-8">
							<h2 className="text-2xl font-bold mb-4">Caractéristiques</h2>
							<div className="flex flex-wrap gap-2">
								{realisation.features.map(feature => (
									<Badge key={feature} variant="secondary" className="px-3 py-1">
										{feature}
									</Badge>
								))}
							</div>
						</div>

						{/* Description */}
						<div className="mb-12">
							<h2 className="text-2xl font-bold mb-4">Description du Projet</h2>
							<p className="text-lg text-muted-foreground leading-relaxed">{realisation.description}</p>
						</div>

						{/* Additional Images if available */}
						{realisation.images && realisation.images.length > 0 && (
							<div className="mb-12">
								<h2 className="text-2xl font-bold mb-4">Galerie Photos</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{realisation.images.map((img) => (
										<div key={img} className="relative aspect-[4/3] overflow-hidden rounded-lg">
											<Image
												src={img}
												alt={`${realisation.title} - ${img}`}
												fill
												className="object-cover"
											/>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Tax Credit Info */}
						<div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
							<h3 className="text-xl font-bold text-primary mb-2">Crédit d'Impôt</h3>
							<p className="text-muted-foreground">
								Cette prestation a bénéficié de <strong>50% de crédit d'impôt</strong> pour mon client. Toutes mes
								prestations à domicile sont éligibles à cet avantage fiscal.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Similar Realisations */}
			{similarRealisations.length > 0 && (
				<section className="py-12 bg-muted/30">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold mb-8 text-center">Réalisations Similaires</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
							{similarRealisations.map(similar => (
								<Link
									key={similar.id}
									href={`/realisations/${similar.id}`}
									className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all"
								>
									<Image
										src={similar.image}
										alt={similar.title}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
										<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
											<h3 className="font-bold mb-1">{similar.title}</h3>
											<p className="text-xs text-white/80">{similar.location}</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<CtaShader
				title="Un Projet Similaire ?"
				description="Discutons de votre jardin et créons ensemble un espace écologique qui vous ressemble."
				buttonText="Demander un Devis Gratuit"
				buttonUrl="/contact"
				items={[
					'Visite et conseil gratuits',
					'Approche écologique garantie',
					'Réponse sous 48h',
					"50% de crédit d'impôt sur toutes mes prestations",
				]}
			/>
		</div>
	)
}
