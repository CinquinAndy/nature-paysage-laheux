import type { Metadata } from 'next'
import { FaqShortSection } from '@/components/sections/home/faq-short-section'
import { FinalCtaSection } from '@/components/sections/home/final-cta-section'
import { HeroSection } from '@/components/sections/home/hero-section'
import { InterventionZoneSection } from '@/components/sections/home/intervention-zone-section'
import { PhilosophySection } from '@/components/sections/home/philosophy-section'
import { RealisationsPreviewSection } from '@/components/sections/home/realisations-preview-section'
import { ServicesPreviewSection } from '@/components/sections/home/services-preview-section'
import { TaxCreditSection } from '@/components/sections/home/tax-credit-section'
import { ValuesSection } from '@/components/sections/home/values-section'
import { getFeaturedServices, getHomepageData, getHomepageFaq, getLatestRealisations } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'
import type { Homepage } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
	const homepage = await getHomepageData()

	return generateSEOMetadata(homepage, '/', {
		fallbackTitle: 'Nature Paysage Laheux - Éco-Paysagiste Loire-Atlantique',
		fallbackDescription:
			"Jean-Luc Laheux, éco-paysagiste en Loire-Atlantique. Entretien de jardin écologique, taille, potagers. 50% de crédit d'impôt. Devis gratuit.",
	})
}

/**
 * Add Lorem Ipsum fallback values to homepage data to easily identify missing content
 */
