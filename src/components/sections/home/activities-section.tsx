'use client'

import { Check, Leaf, Shovel, Sprout } from 'lucide-react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animation/animated-section'
import { Compare } from '@/components/ui/compare'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fadeInUp, scaleIn } from '@/lib/animation/variants'
import { getMediaUrlOptional } from '@/lib/payload/media-helpers'
import type { Homepage } from '@/payload-types'

interface ActivitiesSectionProps {
	data: Homepage['activitiesSection']
}

// Default fallback values (used when Payload fields are empty)
const DEFAULTS = {
	badgeLabel: 'Mon Savoir-Faire',
	title: 'Découvrez mes **activités principales**',
	subtitle:
		"Que ce soit pour l'entretien quotidien de votre jardin ou pour un aménagement complet sur-mesure, je vous accompagne avec passion.",
	entretien: {
		tabLabel: 'Entretien de jardin',
		taxCreditLabel: "Service à la personne (50% de crédit d'impôt)",
		title: 'Un entretien soigné pour un jardin rayonnant',
		description:
			"Confiez-moi l'entretien de vos espaces verts. Grâce à l'agrément Service à la personne, vous bénéficiez d'une déduction fiscale de 50% sur l'ensemble de ces prestations.",
		services: [
			'Tonte de pelouse et débroussaillage',
			'Taille de haies, arbustes et arbres fruitiers',
			'Désherbage manuel et nettoyage des massifs',
			'Ramassage de feuilles et évacuation des déchets verts',
		],
		beforeImageUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=800&auto=format&fit=crop',
		afterImageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
	},
	amenagement: {
		tabLabel: 'Aménagement paysager',
		title: "Créons l'espace extérieur de vos rêves",
		description:
			'De la conception à la réalisation, je transforme votre jardin en un véritable lieu de vie, esthétique et durable.',
		cards: [
			{
				title: 'Terrasse',
				description: 'Bois, composite ou dallage pour vos moments de détente en extérieur.',
				imageUrl: 'https://images.unsplash.com/photo-1588666355448-43d71ffc6109?q=80&w=600&auto=format&fit=crop',
			},
			{
				title: 'Clôture',
				description: 'Sécurisez et délimitez votre espace avec des solutions adaptées à votre style.',
				imageUrl: 'https://images.unsplash.com/photo-1617103996637-ad726fa0dbd2?q=80&w=600&auto=format&fit=crop',
			},
			{
				title: 'Massif',
				description: 'Composition florale et minérale pour apporter du relief à votre jardin.',
				imageUrl: 'https://images.unsplash.com/photo-1591825729269-ac1dc06cd544?q=80&w=600&auto=format&fit=crop',
			},
			{
				title: 'Plantation de végétaux',
				description: "Sélection d'arbres et arbustes adaptés à votre climat et à votre sol.",
				imageUrl: 'https://images.unsplash.com/photo-1598902731802-53ce0ce86eaf?q=80&w=600&auto=format&fit=crop',
			},
		],
		devisCard: {
			title: 'Toutes autres possibilités...',
			description:
				"J'étudie toutes vos envies de création paysagère. Du cheminement en pas japonais à la création de rocailles.",
			badgeLabel: 'Sur devis personnalisé',
		},
	},
}

// Parse title to extract bold text (text between **) — same pattern as ValuesSection
function parseTitleWithBold(title: string) {
	const parts = title.split(/(\*\*.*?\*\*)/)
	return parts.map((part, i) => {
		if (part.startsWith('**') && part.endsWith('**')) {
			return <span key={`bold-${part}`} className="text-primary">{part.slice(2, -2)}</span>
		}
		return <span key={`text-${part}-${i}`}>{part}</span>
	})
}

