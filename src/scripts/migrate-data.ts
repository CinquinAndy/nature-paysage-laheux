/**
 * Complete Data Migration Script for Payload CMS
 *
 * This script migrates all existing data from /lib/data/ to Payload CMS:
 * - Collections: Services, Realisations, FAQ
 * - Globals: Homepage, Site Settings, and all page configurations
 *
 * Usage:
 *   pnpm tsx src/scripts/migrate-data.ts
 */

import fs from 'node:fs'
import path from 'node:path'
// Load environment variables BEFORE importing config
import dotenv from 'dotenv'

// Load .env file
dotenv.config()

// Verify PAYLOAD_SECRET is loaded
if (!process.env.PAYLOAD_SECRET) {
	console.error('❌ PAYLOAD_SECRET is not defined in .env file')
	process.exit(1)
}

console.log('✓ Environment variables loaded')
console.log(`  - PAYLOAD_SECRET: ${process.env.PAYLOAD_SECRET.substring(0, 10)}...`)
console.log(`  - DATABASE_URI: ${process.env.DATABASE_URI?.includes('@') ? 'Connected' : 'Missing'}`)

import { getPayload, type Payload } from 'payload'
import { CONTACT_INFO } from '../lib/data/contact-info'
import { FAQ_ITEMS } from '../lib/data/faq'
import { REALISATIONS } from '../lib/data/realisations'
// Import existing data
import { SERVICES, TAX_CREDIT_INFO } from '../lib/data/services'

// Import config after dotenv is loaded
import config from '../payload.config.js'

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert plain text to Lexical JSON format for richText fields
 */
function textToLexical(text: string) {
	const paragraphs = text.split('\n\n').filter(p => p.trim())

	return {
		root: {
			type: 'root' as const,
			format: '' as const,
			indent: 0,
			version: 1,
			children: paragraphs.map(para => ({
				type: 'paragraph' as const,
				format: '' as const,
				indent: 0,
				version: 1,
				children: [
					{
						type: 'text' as const,
						format: 0,
						text: para.trim(),
						mode: 'normal' as const,
						style: '',
						detail: 0,
						version: 1,
					},
				],
				direction: 'ltr' as const,
			})),
			direction: 'ltr' as const,
		},
	}
}

/**
 * Convert markdown-like text to Lexical with bold support
 * **word** becomes bold text
 */
function _markdownToLexical(text: string) {
	const parts = text.split(/(\*\*.*?\*\*)/)
	const children = parts
		.map(part => {
			if (part.startsWith('**') && part.endsWith('**')) {
				return {
					type: 'text',
					format: 1, // 1 = bold
					text: part.slice(2, -2),
					mode: 'normal',
					style: '',
					detail: 0,
					version: 1,
				}
			}
			return {
				type: 'text',
				format: 0,
				text: part,
				mode: 'normal',
				style: '',
				detail: 0,
				version: 1,
			}
		})
		.filter(child => child.text.length > 0)

	return {
		root: {
			type: 'root',
			format: '',
			indent: 0,
			version: 1,
			children: [
				{
					type: 'paragraph',
					format: '',
					indent: 0,
					version: 1,
					children,
					direction: 'ltr',
				},
			],
			direction: 'ltr',
		},
	}
}

/**
 * Upload image from public folder to Payload Media collection
 */
