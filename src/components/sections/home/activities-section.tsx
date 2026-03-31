'use client'

import { Check, Leaf, Shovel, Sprout } from 'lucide-react'
import Image from 'next/image'
import { AnimatedSection } from '@/components/animation/animated-section'
import { Compare } from '@/components/ui/compare'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fadeInUp, scaleIn } from '@/lib/animation/variants'

export function ActivitiesSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header Section */}
				<AnimatedSection variants={fadeInUp} className="flex flex-col items-center gap-4 text-center mb-16">
					<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
						<Leaf className="w-4 h-4 mr-2" />
						Mon Savoir-Faire
					</div>
					<h2 className="max-w-3xl text-3xl font-bold md:text-5xl tracking-tight">
						Découvrez mes <span className="text-primary">activités principales</span>
					</h2>
					<p className="max-w-2xl text-muted-foreground text-lg leading-relaxed mt-2">
						Que ce soit pour l&apos;entretien quotidien de votre jardin ou pour un aménagement complet sur-mesure, je
						vous accompagne avec passion.
					</p>
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
								Entretien de jardin
							</TabsTrigger>
							<TabsTrigger
								value="amenagement"
								className="w-full rounded-xl py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
							>
								<Shovel className="w-4 h-4 mr-2" />
								Aménagement paysager
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
											Service à la personne (50% de crédit d&apos;impôt)
										</div>
										<h3 className="text-3xl lg:text-4xl font-bold">Un entretien soigné pour un jardin rayonnant</h3>
										<p className="text-muted-foreground text-lg leading-relaxed">
											Confiez-moi l&apos;entretien de vos espaces verts. Grâce à l&apos;agrément Service à la personne,
											vous bénéficiez d&apos;une déduction fiscale de 50% sur l&apos;ensemble de ces prestations.
										</p>

										<ul className="space-y-4 mt-2">
											{[
												'Tonte de pelouse et débroussaillage',
												'Taille de haies, arbustes et arbres fruitiers',
												'Désherbage manuel et nettoyage des massifs',
												'Ramassage de feuilles et évacuation des déchets verts',
											].map(item => (
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
												firstImage="https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=800&auto=format&fit=crop"
												secondImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"
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
										<h3 className="text-3xl lg:text-4xl font-bold mb-4">Créons l&apos;espace extérieur de vos rêves</h3>
										<p className="text-muted-foreground text-lg">
											De la conception à la réalisation, je transforme votre jardin en un véritable lieu de vie,
											esthétique et durable.
										</p>
									</div>

									<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
										{/* Card 1 */}
										<div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
											<div className="h-48 relative overflow-hidden">
												<Image
													src="https://images.unsplash.com/photo-1588666355448-43d71ffc6109?q=80&w=600&auto=format&fit=crop"
													alt="Création de terrasse"
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											</div>
											<div className="p-5">
												<h4 className="text-xl font-bold mb-2">Terrasse</h4>
												<p className="text-muted-foreground text-sm">
													Bois, composite ou dallage pour vos moments de détente en extérieur.
												</p>
											</div>
										</div>

										{/* Card 2 */}
										<div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
											<div className="h-48 relative overflow-hidden">
												<Image
													src="https://images.unsplash.com/photo-1617103996637-ad726fa0dbd2?q=80&w=600&auto=format&fit=crop"
													alt="Installation de clôture"
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											</div>
											<div className="p-5">
												<h4 className="text-xl font-bold mb-2">Clôture</h4>
												<p className="text-muted-foreground text-sm">
													Sécurisez et délimitez votre espace avec des solutions adaptées à votre style.
												</p>
											</div>
										</div>

										{/* Card 3 */}
										<div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
											<div className="h-48 relative overflow-hidden">
												<Image
													src="https://images.unsplash.com/photo-1591825729269-ac1dc06cd544?q=80&w=600&auto=format&fit=crop"
													alt="Création de massifs"
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											</div>
											<div className="p-5">
												<h4 className="text-xl font-bold mb-2">Massif</h4>
												<p className="text-muted-foreground text-sm">
													Composition florale et minérale pour apporter du relief à votre jardin.
												</p>
											</div>
										</div>

										{/* Card 4 */}
										<div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
											<div className="h-48 relative overflow-hidden">
												<Image
													src="https://images.unsplash.com/photo-1598902731802-53ce0ce86eaf?q=80&w=600&auto=format&fit=crop"
													alt="Plantation de végétaux"
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											</div>
											<div className="p-5">
												<h4 className="text-xl font-bold mb-2">Plantation de végétaux</h4>
												<p className="text-muted-foreground text-sm">
													Sélection d&apos;arbres et arbustes adaptés à votre climat et à votre sol.
												</p>
											</div>
										</div>

										{/* Card 5 - Custom/Devis */}
										<div className="sm:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors flex flex-col justify-center sm:flex-row items-center p-6 gap-6">
											<div className="w-16 h-16 rounded-full bg-primary/20 flex shrink-0 items-center justify-center text-primary">
												<Sprout className="w-8 h-8" />
											</div>
											<div className="text-center sm:text-left">
												<h4 className="text-xl font-bold mb-2">Toutes autres possibilités...</h4>
												<p className="text-muted-foreground text-sm mb-3">
													J&apos;étudie toutes vos envies de création paysagère. Du cheminement en pas japonais à la
													création de rocailles.
												</p>
												<span className="inline-block bg-background border border-border px-4 py-1.5 rounded-full text-sm font-semibold">
													Sur devis personnalisé
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
