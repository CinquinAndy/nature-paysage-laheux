import { CheckCircle2, XCircle } from 'lucide-react'
import Image from 'next/image'

export function PhilosophySection() {
	const preferences = [
		'Désherbage manuel (zéro produit chimique)',
		'Engrais organiques et compost naturel',
		'Paillage végétal pour protéger le sol',
		'Respect des cycles naturels et de la faune',
		'Techniques inspirées de la permaculture',
		'Valorisation des déchets verts',
	]

	const refusals = [
		'Produits phytosanitaires de synthèse',
		'Désherbants chimiques',
		'Méthodes intensives qui appauvrissent le sol',
		'Taille brutale sans respect de la plante',
	]

	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-left mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Mon Approche : Nature & Respect</h2>
					<p className="text-lg text-muted-foreground max-w-3xl">
						Passionné par le végétal et la biodiversité, je mets mon expertise au service de votre jardin depuis
						plusieurs années en Loire-Atlantique.
					</p>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
					{/* Image */}
					<div className="order-2 lg:order-1">
						<div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
							<Image
								src="/usable/IMG_20250803_122326_1.jpg"
								alt="Jean-Luc Laheux au travail dans un jardin"
								fill
								className="object-cover"
							/>
						</div>
					</div>

					{/* Text Content */}
					<div className="order-1 lg:order-2 space-y-8">
						<div>
							<h3 className="text-2xl font-bold mb-4">Ma philosophie est simple :</h3>
							<p className="text-lg text-muted-foreground italic">Travailler AVEC la nature, pas contre elle.</p>
						</div>

						{/* What I prefer */}
						<div>
							<h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<CheckCircle2 className="h-6 w-6 text-primary" />
								Ce que je privilégie
							</h4>
							<ul className="space-y-2">
								{preferences.map((item, index) => (
									<li key={index} className="flex items-start gap-2 text-muted-foreground">
										<span className="text-primary mt-1">•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>

						{/* What I refuse */}
						<div>
							<h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<XCircle className="h-6 w-6 text-destructive" />
								Ce que je refuse
							</h4>
							<ul className="space-y-2">
								{refusals.map((item, index) => (
									<li key={index} className="flex items-start gap-2 text-muted-foreground">
										<span className="text-destructive mt-1">•</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Commitment Box */}
				<div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-6 md:p-8">
					<h4 className="text-xl font-bold mb-3">Mon engagement</h4>
					<p className="text-muted-foreground leading-relaxed">
						En tant que membre de la coopérative Unipros, je vous garantis transparence sur les tarifs et bénéfice
						maximum du crédit d'impôt (50%). Chaque intervention est l'occasion de créer un jardin plus vivant, plus
						résilient et plus respectueux de l'environnement.
					</p>
				</div>
			</div>
		</section>
	)
}
