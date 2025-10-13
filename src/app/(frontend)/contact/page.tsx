import type { Metadata } from 'next'
import { ModernContactForm } from '@/components/sections/contact/modern-contact-form'
import { PageHero } from '@/components/sections/shared/page-hero'
import { getContactPageData, getMediaUrl, getSiteSettings } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'
import type { ContactPage as ContactPageType, SiteSetting } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
	const contactPage = await getContactPageData()

	return generateSEOMetadata(contactPage, '/contact', {
		fallbackTitle: 'Contact | Jean-Luc Laheux Eco-Paysagiste',
		fallbackDescription:
			"Contactez Jean-Luc Laheux pour un devis gratuit. 50% de crédit d'impôt sur toutes mes prestations. Réponse sous 48h.",
	})
}

/**
 * Add Lorem Ipsum fallback values to easily identify missing content
 */
function addLoremFallbacks(
	contactPage: ContactPageType,
	siteSettings: SiteSetting
): { contactPage: ContactPageType; siteSettings: SiteSetting } {
	return {
		contactPage: {
			...contactPage,
			hero: {
				...contactPage.hero,
				title: contactPage.hero?.title || '🚨 LOREM: Contactez-Moi',
				image: contactPage.hero?.image || null,
			},
			formSection: {
				...contactPage.formSection,
				title: contactPage.formSection?.title || '🚨 LOREM: Parlons de Votre Jardin',
				subtitle:
					contactPage.formSection?.subtitle ||
					"🚨 LOREM: Demandez votre devis gratuit et bénéficiez de 50% de crédit d'impôt sur vos prestations.",
				gardenSizeOptions:
					contactPage.formSection?.gardenSizeOptions && contactPage.formSection.gardenSizeOptions.length > 0
						? contactPage.formSection.gardenSizeOptions
						: [
								{ label: '🚨 LOREM: Moins de 100m²', value: '<100', id: 'lorem-1' },
								{ label: '🚨 LOREM: 100-300m²', value: '100-300', id: 'lorem-2' },
								{ label: '🚨 LOREM: 300-500m²', value: '300-500', id: 'lorem-3' },
								{ label: '🚨 LOREM: 500-1000m²', value: '500-1000', id: 'lorem-4' },
								{ label: '🚨 LOREM: Plus de 1000m²', value: '>1000', id: 'lorem-5' },
							],
				privacyText:
					contactPage.formSection?.privacyText ||
					'🚨 LOREM: En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre demande. Réponse sous 48h maximum.',
			},
			contactInfoSidebar: {
				...contactPage.contactInfoSidebar,
				benefits:
					contactPage.contactInfoSidebar?.benefits && contactPage.contactInfoSidebar.benefits.length > 0
						? contactPage.contactInfoSidebar.benefits
						: [
								{ benefit: '🚨 LOREM: Devis gratuit et sans engagement', id: 'lorem-benefit-1' },
								{ benefit: '🚨 LOREM: Visite gratuite', id: 'lorem-benefit-2' },
								{ benefit: '🚨 LOREM: Réponse sous 48h', id: 'lorem-benefit-3' },
								{ benefit: "🚨 LOREM: 50% de crédit d'impôt", id: 'lorem-benefit-4' },
							],
			},
		},
		siteSettings: {
			...siteSettings,
			contact: {
				...siteSettings.contact,
				phone: siteSettings.contact?.phone || '🚨 LOREM: 06 XX XX XX XX',
				email: siteSettings.contact?.email || '🚨 LOREM: contact@example.com',
				company: {
					name: siteSettings.contact?.company?.name || '🚨 LOREM: SASU Nature et Paysage Laheux',
					representative: siteSettings.contact?.company?.representative || '🚨 LOREM: Jean-Luc Laheux',
					legalForm: siteSettings.contact?.company?.legalForm || '🚨 LOREM: SASU',
				},
				address: {
					postalCode: siteSettings.contact?.address?.postalCode || '🚨 LOREM: 44690',
					city: siteSettings.contact?.address?.city || '🚨 LOREM: Monnières',
					region: siteSettings.contact?.address?.region || '🚨 LOREM: Loire-Atlantique',
					country: siteSettings.contact?.address?.country || '🚨 LOREM: France',
				},
				social: {
					facebook: siteSettings.contact?.social?.facebook || null,
					linkedin: siteSettings.contact?.social?.linkedin || null,
				},
				hours: {
					weekday: siteSettings.contact?.hours?.weekday || '🚨 LOREM: 8h00 - 19h00',
					saturday: siteSettings.contact?.hours?.saturday || '🚨 LOREM: Fermé',
					sunday: siteSettings.contact?.hours?.sunday || '🚨 LOREM: Fermé',
					note:
						siteSettings.contact?.hours?.note ||
						"🚨 LOREM: Horaires d'intervention sur rendez-vous selon vos disponibilités",
				},
			},
		},
	}
}

export default async function ContactPage() {
	// Fetch data from Payload CMS
	const [contactPageRaw, siteSettingsRaw] = await Promise.all([getContactPageData(), getSiteSettings()])

	// Add Lorem Ipsum fallbacks
	const { contactPage, siteSettings } = addLoremFallbacks(contactPageRaw, siteSettingsRaw)

	const heroImageUrl = getMediaUrl(contactPage.hero?.image)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={contactPage.hero?.title || 'Contactez-Moi'}
				imageSrc={heroImageUrl || '/usable/IMG_20240310_161440.jpg'}
				imageAlt="Contact Jean-Luc Laheux Eco-Paysagiste"
			/>

			{/* Modern Contact Form */}
			<ModernContactForm
				formSection={contactPage.formSection}
				contactInfo={siteSettings.contact}
				benefits={contactPage.contactInfoSidebar?.benefits}
			/>
		</div>
	)
}
