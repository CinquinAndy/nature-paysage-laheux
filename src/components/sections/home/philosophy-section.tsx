import { Award, CheckCircle2, Heart, Leaf, Shield, XCircle } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const philosophyPoints = [
	{
		icon: Leaf,
		title: 'Méthodes Naturelles',
		description: 'Désherbage manuel, engrais organiques, paillage végétal pour protéger le sol',
	},
	{
		icon: Heart,
		title: 'Respect des Cycles',
		description: 'Respect des cycles naturels et de la faune, techniques inspirées de la permaculture',
	},
	{
		icon: Award,
		title: 'Valorisation',
		description: 'Valorisation des déchets verts, compost naturel pour enrichir votre jardin',
	},
	{
		icon: Shield,
		title: 'Engagement Qualité',
		description: "Transparence sur les tarifs et bénéfice maximum du crédit d'impôt (50%)",
	},
]

const preferences = [
	'Désherbage manuel (zéro produit chimique)',
	'Engrais organiques et compost naturel',
	'Paillage végétal pour protéger le sol',
	'Techniques inspirées de la permaculture',
]

const refusals = [
	'Produits phytosanitaires de synthèse',
	'Désherbants chimiques',
	'Méthodes intensives qui appauvrissent le sol',
]

export function PhilosophySection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="max-w-3xl mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
						Mon Approche :<br />
						<span className="text-primary">Nature & Respect</span>
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						Passionné par le végétal et la biodiversité, je mets mon expertise au service de votre jardin depuis
						plusieurs années en Loire-Atlantique.
					</p>
					<p className="text-base text-muted-foreground mt-4 italic">
						Ma philosophie est simple :{' '}
						<strong className="text-foreground">travailler AVEC la nature, pas contre elle.</strong>
					</p>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
					{/* Left: Layered Image Mockup */}
					<div className="relative h-[500px] lg:h-[600px]">
						{/* Secondary Image (Background) */}
						<div className="absolute top-0 right-0 w-[85%] h-[45%] rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src="/usable/IMG_20250803_122326_1.jpg"
								alt="Jean-Luc Laheux au travail dans un jardin"
								fill
								className="object-cover blur-[2px] opacity-90"
							/>
						</div>

						{/* Primary Image (Foreground) */}
						<div className="absolute bottom-0 left-0 w-[85%] h-[65%] rounded-2xl overflow-hidden shadow-2xl group">
							<Image
								src="/usable/IMG_20250803_122326_1.jpg"
								alt="Jean-Luc Laheux travaillant avec des méthodes naturelles"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-700"
							/>
							{/* Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

							{/* Content on Image */}
							<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
								<h3 className="text-xl font-bold mb-2">Une Approche Écologique</h3>
								<p className="text-white/90 text-sm leading-relaxed">
									Chaque intervention est l'occasion de créer un jardin plus vivant, plus résilient et plus respectueux de
									l'environnement.
								</p>
							</div>
						</div>
					</div>

					{/* Right: Philosophy Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{philosophyPoints.map((point, index) => {
							const Icon = point.icon
							return (
								<Card
									key={index}
									className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50 bg-background/80 backdrop-blur-sm"
								>
									<CardContent className="p-6">
										<div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
											<Icon className="h-6 w-6 text-primary" />
										</div>
										<h4 className="text-lg font-semibold mb-2">{point.title}</h4>
										<p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>

				{/* Two Columns: What I Do / What I Don't */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					{/* What I Do */}
					<div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-8 hover:bg-primary/10 transition-colors">
						<div className="flex items-center gap-3 mb-6">
							<div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
								<CheckCircle2 className="h-6 w-6 text-primary" />
							</div>
							<h3 className="text-2xl font-bold">Ce que je privilégie</h3>
						</div>
						<ul className="space-y-3">
							{preferences.map((item, index) => (
								<li key={index} className="flex items-start gap-3 text-muted-foreground">
									<span className="text-primary mt-1 text-lg">●</span>
									<span className="text-sm leading-relaxed">{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* What I Don't */}
					<div className="bg-destructive/5 border-l-4 border-destructive rounded-r-2xl p-8 hover:bg-destructive/10 transition-colors">
						<div className="flex items-center gap-3 mb-6">
							<div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
								<XCircle className="h-6 w-6 text-destructive" />
							</div>
							<h3 className="text-2xl font-bold">Ce que je refuse</h3>
						</div>
						<ul className="space-y-3">
							{refusals.map((item, index) => (
								<li key={index} className="flex items-start gap-3 text-muted-foreground">
									<span className="text-destructive mt-1 text-lg">●</span>
									<span className="text-sm leading-relaxed">{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Engagement Banner */}
				<div className="relative rounded-2xl overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-primary to-green-600" />
					<div className="relative p-8 md:p-12 text-white">
						<div className="max-w-4xl">
							<h3 className="text-2xl md:text-3xl font-bold mb-4">Mon engagement</h3>
							<p className="text-lg text-white/90 leading-relaxed">
								En tant que membre de la coopérative Unipros, je vous garantis transparence sur les tarifs et bénéfice
								maximum du crédit d'impôt (50%). Chaque jardin mérite une attention particulière et des méthodes qui
								respectent son écosystème unique.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