async function uploadImage(payload: Payload, imagePath: string): Promise<number | null> {
	if (!imagePath) return null

	// Support both /clean_images/ and /usable/ paths, and clean them
	const cleanPath = imagePath
		.replace(/^\//, '')
		.replace(/^clean_images\//, '')
		.replace(/^usable\//, '')
	const fullPath = path.join(process.cwd(), 'public', 'clean_images', cleanPath)

	if (!fs.existsSync(fullPath)) {
		console.warn(`⚠️  Image not found: ${fullPath}`)
		return null
	}

	try {
		const fileBuffer = fs.readFileSync(fullPath)
		const fileName = path.basename(fullPath)

		const media = await payload.create({
			collection: 'media',
			data: {
				alt: fileName.replace(/\.[^/.]+$/, ''), // filename without extension
			},
			file: {
				data: fileBuffer,
				mimetype: `image/${path.extname(fileName).slice(1)}`,
				name: fileName,
				size: fileBuffer.length,
			},
		})

		console.log(`✓ Uploaded image: ${fileName}`)
		return media.id
	} catch (error) {
		console.error(`❌ Failed to upload ${imagePath}:`, error)
		return null
	}
}

// ============================================
// MIGRATION FUNCTIONS
// ============================================

/**
 * Migrate Services Collection
 */
async function migrateServices(payload: Payload) {
	console.log('\n📦 Migrating Services...')

	// Check for existing services to avoid duplicates
	const existingServices = await payload.find({
		collection: 'services',
		limit: 1000,
	})
	const existingSlugs = new Set(existingServices.docs.map(s => s.slug))

	for (let i = 0; i < SERVICES.length; i++) {
		const service = SERVICES[i]

		// Skip if already exists
		if (existingSlugs.has(service.id)) {
			console.log(`⏭️  Service already exists: ${service.title}`)
			continue
		}

		try {
			// Upload image
			const imageId = await uploadImage(payload, service.image || '')

			// Skip if main image failed to upload (required field)
			if (!imageId) {
				console.log(`⏭️  Skipping service (no image): ${service.title}`)
				continue
			}

			// Upload gallery images (required field)
			const galleryImages: number[] = []
			if (service.image) {
				const galleryImgId = await uploadImage(payload, service.image)
				if (galleryImgId) galleryImages.push(galleryImgId)
			}

			await payload.create({
				collection: 'services',
				data: {
					title: service.title,
					slug: service.id,
					shortDescription: service.shortDescription,
					fullDescription: textToLexical(service.fullDescription),
					image: imageId,
					images: galleryImages,
					category: service.category,
					features: service.features.map(f => ({ feature: f })),
					eligibleTaxCredit: service.eligibleTaxCredit,
					price: service.price,
					order: i,
					ctaSection: {
						title: 'Intéressé par cette prestation ?',
						description:
							"Demandez votre devis gratuit et bénéficiez de 50% de crédit d'impôt sur toutes mes prestations.",
						buttonText: 'Demander un devis gratuit',
						buttonUrl: '/contact',
						benefits: [
							{ benefit: 'Devis gratuit sous 24h' },
							{ benefit: "50% de crédit d'impôt" },
							{ benefit: 'Méthodes 100% écologiques' },
							{ benefit: 'Conseil personnalisé' },
						],
					},
				},
			})

			console.log(`✓ Migrated service: ${service.title}`)
		} catch (error) {
			console.error(`❌ Failed to migrate service ${service.title}:`, error)
		}
	}
}

/**
 * Migrate Realisations Collection
 */
async function migrateRealisations(payload: Payload) {
	console.log('\n📦 Migrating Realisations...')

	// Check for existing realisations to avoid duplicates
	const existingRealisations = await payload.find({
		collection: 'realisations',
		limit: 1000,
	})
	const existingSlugs = new Set(existingRealisations.docs.map(r => r.slug))

	for (const realisation of REALISATIONS) {
		// Skip if already exists
		if (existingSlugs.has(realisation.id)) {
			console.log(`⏭️  Realisation already exists: ${realisation.title}`)
			continue
		}

		try {
			// Upload main image
			const imageId = await uploadImage(payload, realisation.image)

			// Skip if main image failed to upload (required field)
			if (!imageId) {
				console.log(`⏭️  Skipping realisation (no image): ${realisation.title}`)
				continue
			}

			// Upload gallery images (using main image if no additional images)
			const galleryImages: number[] = []
			if (realisation.images && realisation.images.length > 0) {
				for (const img of realisation.images) {
					const id = await uploadImage(payload, img)
					if (id) galleryImages.push(id)
				}
			} else if (imageId) {
				// Use main image as gallery if no other images
				galleryImages.push(imageId)
			}

			await payload.create({
				collection: 'realisations',
				data: {
					title: realisation.title,
					slug: realisation.id,
					location: realisation.location,
					date: realisation.date,
					image: imageId,
					shortDescription: realisation.shortDescription,
					description: textToLexical(realisation.description),
					category: realisation.category,
					features: realisation.features.map(f => ({ feature: f })),
					images: galleryImages,
					testimonial: {
						quote: '',
						author: '',
						location: '',
					},
					ctaSection: {
						title: 'Un projet similaire ?',
						description:
							"Discutons de votre jardin et créons ensemble un espace écologique qui vous ressemble. Bénéficiez de 50% de crédit d'impôt sur toutes mes prestations.",
						buttonText: 'Demander un devis gratuit',
						buttonUrl: '/contact',
						benefits: [
							{ benefit: 'Visite et devis gratuits' },
							{ benefit: 'Approche personnalisée' },
							{ benefit: "50% de crédit d'impôt" },
							{ benefit: 'Méthodes écologiques' },
						],
					},
				},
			})

			console.log(`✓ Migrated realisation: ${realisation.title}`)
		} catch (error) {
			console.error(`❌ Failed to migrate realisation ${realisation.title}:`, error)
		}
	}
}

/**
 * Migrate FAQ Collection
 */
async function migrateFAQ(payload: Payload) {
	console.log('\n📦 Migrating FAQ...')

	// Check for existing FAQs to avoid duplicates
	const existingFAQs = await payload.find({
		collection: 'faq',
		limit: 1000,
	})
	const existingQuestions = new Set(existingFAQs.docs.map(f => f.question))

	for (let i = 0; i < FAQ_ITEMS.length; i++) {
		const faq = FAQ_ITEMS[i]

		// Skip if already exists
		if (existingQuestions.has(faq.question)) {
			console.log(`⏭️  FAQ already exists: ${faq.question}`)
			continue
		}

		try {
			await payload.create({
				collection: 'faq',
				data: {
					question: faq.question,
					answer: textToLexical(faq.answer),
					category: faq.category,
					showOnHomepage: i < 4, // First 4 on homepage
					order: i,
				},
			})

			console.log(`✓ Migrated FAQ: ${faq.question}`)
		} catch (error) {
			console.error(`❌ Failed to migrate FAQ ${faq.question}:`, error)
		}
	}
}

/**
 * Migrate Homepage Global
 */
async function migrateHomepage(payload: Payload) {
	console.log('\n🌍 Migrating Homepage Global...')

	try {
		// Upload images from clean_images directory
		const heroBgImage = await uploadImage(payload, 'background.webp')
		const valuesImage = await uploadImage(payload, 'jardin_paysagiste_travail.webp')

		// Skip if required images failed to upload
		if (!heroBgImage) {
			console.log('⏭️  Skipping homepage migration (missing hero background image)')
			return
		}

		await payload.updateGlobal({
			slug: 'homepage',
			data: {
				// Hero Section
				hero: {
					backgroundImage: heroBgImage,
					title: "**Transformez** Votre Jardin, Votre Paysagiste d'Exception en Loire-Atlantique",
				},

				// Values Section
				values: {
					sectionTitle: 'Une Approche **Écologique** et Sur-Mesure',
					image: valuesImage || undefined,
					valuesList: [
						{
							icon: 'leaf',
							number: '01',
							title: 'Respect de la Nature',
							description:
								'Zéro produit chimique, méthodes naturelles exclusivement. Je travaille avec la nature, jamais contre elle.',
						},
						{
							icon: 'wrench',
							number: '02',
							title: 'Travail Artisanal',
							description: 'Désherbage manuel, taille raisonnée, entretien attentif. Chaque geste compte.',
						},
						{
							icon: 'map-pin',
							number: '03',
							title: 'Expertise Locale',
							description: 'Basé à Monnières, je connais parfaitement le climat et les sols de Loire-Atlantique.',
						},
						{
							icon: 'trending-down',
							number: '04',
							title: "50% de Crédit d'Impôt",
							description: "Tous mes services bénéficient du crédit d'impôt services à la personne.",
						},
					],
				},

				// Services Preview
				servicesPreview: {
					title: "Mes Prestations d'Entretien de Jardin",
					subtitle: "Toutes mes prestations bénéficient de 50% de réduction d'impôt",
					ctaLabel: 'Voir Toutes Mes Prestations',
					ctaUrl: '/prestations',
				},

				// Philosophy Section
				philosophy: {
					title: 'Mon Approche : **Nature & Respect**',
					introText:
						'Passionné par le végétal et la biodiversité, je pratique un jardinage en harmonie avec la nature. Mon objectif : créer et entretenir des espaces verts vivants, résilients et beaux, sans aucun produit chimique.',
					quote: 'travailler AVEC la nature, pas contre elle.',
					primaryImage: valuesImage || undefined,
					imageOverlayTitle: 'Une Démarche Écologique Profonde',
					imageOverlayDescription: "Chaque jardin mérite d'être un havre de biodiversité",
					philosophyPoints: [
						{
							icon: 'leaf',
							title: 'Méthodes Naturelles',
							description:
								'Désherbage manuel, engrais organiques, paillage végétal. Je refuse tout produit de synthèse.',
						},
						{
							icon: 'heart',
							title: 'Respect des Cycles',
							description:
								'Taille raisonnée selon les saisons, respect de la faune auxiliaire et des périodes de nidification.',
						},
						{
							icon: 'award',
							title: 'Valorisation des Déchets',
							description: 'Compostage, paillage, broyage : rien ne se perd, tout se transforme pour nourrir le sol.',
						},
						{
							icon: 'shield',
							title: 'Engagement Qualité',
							description: 'Travail soigné, conseil personnalisé et transmission des bonnes pratiques écologiques.',
						},
					],
					preferences: [
						{ title: 'Désherbage manuel', description: 'Préserve la vie du sol' },
						{ title: 'Engrais biologiques', description: 'Nourrissent durablement' },
						{ title: 'Paillage organique', description: 'Protège et enrichit' },
						{ title: 'Principes de permaculture', description: 'Autonomie et résilience' },
					],
					refusals: [
						{ title: 'Produits phytosanitaires', description: "Néfastes pour la santé et l'environnement" },
						{ title: 'Désherbants chimiques', description: 'Détruisent la vie du sol' },
						{ title: 'Méthodes intensives', description: 'Épuisent les ressources naturelles' },
					],
					engagementBanner: {
						title: 'Un Engagement Fort pour Votre Jardin',
						description: "Je m'engage à entretenir votre espace vert avec respect, transparence et passion.",
						ctaLabel: 'Découvrir Mon Approche Écologique',
						ctaUrl: '/contact',
					},
				},

				// Intervention Zone
				interventionZone: {
					title: "Zone d'Intervention en Loire-Atlantique",
					subtitle: "Basé à Monnières, j'interviens dans un rayon de 20 km",
					mapCenterLat: 47.1339,
					mapCenterLng: -1.3433,
					radiusKm: 20,
					communes: [
						{ name: 'Monnières' },
						{ name: 'Vallet' },
						{ name: 'Clisson' },
						{ name: 'Le Pallet' },
						{ name: 'La Haie-Fouassière' },
						{ name: 'Gorges' },
						{ name: 'Saint-Fiacre-sur-Maine' },
						{ name: 'Mouzillon' },
						{ name: 'Haute-Goulaine' },
						{ name: 'Basse-Goulaine' },
						{ name: 'La Chapelle-Heulin' },
						{ name: 'Saint-Julien-de-Concelles' },
						{ name: 'Vertou' },
						{ name: 'Aigrefeuille-sur-Maine' },
						{ name: 'Vieillevigne' },
					],
					ctaSection: {
						title: "Votre commune n'est pas dans la liste ?",
						description:
							"N'hésitez pas à me contacter ! J'étudie toutes les demandes et peux parfois me déplacer un peu plus loin.",
						ctaLabel: 'Me Contacter',
						ctaUrl: '/contact',
					},
				},

				// Realisations Preview
				realisationsPreview: {
					title: 'Découvrez Mes Réalisations',
					description:
						'Entretien naturel, aménagements paysagers et potagers en permaculture : découvrez quelques exemples de mes interventions en Loire-Atlantique.',
					ctaLabel: 'Voir Toutes Mes Réalisations',
					ctaUrl: '/realisations',
				},

				// FAQ Short
				faqShort: {
					title: 'Questions Fréquentes',
					description:
						'Retrouvez les réponses aux questions les plus courantes sur mes prestations et mon approche écologique.',
					ctaLabel: 'Voir Toutes les Questions',
					ctaUrl: '/faq',
				},

				// Tax Credit
				taxCredit: {
					title: "Comment Profiter de 50% de Réduction d'Impôt ?",
					subtitle: "Tous mes services d'entretien de jardin sont éligibles au crédit d'impôt Services à la Personne",
					steps: TAX_CREDIT_INFO.steps.map(step => ({
						number: step.number,
						title: step.title,
						description: step.description,
						image1: null,
						image2: null,
					})),
				},

				// Final CTA
				finalCta: {
					title: 'Prêt à Redonner Vie à Votre Jardin ?',
					description:
						'Contactez-moi pour un devis gratuit et sans engagement. Je me déplace chez vous pour évaluer vos besoins.',
					buttonText: 'Demander un Devis Gratuit',
					buttonUrl: '/contact',
					benefits: [
						{ benefit: 'Devis gratuit et sans engagement' },
						{ benefit: "50% de crédit d'impôt sur tous mes services" },
						{ benefit: 'Méthodes 100% écologiques' },
						{ benefit: 'Artisan local et passionné' },
					],
				},
			},
		})

		console.log('✓ Homepage Global migrated successfully')
	} catch (error) {
		console.error('❌ Failed to migrate Homepage:', error)
	}
}

/**
 * Migrate Site Settings Global
 */
async function migrateSiteSettings(payload: Payload) {
	console.log('\n🌍 Migrating Site Settings Global...')

	try {
		await payload.updateGlobal({
			slug: 'site-settings',
			data: {
				// Contact Information only (simplified schema)
				contact: {
					phone: CONTACT_INFO.phone,
					email: CONTACT_INFO.email,
					company: {
						name: CONTACT_INFO.company.name,
						representative: CONTACT_INFO.company.representative,
						legalForm: CONTACT_INFO.company.legalForm,
					},
					address: {
						postalCode: CONTACT_INFO.address.postalCode,
						city: CONTACT_INFO.address.city,
						region: CONTACT_INFO.address.region,
						country: CONTACT_INFO.address.country,
					},
					social: {
						facebook: CONTACT_INFO.social.facebook,
						linkedin: CONTACT_INFO.social.linkedin,
					},
					hours: {
						weekday: CONTACT_INFO.hours.weekday,
						saturday: CONTACT_INFO.hours.saturday,
						sunday: CONTACT_INFO.hours.sunday,
						note: CONTACT_INFO.hours.note,
					},
				},
			},
		})

		console.log('✓ Site Settings Global migrated successfully')
	} catch (error) {
		console.error('❌ Failed to migrate Site Settings:', error)
	}
}

/**
 * Migrate other Page Globals (with default/placeholder content)
 */
async function migrateOtherGlobals(payload: Payload) {
	console.log('\n🌍 Migrating Other Page Globals...')

	// Prestations Page
	try {
		await payload.updateGlobal({
			slug: 'prestations-page',
			data: {
				hero: {
					title: 'Mes Prestations Écologiques',
					image: null,
				},
				taxCreditEligibility: {
					title: "Crédit d'Impôt : Ce Qui Est Pris en Charge",
					description:
						"Tous mes services d'entretien de jardin à domicile bénéficient du crédit d'impôt de 50%. Voici le détail :",
					eligibleItems: [
						{ title: 'Tonte de pelouse', description: 'Entretien régulier de votre gazon' },
						{ title: 'Taille de haies et arbustes', description: 'Taille raisonnée et respectueuse' },
						{ title: 'Débroussaillage', description: 'Nettoyage des espaces verts' },
						{ title: 'Ramassage de feuilles', description: 'Nettoyage automnal' },
						{ title: 'Désherbage manuel', description: 'Sans produits chimiques' },
						{ title: 'Entretien de massifs', description: 'Soins des espaces fleuris' },
						{ title: 'Potager (entretien)', description: 'Entretien de votre potager existant' },
					],
					nonEligibleItems: [
						{ title: 'Création de jardin', description: 'Aménagements neufs' },
						{ title: 'Maçonnerie paysagère', description: 'Terrasses, murets, allées' },
						{ title: 'Installation de clôtures', description: 'Pose de clôtures' },
						{ title: 'Élagage en hauteur', description: 'Travaux nécessitant une nacelle' },
						{ title: 'Potager (création)', description: "Création d'un nouveau potager" },
						{ title: 'Travaux de terrassement', description: 'Déplacements de terre importants' },
					],
					eligibleImage: null,
					nonEligibleImage: null,
				},
				ctaSection: {
					title: 'Une Prestation Vous Intéresse ?',
					description:
						'Contactez-moi pour un devis gratuit et personnalisé. Je me déplace chez vous pour évaluer vos besoins.',
					buttonText: 'Demander un Devis Gratuit',
					buttonUrl: '/contact',
					benefits: [
						{ benefit: 'Devis gratuit sous 24h' },
						{ benefit: "50% de crédit d'impôt" },
						{ benefit: 'Méthodes écologiques' },
						{ benefit: 'Artisan local passionné' },
					],
				},
			},
		})
		console.log('✓ Prestations Page Global migrated')
	} catch (error) {
		console.error('❌ Failed to migrate Prestations Page:', error)
	}

	// Realisations Page
	try {
		await payload.updateGlobal({
			slug: 'realisations-page',
			data: {
				hero: {
					title: 'Mes Réalisations en Loire-Atlantique',
					image: null,
				},
				introduction: {
					paragraph1:
						'Chaque jardin est unique et raconte une histoire. Découvrez quelques-unes de mes interventions en Loire-Atlantique.',
					paragraph2:
						"Du simple entretien régulier aux aménagements paysagers, en passant par les potagers en permaculture, je m'adapte à vos besoins et vos envies.",
				},
				ctaSection: {
					title: 'Envie du Même Résultat Pour Votre Jardin ?',
					description: 'Chaque projet est unique. Parlons ensemble de votre jardin et de vos objectifs.',
					buttonText: 'Me Contacter',
					buttonUrl: '/contact',
					benefits: [
						{ benefit: 'Visite et devis gratuits' },
						{ benefit: 'Approche personnalisée' },
						{ benefit: "50% de crédit d'impôt" },
					],
				},
			},
		})
		console.log('✓ Realisations Page Global migrated')
	} catch (error) {
		console.error('❌ Failed to migrate Realisations Page:', error)
	}

	// FAQ Page
	try {
		await payload.updateGlobal({
			slug: 'faq-page',
			data: {
				hero: {
					title: 'Questions Fréquentes',
					image: null,
				},
				categoryDescriptions: [
					{ category: 'general', description: "Informations générales sur mes services et ma zone d'intervention" },
					{ category: 'services', description: 'Détails sur mes prestations et méthodes de travail' },
					{ category: 'tarifs', description: "Tarification et crédit d'impôt" },
					{ category: 'ecologie', description: 'Mon approche écologique et mes engagements' },
				],
				ctaSection: {
					title: 'Une Autre Question ?',
					description: "N'hésitez pas à me contacter, je réponds généralement sous 24h.",
					buttonText: 'Me Contacter',
					buttonUrl: '/contact',
					benefits: [
						{ benefit: 'Réponse rapide et personnalisée' },
						{ benefit: 'Conseil gratuit' },
						{ benefit: 'Disponible par téléphone ou email' },
					],
				},
			},
		})
		console.log('✓ FAQ Page Global migrated')
	} catch (error) {
		console.error('❌ Failed to migrate FAQ Page:', error)
	}

	// Contact Page
	try {
		await payload.updateGlobal({
			slug: 'contact-page',
			data: {
				hero: {
					title: 'Contactez-Moi',
					image: null,
				},
				formSection: {
					title: 'Parlons de Votre Jardin',
					subtitle: 'Remplissez ce formulaire, je vous réponds sous 24h',
					gardenSizeOptions: [
						{ label: 'Moins de 100 m²', value: 'small' },
						{ label: '100 à 500 m²', value: 'medium' },
						{ label: '500 à 1000 m²', value: 'large' },
						{ label: 'Plus de 1000 m²', value: 'xlarge' },
					],
					privacyText:
						'Vos données personnelles sont utilisées uniquement pour vous répondre et ne sont jamais partagées avec des tiers.',
				},
				contactInfoSidebar: {
					benefits: [
						{ benefit: 'Réponse sous 24h' },
						{ benefit: 'Visite et devis gratuits' },
						{ benefit: 'Sans engagement' },
						{ benefit: 'Conseil personnalisé' },
					],
				},
			},
		})
		console.log('✓ Contact Page Global migrated')
	} catch (error) {
		console.error('❌ Failed to migrate Contact Page:', error)
	}

	// Mentions Legales Page
	try {
		await payload.updateGlobal({
			slug: 'mentions-legales-page',
			data: {
				hero: {
					title: 'Mentions Légales',
					image: null,
				},
				content: textToLexical(
					`
ÉDITEUR DU SITE

Le site nature-paysage-laheux.fr est édité par :
SASU Nature et Paysage Laheux
Représentée par Jean-Luc Laheux, Président
44690 Monnières, France
Email : nature.paysage.laheux@gmail.com
Téléphone : 06 31 04 34 45

AGRÉMENT SERVICES À LA PERSONNE

Numéro d'agrément : [À compléter]
Membre de la coopérative Unipros

HÉBERGEMENT

Le site est hébergé par Vercel Inc.
340 S Lemon Ave #4133, Walnut, CA 91789, USA

CRÉATION DU SITE

Conception et développement : Andy Cinquin
Site web : https://andycinquin.com

DROIT D'AUTEUR

L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de Nature et Paysage Laheux, sauf mention contraire.

CRÉDITS PHOTOGRAPHIQUES

Toutes les photographies présentes sur ce site ont été réalisées par Nature et Paysage Laheux lors de ses interventions.

PROTECTION DES DONNÉES PERSONNELLES

Les données personnelles collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes et ne sont jamais transmises à des tiers.
Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de modification et de suppression de vos données.
Pour exercer ce droit, contactez-nous à : nature.paysage.laheux@gmail.com

LIMITATION DE RESPONSABILITÉ

Nature et Paysage Laheux s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne peut garantir l'absence d'erreurs ou d'omissions.

DROIT APPLICABLE

Le présent site est soumis au droit français.
				`.trim()
				),
			},
		})
		console.log('✓ Mentions Legales Page Global migrated')
	} catch (error) {
		console.error('❌ Failed to migrate Mentions Legales Page:', error)
	}
}

// ============================================
// MAIN MIGRATION FUNCTION
// ============================================

async function migrate() {
	console.log('🚀 Starting Payload CMS Data Migration...\n')

	console.log('='.repeat(50))

	try {
		// Build new config with overridden secret
		const payloadSecret = process.env.PAYLOAD_SECRET
		if (!payloadSecret) {
			throw new Error('PAYLOAD_SECRET is not defined')
		}
		const configWithSecret = Object.assign({}, config, {
			secret: payloadSecret,
		})

		// Initialize Payload
		const payload = await getPayload({ config: configWithSecret })
		console.log('✓ Payload initialized\n')

		// Run migrations in order
		await migrateServices(payload)
		await migrateRealisations(payload)
		await migrateFAQ(payload)
		await migrateHomepage(payload)
		await migrateSiteSettings(payload)
		await migrateOtherGlobals(payload)

		console.log(`\n${'='.repeat(50)}`)
		console.log('✅ Migration completed successfully!')
		console.log('\nYou can now access the Payload Admin at: http://localhost:3002/admin')
		console.log('Create your first admin user to start managing content.')

		process.exit(0)
	} catch (error) {
		console.error('\n❌ Migration failed:', error)
		process.exit(1)
	}
}

// Run migration
migrate()
