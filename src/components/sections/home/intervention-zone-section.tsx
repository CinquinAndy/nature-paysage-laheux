'use client'

import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { CONTACT_INFO } from '@/lib/data/contact-info'
import { COMMUNES_CONTOURS } from '@/lib/data/communes-contours'
import { COMMUNE_COLORS } from '@/lib/data/commune-colors'

// Coordonnées de Monnières
const MONNIERES_COORDS: [number, number] = [47.1339, -1.3433]
const INTERVENTION_RADIUS = 30000 // 30km en mètres

// Import dynamique pour éviter les problèmes SSR avec Leaflet
const Map = dynamic(
	() => import('@/components/ui/map').then((mod) => mod.Map),
	{ ssr: false }
)
const MapTileLayer = dynamic(
	() => import('@/components/ui/map').then((mod) => mod.MapTileLayer),
	{ ssr: false }
)
const MapCircle = dynamic(
	() => import('@/components/ui/map').then((mod) => mod.MapCircle),
	{ ssr: false }
)
const MapGeoJSON = dynamic(
	() => import('@/components/ui/map').then((mod) => mod.MapGeoJSON),
	{ ssr: false }
)

export function InterventionZoneSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
						Zone d'Intervention en Loire-Atlantique
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Basé à {CONTACT_INFO.address.city}, j'interviens dans un rayon de 30 km dans le Vignoble Nantais
					</p>
				</div>

				<div className="max-w-6xl mx-auto">
					{/* Carte Interactive */}
					<div className="mb-8 relative">
						<div className="absolute top-4 left-4 z-[400] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-lg p-4 shadow-lg border max-w-xs">
							<div className="flex items-start gap-3">
								<div className="rounded-full bg-primary/10 p-2">
									<MapPin className="h-5 w-5 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold mb-1">Rayon de 30 km</h3>
									<p className="text-sm text-muted-foreground">
										Autour de {CONTACT_INFO.address.city}
									</p>
								</div>
							</div>
						</div>

						<Map
							center={MONNIERES_COORDS}
							zoom={11}
							minZoom={10}
							maxZoom={13}
							scrollWheelZoom={false}
							dragging={false}
							doubleClickZoom={false}
							zoomControl={false}
							className="h-[500px] w-full rounded-2xl shadow-xl border border-primary/10"
						>
							<MapTileLayer variant="dark" />

							{/* Cercle de la zone d'intervention de 30km (très léger) */}
							<MapCircle
								center={MONNIERES_COORDS}
								radius={INTERVENTION_RADIUS}
								color="hsl(var(--primary) / 0.08)"
								fillColor="hsl(var(--primary))"
								fillOpacity={0.02}
								weight={0.5}
							/>

							{/* Territoires des communes à 15km avec couleurs différentes */}
							<MapGeoJSON
								data={COMMUNES_CONTOURS}
								glow
								colorMap={COMMUNE_COLORS}
								showLabels={true}
							/>
						</Map>
					</div>

					{/* Communes Grid */}
					<div className="bg-primary/5 rounded-2xl p-8 md:p-10 border-2 border-primary/20 mb-8">
						<h3 className="text-xl font-semibold mb-6 text-center">
							Principales communes desservies
						</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{CONTACT_INFO.interventionZone.communes.map((commune) => (
								<div
									key={commune}
									className="flex items-center gap-2 text-sm p-3 rounded-lg bg-background/50 hover:bg-primary/10 transition-colors border border-primary/10"
								>
									<span className="text-primary font-bold">✓</span>
									<span>{commune}</span>
								</div>
							))}
						</div>
					</div>

					{/* CTA */}
					<div className="text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary/20">
						<p className="text-lg font-medium mb-6">
							Votre commune n'est pas dans la liste ?<br />
							<span className="text-muted-foreground text-base">
								Contactez-moi pour vérifier si j'interviens dans votre secteur
							</span>
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button variant="primary" size="lg" asChild>
								<Link href="/contact">Demander un Devis Gratuit</Link>
							</Button>
							<Button variant="outline" size="lg" asChild>
								<Link href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
									<Phone className="mr-2 h-4 w-4" />
									{CONTACT_INFO.phone}
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