export function ActivitiesSection({ data }: ActivitiesSectionProps) {
	// --- Header ---
	const badgeLabel = data?.badgeLabel || DEFAULTS.badgeLabel
	const title = data?.title || DEFAULTS.title
	const subtitle = data?.subtitle || DEFAULTS.subtitle

	// --- Entretien tab ---
	const entretienTabLabel = data?.entretien?.tabLabel || DEFAULTS.entretien.tabLabel
	const entretienTaxCreditLabel = data?.entretien?.taxCreditLabel || DEFAULTS.entretien.taxCreditLabel
	const entretienTitle = data?.entretien?.title || DEFAULTS.entretien.title
	const entretienDescription = data?.entretien?.description || DEFAULTS.entretien.description
	const entretienServices =
		data?.entretien?.services && data.entretien.services.length > 0
			? data.entretien.services.map(s => s.label)
			: DEFAULTS.entretien.services

	const beforeImageUrl = getMediaUrlOptional(data?.entretien?.beforeImage) || DEFAULTS.entretien.beforeImageUrl
	const afterImageUrl = getMediaUrlOptional(data?.entretien?.afterImage) || DEFAULTS.entretien.afterImageUrl

	// --- Aménagement tab ---
	const amenagementTabLabel = data?.amenagement?.tabLabel || DEFAULTS.amenagement.tabLabel
	const amenagementTitle = data?.amenagement?.title || DEFAULTS.amenagement.title
	const amenagementDescription = data?.amenagement?.description || DEFAULTS.amenagement.description

	const cards =
		data?.amenagement?.cards && data.amenagement.cards.length > 0
			? data.amenagement.cards.map((card, i) => ({
					id: card.id || String(i),
					title: card.title,
					description: card.description || '',
					imageUrl: getMediaUrlOptional(card.image) || DEFAULTS.amenagement.cards[i]?.imageUrl || '',
				}))
			: DEFAULTS.amenagement.cards.map((c, i) => ({ ...c, id: String(i) }))

	const devisTitle = data?.amenagement?.devisCard?.title || DEFAULTS.amenagement.devisCard.title
	const devisDescription = data?.amenagement?.devisCard?.description || DEFAULTS.amenagement.devisCard.description
	const devisBadge = data?.amenagement?.devisCard?.badgeLabel || DEFAULTS.amenagement.devisCard.badgeLabel

	return (
		<section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header Section */}
				<AnimatedSection variants={fadeInUp} className="flex flex-col items-center gap-4 text-center mb-16">
					<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
						<Leaf className="w-4 h-4 mr-2" />
						{badgeLabel}
					</div>
					<h2 className="max-w-3xl text-3xl font-bold md:text-5xl tracking-tight">
						{parseTitleWithBold(title)}
					</h2>
					<p className="max-w-2xl text-muted-foreground text-lg leading-relaxed mt-2">{subtitle}</p>
				</AnimatedSection>

				{/* Tabs Container */}
				<AnimatedSection variants={scaleIn} delay={0.2} className="w-full">
					<Tabs defaultValue="entretien" className="w-full flex flex-col items-center">
						<TabsList className="flex flex-col sm:flex-row h-auto w-full max-w-md bg-muted/50 p-1 rounded-2xl border border-border/50">
							<TabsTrigger
								value="entretien"
								className="w-full rounded-xl py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
							>
								<Leaf className="w-4 h-4 mr-2" />
								{entretienTabLabel}
							</TabsTrigger>
							<TabsTrigger
								value="amenagement"
								className="w-full rounded-xl py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
							>
								<Shovel className="w-4 h-4 mr-2" />
								{amenagementTabLabel}
							</TabsTrigger>
						</TabsList>

						<div className="w-full mt-10 max-w-6xl">
							{/* Tab 1: Entretien de Jardin */}
							<TabsContent value="entretien" className="w-full outline-none">
								<div className="relative grid lg:grid-cols-2 gap-10 items-center bg-background rounded-3xl p-6 lg:p-12 shadow-xl border border-border/40">
									{/* SAP Logo */}
									<div className="absolute -top-6 right-6 lg:right-10 z-10">
										<Image
											src="/sap.png"
											alt="Logo Services à la personne"
											width={80}
											height={80}
											className="drop-shadow-lg"
										/>
									</div>

									{/* Content Left */}
									<div className="flex flex-col gap-6 order-2 lg:order-1">
										<div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl w-fit font-medium">
											<span className="text-lg">💶</span>
											{entretienTaxCreditLabel}
										</div>
										<h3 className="text-3xl lg:text-4xl font-bold">{entretienTitle}</h3>
										<p className="text-muted-foreground text-lg leading-relaxed">{entretienDescription}</p>

										<ul className="space-y-4 mt-2">
											{entretienServices.map(item => (
												<li key={item} className="flex items-start gap-3">
													<div className="mt-1 bg-primary/20 p-1 rounded-full text-primary">
														<Check className="w-4 h-4" />
													</div>
													<span className="text-foreground">{item}</span>
												</li>
											))}
										</ul>
									</div>

									{/* Compare Slider Right */}
									<div className="order-1 lg:order-2 flex justify-center w-full">
										<div className="p-2 border border-border/50 bg-muted/20 rounded-3xl w-full max-w-[500px]">
											<Compare
												firstImage={beforeImageUrl}
												secondImage={afterImageUrl}
												className="w-full aspect-square md:aspect-4/3 rounded-2xl"
												slideMode="hover"
											/>
										</div>
									</div>
								</div>
							</TabsContent>

							{/* Tab 2: Aménagement Paysager */}
							<TabsContent value="amenagement" className="w-full outline-none">
								<div className="bg-background rounded-3xl p-6 lg:p-12 shadow-xl border border-border/40">
									<div className="text-center max-w-2xl mx-auto mb-12">
										<h3 className="text-3xl lg:text-4xl font-bold mb-4">{amenagementTitle}</h3>
										<p className="text-muted-foreground text-lg">{amenagementDescription}</p>
									</div>

									<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
										{/* Service Cards */}
										{cards.map(card => (
											<div
												key={card.id}
												className="group relative overflow-hidden rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
											>
												<div className="h-48 relative overflow-hidden">
													{card.imageUrl && (
														<Image
															src={card.imageUrl}
															alt={card.title}
															fill
															className="object-cover group-hover:scale-105 transition-transform duration-500"
														/>
													)}
												</div>
												<div className="p-5">
													<h4 className="text-xl font-bold mb-2">{card.title}</h4>
													<p className="text-muted-foreground text-sm">{card.description}</p>
												</div>
											</div>
										))}

										{/* Devis Card */}
										<div className="sm:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors flex flex-col justify-center sm:flex-row items-center p-6 gap-6">
											<div className="w-16 h-16 rounded-full bg-primary/20 flex shrink-0 items-center justify-center text-primary">
												<Sprout className="w-8 h-8" />
											</div>
											<div className="text-center sm:text-left">
												<h4 className="text-xl font-bold mb-2">{devisTitle}</h4>
												<p className="text-muted-foreground text-sm mb-3">{devisDescription}</p>
												<span className="inline-block bg-background border border-border px-4 py-1.5 rounded-full text-sm font-semibold">
													{devisBadge}
												</span>
											</div>
										</div>
									</div>
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</AnimatedSection>
			</div>
		</section>
	)
}
