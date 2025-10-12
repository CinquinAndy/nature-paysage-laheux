import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SERVICES } from '@/lib/data/services'

// Lazy load the image gallery modal
const ImageGalleryModal = dynamic(() => import('@/components/ui/image-gallery-modal'))

interface PrestationPageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateStaticParams() {
	return SERVICES.map(service => ({
		slug: service.id,
	}))
}

export async function generateMetadata({ params }: PrestationPageProps): Promise<Metadata> {
	const { slug } = await params
	const service = SERVICES.find(s => s.id === slug)

	if (!service) {
		return {
			title: 'Prestation non trouvée',
		}
	}

	return {
		title: `${service.title} | Jean-Luc Laheux - Loire-Atlantique`,
		description: service.shortDescription,
	}
}

export default async function PrestationPage({ params }: PrestationPageProps) {
	const { slug } = await params
	const service = SERVICES.find(s => s.id === slug)

	if (!service) {
		notFound()
	}

	// Mock gallery images - will be replaced with Payload CMS data later
	const galleryImages = [
		{ src: service.image || '/placeholder.jpg', alt: service.title },
		{ src: '/usable/IMG_20231117_093237.jpg', alt: 'Example 1' },
		{ src: '/usable/IMG_20240310_161440.jpg', alt: 'Example 2' },
		{ src: '/usable/IMG_20250402_142527.jpg', alt: 'Example 3' },
	]

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={service.title}
				imageSrc={service.image || '/placeholder.jpg'}
				imageAlt={service.title}
				action={<ImageGalleryModal images={galleryImages} />}
			/>

			{/* Breadcrumb Navigation */}
			<div className="bg-white  border-b border-gray-200 ">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
					<Breadcrumb
						items={[
							{ label: 'Accueil', href: '/' },
							{ label: 'Prestations', href: '/prestations' },
							{ label: service.title, href: `/prestations/${service.id}` },
						]}
					/>
				</div>
			</div>

			{/* Article Content in Prose Style */}
			<div className="bg-white px-6 py-16 lg:px-8 ">
				<div className="mx-auto max-w-3xl text-base/7 text-gray-700">
					{/* Category Badge */}
					<p className="text-base/7 font-semibold text-emerald-600 capitalize">{service.category}</p>

					{/* Title */}
					<h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
						{service.title}
					</h1>

					{/* Short Description */}
					<p className="mt-6 text-xl/8">{service.shortDescription}</p>

					{/* Main Content */}
					<div className="mt-10 max-w-2xl text-gray-600">
						<p>{service.fullDescription}</p>

						{/* Features List */}
						<ul className="mt-8 max-w-xl space-y-8 text-gray-600">
							{service.features.map((feature, index) => (
								<li key={index} className="flex gap-x-3">
									<CheckCircle aria-hidden="true" className="mt-1 size-5 flex-none text-emerald-600" />
									<span>
										<strong className="font-semibold text-foreground">{feature.split('.')[0]}.</strong>{' '}
										{feature.split('.').slice(1).join('.') || 'Un service de qualité professionnelle.'}
									</span>
								</li>
							))}
						</ul>

						{/* Additional Content Section */}
						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Une approche écologique et respectueuse
						</h2>
						<p className="mt-6">
							Mon engagement est de vous offrir un service de qualité qui respecte l&apos;environnement et favorise la
							biodiversité dans votre jardin. Chaque intervention est pensée pour améliorer durablement la santé de vos
							espaces verts.
						</p>

						{/* Tax Credit Info */}
						{service.eligibleTaxCredit && (
							<div className="mt-10 rounded-2xl bg-emerald-50 p-6 border border-emerald-200">
								<h3 className="text-lg font-semibold text-emerald-900">Bénéficiez de 50% de crédit d&apos;impôt</h3>
								<p className="mt-2 text-sm text-emerald-800">
									Cette prestation est éligible au crédit d&apos;impôt Services à la Personne. L&apos;État vous
									rembourse 50% du montant payé, soit un vrai tarif divisé par deux.
								</p>
							</div>
						)}

						{/* Pricing */}
						<div className="mt-10">
							<h3 className="text-xl font-semibold text-foreground">Tarification</h3>
							<p className="mt-2 text-lg font-medium text-emerald-600">{service.price}</p>
							<p className="mt-2 text-sm text-gray-600">
								Chaque jardin est unique. Je me déplace gratuitement pour évaluer vos besoins et vous proposer un devis
								personnalisé et sans engagement.
							</p>
						</div>
					</div>

					{/* CTA Section */}
					<div className="mt-16 max-w-2xl">
						<div className="rounded-2xl bg-gray-50 p-8 text-center">
							<h2 className="text-2xl font-semibold text-foreground">Intéressé par cette prestation ?</h2>
							<p className="mt-4 text-gray-600">
								Demandez votre devis gratuit et bénéficiez de 50% de crédit d&apos;impôt sur toutes mes prestations.
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
