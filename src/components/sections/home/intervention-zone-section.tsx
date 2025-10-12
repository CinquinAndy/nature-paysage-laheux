'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type * as GeoJSON from 'geojson'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CityCard } from '@/components/ui/grid-feature-cards'
import { COMMUNE_COLORS } from '@/lib/data/commune-colors'
import { COMMUNES_CONTOURS } from '@/lib/data/communes-contours'
import { CONTACT_INFO } from '@/lib/data/contact-info'
import type { Homepage } from '@/payload-types'

// Valeurs par défaut
const DEFAULT_CENTER: [number, number] = [47.1339, -1.3433] // Monnières
const DEFAULT_RADIUS = 20000 // 20km en mètres
const DEFAULT_COMMUNES = [
	'Monnières',
	'Le Pallet',
	'Vertou',
	'Gorges',
	'La Chapelle-Heulin',
	'Maisdon-sur-Sèvre',
	'Vallet',
	'La Haie-Fouassière',
	'Clisson',
	'Haute-Goulaine',
	'Mouzillon',
	'Le Loroux-Bottereau',
	'Basse-Goulaine',
	'Aigrefeuille-sur-Maine',
	'Saint-Lumine-de-Clisson',
]

interface Props {
	data?: Homepage['interventionZone']
}

// Dynamic import factory to avoid SSR issues with Leaflet
const createInterventionMap = (center: [number, number], radius: number) =>
	dynamic(
		() =>
			import('@/components/ui/map').then(mod => {
				const { LeafletMap, MapTileLayer, MapCircle, MapGeoJSON } = mod

				// Wrapper component with all map elements
				const MapWrapper = () => (
					<LeafletMap
						center={center}
						zoom={11}
						minZoom={10}
						maxZoom={13}
						scrollWheelZoom={false}
						dragging={false}
						doubleClickZoom={false}
						zoomControl={false}
						className="h-[600px] w-full rounded-2xl shadow-xl border border-primary/10"
					>
						<MapTileLayer variant="dark" />
						<MapCircle
							center={center}
							radius={radius}
							color="hsl(var(--primary) / 0.08)"
							fillColor="hsl(var(--primary))"
							fillOpacity={0.025}
							weight={0.5}
						/>
						<MapGeoJSON data={COMMUNES_CONTOURS as GeoJSON.GeoJsonObject} colorMap={COMMUNE_COLORS} showLabels={true} />
					</LeafletMap>
				)

				return { default: MapWrapper }
			}),
		{ ssr: false }
	)

type AnimatedContainerProps = {
	delay?: number
	className?: React.ComponentProps<typeof motion.div>['className']
	children: React.ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion()

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export function InterventionZoneSection({ data }: Props) {
	// Utiliser les données Payload ou les valeurs par défaut
	const title = data?.title || "Zone d'Intervention en Loire-Atlantique"
	const subtitle = data?.subtitle || `Basé à ${CONTACT_INFO.address.city}, j'interviens dans un rayon de 20 km.`
	const centerLat = data?.mapCenterLat ?? DEFAULT_CENTER[0]
	const centerLng = data?.mapCenterLng ?? DEFAULT_CENTER[1]
	const radiusKm = data?.radiusKm ?? 20
	const communes = data?.communes?.map(c => c.name) || DEFAULT_COMMUNES

	const center: [number, number] = [centerLat, centerLng]
	const radius = radiusKm * 1000 // Convertir km en mètres

	const InterventionMap = createInterventionMap(center, radius)

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{title}</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
				</div>

				<div className="container mx-auto">
					<div className="mb-24">
						<InterventionMap />
					</div>

					{/* Communes Grid */}
					<div className="mb-12">
						<AnimatedContainer className="mx-auto max-w-3xl text-center mb-8">
							<h3 className="text-2xl font-bold tracking-wide text-balance md:text-3xl">
								Principales communes desservies
							</h3>
							<p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
								Découvrez les {communes.length} communes où j'interviens régulièrement
							</p>
						</AnimatedContainer>

						<AnimatedContainer
							delay={0.4}
							className="grid grid-cols-2 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-3 md:grid-cols-5"
						>
							{communes.map(commune => (
								<CityCard key={commune} city={{ name: commune }} />
							))}
						</AnimatedContainer>
					</div>

					{/* CTA Card */}
					<section className="overflow-hidden pt-0 md:pt-0">
						<div className="relative mx-auto flex container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
							{/* Title */}
							<h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200">
								{data?.ctaSection?.title || "Votre commune n'est pas dans la liste ?"}
							</h2>

							{/* Description */}
							<p className="text-muted-foreground opacity-0 animate-fade-in-up delay-300">
								{data?.ctaSection?.description || (
									<>
										Contactez-moi pour vérifier si j'interviens dans votre secteur. <br />
										Basé à {CONTACT_INFO.address.city}, je peux étendre ma zone d'intervention selon vos besoins et la
										nature de votre projet.
									</>
								)}
							</p>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up delay-500">
								<Button variant="default" size="lg" asChild>
									<Link href={data?.ctaSection?.ctaUrl || '/contact'}>
										{data?.ctaSection?.ctaLabel || 'Contactez-moi'}
									</Link>
								</Button>
							</div>

							{/* Glow Effect */}
							<div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in delay-700" />
						</div>
					</section>
				</div>
			</div>
		</section>
	)
}