function addLoremFallbacks(homepage: Homepage): Homepage {
	return {
		...homepage,
		hero: {
			...homepage.hero,
			title: homepage.hero?.title || '🚨 LOREM: **Transformez** Votre Jardin en Paradis',
		},
		values: {
			...homepage.values,
			sectionTitle:
				homepage.values?.sectionTitle || '🚨 LOREM: Une Approche **Écologique** et Sur-Mesure pour Votre Jardin',
			image: homepage.values?.image || null,
			valuesList:
				homepage.values?.valuesList && homepage.values.valuesList.length > 0
					? homepage.values.valuesList.map((v, i) => ({
							...v,
							icon: v.icon || 'leaf',
							number: v.number || `0${i + 1}`,
							title: v.title || `🚨 LOREM: Valeur ${i + 1}`,
							description:
								v.description ||
								'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
						}))
					: [
							{
								icon: 'leaf' as const,
								number: '01',
								title: '🚨 LOREM: Écologique',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
								id: 'lorem-1',
							},
							{
								icon: 'wrench' as const,
								number: '02',
								title: '🚨 LOREM: Professionnel',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
								id: 'lorem-2',
							},
							{
								icon: 'map-pin' as const,
								number: '03',
								title: '🚨 LOREM: Local',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
								id: 'lorem-3',
							},
							{
								icon: 'trending-down' as const,
								number: '04',
								title: '🚨 LOREM: Économique',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
								id: 'lorem-4',
							},
						],
		},
		servicesPreview: {
			...homepage.servicesPreview,
			title: homepage.servicesPreview?.title || "🚨 LOREM: Mes Prestations d'Entretien de Jardin",
			subtitle:
				homepage.servicesPreview?.subtitle ||
				"🚨 LOREM: Toutes mes prestations bénéficient de 50% de réduction d'impôt",
			ctaLabel: homepage.servicesPreview?.ctaLabel || '🚨 LOREM: Voir Toutes Mes Prestations',
			ctaUrl: homepage.servicesPreview?.ctaUrl || '/prestations',
		},
		philosophy: {
			...homepage.philosophy,
			title: homepage.philosophy?.title || '🚨 LOREM: Mon Approche : **Nature & Respect**',
			introText:
				homepage.philosophy?.introText ||
				"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Je crois en une approche écologique et respectueuse de l'environnement pour chaque jardin.",
			quote:
				homepage.philosophy?.quote ||
				'🚨 LOREM: "Le jardin est le prolongement de votre maison, il mérite le même soin."',
			primaryImage: homepage.philosophy?.primaryImage || null,
			imageOverlayTitle: homepage.philosophy?.imageOverlayTitle || '🚨 LOREM: Travail Naturel',
			imageOverlayDescription:
				homepage.philosophy?.imageOverlayDescription ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Utilisation de méthodes douces et naturelles.',
			philosophyPoints:
				homepage.philosophy?.philosophyPoints && homepage.philosophy.philosophyPoints.length > 0
					? homepage.philosophy.philosophyPoints.map((p, i) => ({
							...p,
							icon: p.icon || 'leaf',
							title: p.title || `🚨 LOREM: Point Philosophie ${i + 1}`,
							description:
								p.description ||
								'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
						}))
					: [
							{
								icon: 'leaf' as const,
								title: '🚨 LOREM: Écologique',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
								id: 'lorem-phil-1',
							},
							{
								icon: 'heart' as const,
								title: '🚨 LOREM: Passionné',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
								id: 'lorem-phil-2',
							},
							{
								icon: 'award' as const,
								title: '🚨 LOREM: Qualité',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
								id: 'lorem-phil-3',
							},
							{
								icon: 'shield' as const,
								title: '🚨 LOREM: Fiable',
								description:
									'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
								id: 'lorem-phil-4',
							},
						],
			preferences:
				homepage.philosophy?.preferences && homepage.philosophy.preferences.length > 0
					? homepage.philosophy.preferences.map((p, i) => ({
							...p,
							title: p.title || `🚨 LOREM: Préférence ${i + 1}`,
							description: p.description || '🚨 LOREM: Description courte de la préférence',
						}))
					: [
							{
								title: '🚨 LOREM: Méthodes naturelles',
								description: '🚨 LOREM: Description courte de la préférence',
								id: 'lorem-pref-1',
							},
							{
								title: '🚨 LOREM: Compost et paillage',
								description: '🚨 LOREM: Description courte de la préférence',
								id: 'lorem-pref-2',
							},
						],
			refusals:
				homepage.philosophy?.refusals && homepage.philosophy.refusals.length > 0
					? homepage.philosophy.refusals.map((r, i) => ({
							...r,
							title: r.title || `🚨 LOREM: Refus ${i + 1}`,
							description: r.description || '🚨 LOREM: Description courte du refus',
						}))
					: [
							{
								title: '🚨 LOREM: Pesticides chimiques',
								description: '🚨 LOREM: Description courte du refus',
								id: 'lorem-ref-1',
							},
							{
								title: '🚨 LOREM: Engrais synthétiques',
								description: '🚨 LOREM: Description courte du refus',
								id: 'lorem-ref-2',
							},
						],
			engagementBanner: {
				...homepage.philosophy?.engagementBanner,
				title: homepage.philosophy?.engagementBanner?.title || '🚨 LOREM: Mon Engagement Qualité',
				description:
					homepage.philosophy?.engagementBanner?.description ||
					"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Je m'engage à fournir un service de qualité.",
				ctaLabel: homepage.philosophy?.engagementBanner?.ctaLabel || '🚨 LOREM: Me Contacter',
				ctaUrl: homepage.philosophy?.engagementBanner?.ctaUrl || '/contact',
			},
		},
		interventionZone: {
			...homepage.interventionZone,
			title: homepage.interventionZone?.title || "🚨 LOREM: Ma Zone d'Intervention",
			subtitle:
				homepage.interventionZone?.subtitle || '🚨 LOREM: Je me déplace dans un rayon de 20km autour de ma commune',
			mapCenterLat: homepage.interventionZone?.mapCenterLat ?? 47.1339,
			mapCenterLng: homepage.interventionZone?.mapCenterLng ?? -1.3433,
			radiusKm: homepage.interventionZone?.radiusKm ?? 20,
			communes:
				homepage.interventionZone?.communes && homepage.interventionZone.communes.length > 0
					? homepage.interventionZone.communes.map((c, i) => ({
							...c,
							name: c.name || `🚨 LOREM: Commune ${i + 1}`,
						}))
					: [
							{ name: '🚨 LOREM: Saint-Aignan-Grandlieu', id: 'lorem-commune-1' },
							{ name: '🚨 LOREM: Nantes', id: 'lorem-commune-2' },
							{ name: '🚨 LOREM: Rezé', id: 'lorem-commune-3' },
						],
			ctaSection: {
				...homepage.interventionZone?.ctaSection,
				title: homepage.interventionZone?.ctaSection?.title || '🚨 LOREM: Vous Habitez dans le Secteur ?',
				description:
					homepage.interventionZone?.ctaSection?.description ||
					'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contactez-moi pour un devis gratuit.',
				ctaLabel: homepage.interventionZone?.ctaSection?.ctaLabel || '🚨 LOREM: Demander un Devis',
				ctaUrl: homepage.interventionZone?.ctaSection?.ctaUrl || '/contact',
			},
		},
		realisationsPreview: {
			...homepage.realisationsPreview,
			title: homepage.realisationsPreview?.title || '🚨 LOREM: Découvrez Mes Réalisations',
			description:
				homepage.realisationsPreview?.description ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Voici quelques exemples de mes travaux récents.',
			ctaLabel: homepage.realisationsPreview?.ctaLabel || '🚨 LOREM: Voir Toutes Mes Réalisations',
			ctaUrl: homepage.realisationsPreview?.ctaUrl || '/realisations',
		},
		faqShort: {
			...homepage.faqShort,
			title: homepage.faqShort?.title || '🚨 LOREM: Questions Fréquentes',
			description:
				homepage.faqShort?.description ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Retrouvez les réponses aux questions les plus fréquentes.',
			ctaLabel: homepage.faqShort?.ctaLabel || '🚨 LOREM: Voir Toutes les Questions',
			ctaUrl: homepage.faqShort?.ctaUrl || '/faq',
		},
		taxCredit: {
			...homepage.taxCredit,
			title: homepage.taxCredit?.title || "🚨 LOREM: Comment Profiter de 50% de Réduction d'Impôt ?",
			subtitle:
				homepage.taxCredit?.subtitle ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suivez ces étapes simples.',
			steps:
				homepage.taxCredit?.steps && homepage.taxCredit.steps.length > 0
					? homepage.taxCredit.steps.map((s, i) => ({
							...s,
							number: s.number ?? i + 1,
							title: s.title || `🚨 LOREM: Étape ${i + 1}`,
							description:
								s.description ||
								"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Description de l'étape.",
							image1: s.image1 || null,
							image2: s.image2 || null,
						}))
					: [
							{
								number: 1,
								title: '🚨 LOREM: Étape 1',
								description:
									"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Description de l'étape.",
								image1: null,
								image2: null,
								id: 'lorem-step-1',
							},
							{
								number: 2,
								title: '🚨 LOREM: Étape 2',
								description:
									"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Description de l'étape.",
								image1: null,
								image2: null,
								id: 'lorem-step-2',
							},
							{
								number: 3,
								title: '🚨 LOREM: Étape 3',
								description:
									"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Description de l'étape.",
								image1: null,
								image2: null,
								id: 'lorem-step-3',
							},
							{
								number: 4,
								title: '🚨 LOREM: Étape 4',
								description:
									"🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Description de l'étape.",
								image1: null,
								image2: null,
								id: 'lorem-step-4',
							},
						],
		},
		finalCta: {
			...homepage.finalCta,
			title: homepage.finalCta?.title || '🚨 LOREM: Prêt à Redonner Vie à Votre Jardin ?',
			description:
				homepage.finalCta?.description ||
				'🚨 LOREM: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contactez-moi dès maintenant pour un devis gratuit et sans engagement.',
			buttonText: homepage.finalCta?.buttonText || '🚨 LOREM: Demander un Devis Gratuit',
			buttonUrl: homepage.finalCta?.buttonUrl || '/contact',
			benefits:
				homepage.finalCta?.benefits && homepage.finalCta.benefits.length > 0
					? homepage.finalCta.benefits.map((b, i) => ({
							...b,
							benefit: b.benefit || `🚨 LOREM: Avantage ${i + 1}`,
						}))
					: [
							{ benefit: '🚨 LOREM: Devis gratuit sous 24h', id: 'lorem-benefit-1' },
							{ benefit: "🚨 LOREM: 50% de crédit d'impôt", id: 'lorem-benefit-2' },
							{ benefit: '🚨 LOREM: Approche écologique', id: 'lorem-benefit-3' },
						],
		},
	}
}

export default async function HomePage() {
	// Fetch all data from Payload CMS
	const [homepageRaw, services, realisations, faqItems] = await Promise.all([
		getHomepageData(),
		getFeaturedServices(6),
		getLatestRealisations(6),
		getHomepageFaq(4),
	])

	// Add Lorem Ipsum fallbacks to easily identify missing content
	const homepage = addLoremFallbacks(homepageRaw)

	return (
		<>
			<div className="">
				<HeroSection data={homepage.hero} />
			</div>
			<div className="transform translate-y-[-75px]">
				<ValuesSection data={homepage.values} />
				<ServicesPreviewSection data={homepage.servicesPreview} services={services} />
				<PhilosophySection data={homepage.philosophy} />
				<InterventionZoneSection data={homepage.interventionZone} />
				<RealisationsPreviewSection data={homepage.realisationsPreview} realisations={realisations} />
				<FaqShortSection data={homepage.faqShort} faqItems={faqItems} />
				<TaxCreditSection data={homepage.taxCredit} />
				<FinalCtaSection data={homepage.finalCta} />
			</div>
		</>
	)
}
