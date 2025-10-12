import { Calendar, CheckCircle, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RichText } from '@/components/ui/rich-text'
import { getMediaUrl, getRealisationBySlug, getRealisations } from '@/lib/payload'

// Lazy load the image gallery modal
const ImageGalleryModal = dynamic(() => import('@/components/ui/image-gallery-modal'))

interface RealisationPageProps {
	params: Promise<{
		slug: string
	}>
}

// Fonction pour formater la date en français
function formatDate(dateString: string | null | undefined): string {
	if (!dateString) return ''
	const date = new Date(dateString)
	return date.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

// Génération des métadonnées dynamiques
export async function generateMetadata({ params }: RealisationPageProps): Promise<Metadata> {
	const { slug } = await params
	const realisation = await getRealisationBySlug(slug)

	if (!realisation) {
		return {
			title: 'Réalisation non trouvée',
		}
	}

	return {
		title: `${realisation.title} - ${realisation.location} | Jean-Luc Laheux`,
		description: realisation.shortDescription || '',
	}
}

// Génération des chemins statiques
export async function generateStaticParams() {
	const realisations = await getRealisations()
	return realisations.map(realisation => ({
		slug: realisation.slug || '',
	}))
}

export default async function RealisationPage({ params }: RealisationPageProps) {
	const { slug } = await params
	const realisation = await getRealisationBySlug(slug)

	if (!realisation) {
		notFound()
	}

	// Build gallery images from Payload media
	const mainImageUrl = getMediaUrl(realisation.image)
	const galleryImages = [
		...(mainImageUrl ? [{ src: mainImageUrl, alt: realisation.title || 'Réalisation' }] : []),
		...(realisation.images?.map(imgItem => ({
			src: getMediaUrl(typeof imgItem === 'object' && 'image' in imgItem ? imgItem.image : null) || '',
			alt: realisation.title || 'Réalisation',
		})) || []),
	].filter(img => img.src) // Filter out images without valid URLs

	const features = realisation.features || []

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={realisation.title || 'Réalisation'}
				imageSrc={mainImageUrl || '/usable/IMG_20250803_122326_1.jpg'}
				imageAlt={realisation.title || 'Réalisation'}
				action={galleryImages.length > 1 ? <ImageGalleryModal images={galleryImages} /> : undefined}
			/>

			{/* Breadcrumb Navigation */}
			<div className="bg-white  border-b border-gray-200 ">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
					<Breadcrumb
						items={[
							{ label: 'Accueil', href: '/' },
							{ label: 'Réalisations', href: '/realisations' },
							{ label: realisation.title || 'Réalisation', href: `/realisations/${realisation.slug}` },
						]}
					/>
				</div>
			</div>

			{/* Article Content in Prose Style */}
			<div className="bg-white px-6 py-16 lg:px-8 ">
				<div className="mx-auto max-w-3xl text-base/7 text-gray-700">
					{/* Category Badge */}
					{realisation.category && (
						<p className="text-base/7 font-semibold text-emerald-600 capitalize">{realisation.category}</p>
					)}

					{/* Title */}
					<h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
						{realisation.title}
					</h1>

					{/* Meta Info */}
					<div className="mt-6 flex flex-wrap items-center gap-4">
						{realisation.date && (
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Calendar className="size-4" />
								<span>{formatDate(realisation.date)}</span>
							</div>
						)}
						{realisation.location && (
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<MapPin className="size-4" />
								<span>{realisation.location}</span>
							</div>
						)}
					</div>

					{/* Short Description */}
					{realisation.shortDescription && <p className="mt-6 text-xl/8">{realisation.shortDescription}</p>}

					{/* Main Content */}
					<div className="mt-10 max-w-2xl text-gray-600">
						<h2 className="text-2xl font-semibold tracking-tight text-pretty text-foreground">Description du Projet</h2>
						{realisation.description && (
							<div className="mt-4">
								<RichText content={realisation.description} />
							</div>
						)}

						{/* Features List */}
						{features.length > 0 && (
							<>
								<h3 className="mt-12 text-xl font-semibold text-foreground">Caractéristiques</h3>
								<ul className="mt-6 max-w-xl space-y-4 text-gray-600">
									{features.map((featureItem, index) => {
										const featureText =
											typeof featureItem === 'object' && 'feature' in featureItem ? featureItem.feature : ''
										return (
											<li key={featureText || index} className="flex gap-x-3">
												<CheckCircle aria-hidden="true" className="mt-1 size-5 flex-none text-emerald-600" />
												<span>
													<strong className="font-semibold text-foreground">{featureText}</strong>
												</span>
											</li>
										)
									})}
								</ul>
							</>
						)}

						{/* Process Section */}
						<h2 className="mt-16 text-2xl font-semibold tracking-tight text-pretty text-foreground">
							Une approche écologique et respectueuse
						</h2>
						<p className="mt-6">
							Chaque projet est réalisé avec une attention particulière portée à l&apos;environnement et à la
							biodiversité locale. Mon engagement est de créer des espaces verts durables qui respectent
							l&apos;écosystème et favorisent la vie du sol.
						</p>

						{/* Tax Credit Info */}
						<div className="mt-10 rounded-2xl bg-emerald-50 p-6 border border-emerald-200">
							<h3 className="text-lg font-semibold text-emerald-900">Bénéficiez de 50% de crédit d&apos;impôt</h3>
							<p className="mt-2 text-sm text-emerald-800">
								Cette réalisation a bénéficié du crédit d&apos;impôt Services à la Personne. Toutes mes prestations sont
								éligibles, l&apos;État vous rembourse 50% du montant payé.
							</p>
						</div>

						{/* Client Testimonial (if available) */}
						{realisation.testimonial?.quote && (
							<div className="mt-16">
								<h3 className="text-xl font-semibold text-foreground">Le mot du client</h3>
								<figure className="mt-6 border-l-4 border-emerald-600 pl-6">
									<blockquote className="text-gray-700 italic">
										<p>&quot;{realisation.testimonial.quote}&quot;</p>
									</blockquote>
									<figcaption className="mt-4 text-sm text-gray-600">
										— {realisation.testimonial.author || 'Client satisfait'}
										{realisation.testimonial.location && `, ${realisation.testimonial.location}`}
									</figcaption>
								</figure>
							</div>
						)}
					</div>

					{/* CTA Section */}
					<div className="mt-16 max-w-2xl">
						<div className="rounded-2xl bg-gray-50 p-8 text-center">
							<h2 className="text-2xl font-semibold text-foreground">Un projet similaire ?</h2>
							<p className="mt-4 text-gray-600">
								Discutons de votre jardin et créons ensemble un espace écologique qui vous ressemble. Bénéficiez de 50%
								de crédit d&apos;impôt sur toutes mes prestations.
							</p>
							<a
								href="/contact"
								className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors duration-200"
							>
								Demander un devis gratuit
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
