import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, TrendingDown, MapPin, Wrench } from 'lucide-react'

const values = [
	{
		icon: Leaf,
		title: 'Respect de la Nature',
		description:
			'Méthodes douces, sans produits chimiques. Préservation de la biodiversité et solutions naturelles durables.',
	},
	{
		icon: TrendingDown,
		title: "50% de Crédit d'Impôt",
		description: 'Sur toutes mes prestations. Attestation fiscale fournie. Économie garantie pour votre budget.',
	},
	{
		icon: MapPin,
		title: 'Expertise Locale',
		description: 'Connaissance du terroir ligérien. Adaptation au climat de Loire-Atlantique. Passion pour le végétal.',
	},
	{
		icon: Wrench,
		title: 'Travail Artisanal',
		description: 'Interventions soignées et personnalisées. Écoute de vos besoins. Conseil et accompagnement.',
	},
]

export function ValuesSection() {
	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Une Approche Écologique et Sur-Mesure</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Quatre piliers fondamentaux guident mon travail au quotidien
					</p>
				</div>

				{/* Values Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
					{values.map((value, index) => {
						const Icon = value.icon
						return (
							<Card
								key={index}
								className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50"
							>
								<CardHeader className="text-center">
									<div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
										<Icon className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="text-xl">{value.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground text-center leading-relaxed">{value.description}</p>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}
