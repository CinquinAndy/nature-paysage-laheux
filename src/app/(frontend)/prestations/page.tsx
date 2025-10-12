import { CheckCircle2, XCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { ServiceCard } from '@/components/sections/shared/service-card'
import { TaxCreditEligibility } from '@/components/sections/shared/tax-credit-eligibility'
import { CtaShader } from '@/components/ui/cta-shader'
import { getMediaUrl, getPrestationsPageData, getServices } from '@/lib/payload'
import type { PrestationsPage as PrestationsPageType } from '@/payload-types'

export const metadata: Metadata = {
	title: "Mes Prestations d'Eco-Paysagiste | Jean-Luc Laheux - Loire-Atlantique",
	description:
		"Tonte écologique, désherbage naturel, taille raisonnée, potager en permaculture. Toutes mes prestations bénéficient de 50% de crédit d'impôt. Devis gratuit.",
}

/**
 * Add Lorem Ipsum fallback values to prestations page data to easily identify missing content
 */
function addLoremFallbacks(prestationsPage: PrestationsPageType): PrestationsPageType {
	return {
		...prestationsPage,
		hero: {
			...prestationsPage.hero,
			title: prestationsPage.hero?.title || '🚨 LOREM: Mes Prestations Écologiques',
		},
		taxCreditEligibility: {
			...prestationsPage.taxCreditEligibility,
			title:
				prestationsPage.taxCreditEligibility?.title ||
				"🚨 LOREM: Quelles Prestations Sont Éligibles au Crédit d'Impôt ?",
			description:
				prestationsPage.taxCreditEligibility?.description ||
				"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Découvrez quels services bénéficient du crédit d'impôt de 50%.",
			eligibleTitle:
				prestationsPage.taxCreditEligibility?.eligibleTitle || "🚨 LOREM: Services Éligibles au Crédit d'Impôt de 50%",
			eligibleDescription:
				prestationsPage.taxCreditEligibility?.eligibleDescription ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ces prestations vous permettent de récupérer 50% de leur coût.',
			eligibleItems:
				prestationsPage.taxCreditEligibility?.eligibleItems &&
				prestationsPage.taxCreditEligibility.eligibleItems.length > 0
					? prestationsPage.taxCreditEligibility.eligibleItems.map((item, i) => ({
							...item,
							title: item.title || `🚨 LOREM: Service Éligible ${i + 1}`,
							description: item.description || '🚨 LOREM: Description du service éligible',
						}))
					: [
							{
								title: '🚨 LOREM: Tonte de pelouse',
								description: '🚨 LOREM: Description du service éligible',
								id: 'lorem-eligible-1',
							},
							{
								title: '🚨 LOREM: Désherbage',
								description: '🚨 LOREM: Description du service éligible',
								id: 'lorem-eligible-2',
							},
							{
								title: '🚨 LOREM: Taille de haies',
								description: '🚨 LOREM: Description du service éligible',
								id: 'lorem-eligible-3',
							},
						],
			nonEligibleTitle:
				prestationsPage.taxCreditEligibility?.nonEligibleTitle || "🚨 LOREM: Services Non Éligibles au Crédit d'Impôt",
			nonEligibleDescription:
				prestationsPage.taxCreditEligibility?.nonEligibleDescription ||
				"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ces prestations ne permettent pas de bénéficier du crédit d'impôt.",
			nonEligibleItems:
				prestationsPage.taxCreditEligibility?.nonEligibleItems &&
				prestationsPage.taxCreditEligibility.nonEligibleItems.length > 0
					? prestationsPage.taxCreditEligibility.nonEligibleItems.map((item, i) => ({
							...item,
							title: item.title || `🚨 LOREM: Service Non Éligible ${i + 1}`,
							description: item.description || '🚨 LOREM: Description du service non éligible',
						}))
					: [
							{
								title: '🚨 LOREM: Création de jardin',
								description: '🚨 LOREM: Description du service non éligible',
								id: 'lorem-non-eligible-1',
							},
							{
								title: '🚨 LOREM: Aménagement paysager',
								description: '🚨 LOREM: Description du service non éligible',
								id: 'lorem-non-eligible-2',
							},
						],
		},
		ctaSection: {
			...prestationsPage.ctaSection,
			title: prestationsPage.ctaSection?.title || '🚨 LOREM: Prêt à Profiter de Mes Services ?',
			description:
				prestationsPage.ctaSection?.description ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contactez-moi dès maintenant pour un devis gratuit et personnalisé.',
			buttonText: prestationsPage.ctaSection?.buttonText || '🚨 LOREM: Demander un Devis Gratuit',
			buttonUrl: prestationsPage.ctaSection?.buttonUrl || '/contact',
			benefits:
				prestationsPage.ctaSection?.benefits && prestationsPage.ctaSection.benefits.length > 0
					? prestationsPage.ctaSection.benefits.map((item, i) => ({
							...item,
							benefit: item.benefit || `🚨 LOREM: Avantage ${i + 1}`,
						}))
					: [
							{ benefit: '🚨 LOREM: Devis gratuit sous 24h', id: 'lorem-cta-benefit-1' },
							{ benefit: "🚨 LOREM: 50% de crédit d'impôt", id: 'lorem-cta-benefit-2' },
							{ benefit: '🚨 LOREM: Approche écologique', id: 'lorem-cta-benefit-3' },
						],
		},
	}
}

export default async function PrestationsPage() {
	// Fetch all data from Payload CMS
	const [prestationsPageRaw, services] = await Promise.all([getPrestationsPageData(), getServices()])

	// Add Lorem Ipsum fallbacks to easily identify missing content
	const prestationsPage = addLoremFallbacks(prestationsPageRaw)

	// Transform taxCreditEligibility data to tabs format
	const eligibleImageUrl = getMediaUrl(prestationsPage.taxCreditEligibility?.eligibleImage) || ''
	const nonEligibleImageUrl = getMediaUrl(prestationsPage.taxCreditEligibility?.nonEligibleImage) || ''

	const tabs = [
		{
			value: 'eligible',
			icon: <CheckCircle2 className="h-auto w-4 shrink-0" />,
			label: "Éligible au crédit d'impôt",
			content: {
				title: prestationsPage.taxCreditEligibility?.eligibleTitle || '',
				description: prestationsPage.taxCreditEligibility?.eligibleDescription || '',
				items: (prestationsPage.taxCreditEligibility?.eligibleItems || []).map(item => ({
					text: item.title,
					description: item.description || undefined,
				})),
				imageSrc: eligibleImageUrl,
				imageAlt: "Prestations éligibles au crédit d'impôt",
			},
		},
		{
			value: 'non-eligible',
			icon: <XCircle className="h-auto w-4 shrink-0" />,
			label: 'Non éligible',
			content: {
				title: prestationsPage.taxCreditEligibility?.nonEligibleTitle || '',
				description: prestationsPage.taxCreditEligibility?.nonEligibleDescription || '',
				items: (prestationsPage.taxCreditEligibility?.nonEligibleItems || []).map(item => ({
					text: item.title,
					description: item.description || undefined,
				})),
				imageSrc: nonEligibleImageUrl,
				imageAlt: "Prestations non éligibles au crédit d'impôt",
			},
		},
	]

	const heroImageUrl = getMediaUrl(prestationsPage.hero?.image)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={prestationsPage.hero?.title || ''}
				imageSrc={heroImageUrl || ''}
				imageAlt="Prestations paysagistes écologiques"
			/>

			{/* Services Grid */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{services.map(service => (
							<Link
								key={service.id}
								href={`/prestations/${service.slug}`}
								className="hover:scale-105 transition-all duration-300 cursor-pointer"
							>
								<ServiceCard service={service} showImage={true} />
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Tax Credit Eligibility Section with Tabs */}
			<TaxCreditEligibility
				heading={prestationsPage.taxCreditEligibility?.title || ''}
				description={prestationsPage.taxCreditEligibility?.description || ''}
				tabs={tabs}
			/>

			{/* CTA Section with Shader */}
			<CtaShader
				title={prestationsPage.ctaSection?.title || ''}
				description={prestationsPage.ctaSection?.description || ''}
				buttonText={prestationsPage.ctaSection?.buttonText || ''}
				buttonUrl={prestationsPage.ctaSection?.buttonUrl || '/contact'}
				items={(prestationsPage.ctaSection?.benefits || [])
					.map(item => item.benefit)
					.filter((item): item is string => !!item)}
			/>
		</div>
	)
}
