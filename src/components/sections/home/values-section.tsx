import { Leaf, MapPin, TrendingDown, Wrench } from 'lucide-react'
import Image from 'next/image'

const values = [
	{
		icon: Leaf,
		number: '01',
		title: 'Respect de la Nature',
		description:
			'Méthodes douces, sans produits chimiques. Préservation de la biodiversité et solutions naturelles durables.',
	},
	{
		icon: Wrench,
		number: '02',
		title: 'Travail Artisanal',
		description: 'Interventions soignées et personnalisées. Écoute de vos besoins. Conseil et accompagnement.',
	},

	{
		icon: MapPin,
		number: '03',
		title: 'Expertise Locale',
		description: 'Connaissance du terroir ligérien. Adaptation au climat de Loire-Atlantique. Passion pour le végétal.',
	},
	{
		icon: TrendingDown,
		number: '04',
		title: "50% de Crédit d'Impôt",
		description: 'Sur toutes mes prestations. Attestation fiscale fournie. Économie garantie pour votre budget.',
	},
]

export function ValuesSection() {
	return (
		<section className="py-16 md:py-24 bg-sidebar-accent text-white rounded-t-4xl">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Left Side - Image */}
					<div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
						<Image
							src="/usable/bg.jpg"
							alt="Jardin paysager écologique"
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>

					{/* Right Side - Content */}
					<div className="space-y-8">
						{/* Header */}
						<div>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
								Une Approche
								<br />
								Écologique et
								<br />
								Sur-Mesure
							</h2>
						</div>

						{/* Values Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{values.map(value => {
								const Icon = value.icon
								return (
									<div
										key={value.title}
										className="space-y-3 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
									>
										<div className="flex items-start justify-between">
											<div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
												<Icon className="h-5 w-5 text-white" />
											</div>
											<span className="text-sm font-mono text-white/60">{value.number}</span>
										</div>
										<h3 className="text-lg font-semibold">{value.title}</h3>
										<p className="text-sm text-white/80 leading-relaxed">{value.description}</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
