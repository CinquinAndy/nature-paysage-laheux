// biome-ignore lint/suspicious/noExplicitAny: Payload types are not fully typed in migration context
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CONTACT_INFO } from '@/lib/data/contact-info'
import { FAQ_ITEMS } from '@/lib/data/faq'
import { REALISATIONS } from '@/lib/data/realisations'
import { SERVICES, TAX_CREDIT_INFO } from '@/lib/data/services'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Secure API endpoint to migrate all data to Payload CMS
 *
 * Usage: GET/POST /api/migrate-all?secret=YOUR_PAYLOAD_SECRET
 *
 * This will:
 * - Check for duplicates before creating
 * - Upload images to S3 via Payload
 * - Migrate all collections (Services, Realisations, FAQ)
 * - Migrate all globals (Homepage, Site Settings, Page configs)
 */

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
			type: 'root',
			format: '',
			indent: 0,
			version: 1,
			children: paragraphs.map(para => ({
				type: 'paragraph',
				format: '',
				indent: 0,
				version: 1,
				children: [
					{
						type: 'text',
						format: 0,
						text: para.trim(),
						mode: 'normal',
						style: '',
						detail: 0,
						version: 1,
					},
				],
				direction: 'ltr',
			})),
			direction: 'ltr',
		},
	}
}

/**
 * Upload image from public folder to Payload Media collection
 */
async function uploadImage(payload: any, imagePath: string): Promise<string | null> {
	if (!imagePath) return null

	// Remove leading slash and "usable/" prefix
	const cleanPath = imagePath.replace(/^\//, '').replace(/^usable\//, '')
	const fullPath = path.join(process.cwd(), 'public', 'usable', cleanPath)

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
async function migrateServices(payload: any) {
	const results = { success: 0, skipped: 0, failed: 0 }

	// Check for existing services to avoid duplicates
	const existingServices = await payload.find({
		collection: 'services',
		limit: 1000,
	})
	const existingSlugs = new Set(existingServices.docs.map((s: any) => s.slug))

	for (let i = 0; i < SERVICES.length; i++) {
		const service = SERVICES[i]

		// Skip if already exists
		if (existingSlugs.has(service.id)) {
			results.skipped++
			continue
		}

		try {
			// Upload image
			const imageId = await uploadImage(payload, service.image || '')

			// Upload gallery images (required field)
			const galleryImages = []
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

			results.success++
		} catch (error) {
			console.error(`❌ Failed to migrate service ${service.title}:`, error)
			results.failed++
		}
	}

	return results
}

/**
 * Migrate Realisations Collection
 */
async function migrateRealisations(payload: any) {
	const results = { success: 0, skipped: 0, failed: 0 }

	// Check for existing realisations to avoid duplicates
	const existingRealisations = await payload.find({
		collection: 'realisations',
		limit: 1000,
	})
	const existingSlugs = new Set(existingRealisations.docs.map((r: any) => r.slug))

	for (const realisation of REALISATIONS) {
		// Skip if already exists
		if (existingSlugs.has(realisation.id)) {
			results.skipped++
			continue
		}

		try {
			// Upload main image
			const imageId = await uploadImage(payload, realisation.image)

			// Upload gallery images (using main image if no additional images)
			const galleryImages = []
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

			results.success++
		} catch (error) {
			console.error(`❌ Failed to migrate realisation ${realisation.title}:`, error)
			results.failed++
		}
	}

	return results
}

/**
 * Migrate FAQ Collection
 */
async function migrateFAQ(payload: any) {
	const results = { success: 0, skipped: 0, failed: 0 }

	// Check for existing FAQs to avoid duplicates
	const existingFAQs = await payload.find({
		collection: 'faq',
		limit: 1000,
	})
	const existingQuestions = new Set(existingFAQs.docs.map((f: any) => f.question))

	for (let i = 0; i < FAQ_ITEMS.length; i++) {
		const faq = FAQ_ITEMS[i]

		// Skip if already exists
		if (existingQuestions.has(faq.question)) {
			results.skipped++
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

			results.success++
		} catch (error) {
			console.error(`❌ Failed to migrate FAQ ${faq.question}:`, error)
			results.failed++
		}
	}

	return results
}

/**
 * Migrate all globals (pages)
 */
async function migrateGlobals(payload: any) {
	const results: Record<string, string> = {}

	// Upload placeholder images
	const heroBgImage = await uploadImage(payload, '/usable/background.jpg')
	const valuesImage = await uploadImage(payload, '/usable/jardin_paysagiste_travail.jpg')

	// Homepage
	try {
		await payload.updateGlobal({
			slug: 'homepage',
			data: {
				hero: {
					backgroundImage: heroBgImage,
					title: "**Transformez** Votre Jardin, Votre Paysagiste d'Exception en Loire-Atlantique",
				},
				values: {
					sectionTitle: 'Une Approche **Écologique** et Sur-Mesure',
					image: valuesImage,
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
				servicesPreview: {
					title: "Mes Prestations d'Entretien de Jardin",
					subtitle: "Toutes mes prestations bénéficient de 50% de réduction d'impôt",
					ctaLabel: 'Voir Toutes Mes Prestations',
					ctaUrl: '/prestations',
				},
				philosophy: {
					title: 'Mon Approche : **Nature & Respect**',
					introText:
						'Passionné par le végétal et la biodiversité, je pratique un jardinage en harmonie avec la nature.',
					quote: 'travailler AVEC la nature, pas contre elle.',
					primaryImage: valuesImage,
					imageOverlayTitle: 'Une Démarche Écologique Profonde',
					imageOverlayDescription: "Chaque jardin mérite d'être un havre de biodiversité",
					philosophyPoints: [
						{
							icon: 'leaf',
							title: 'Méthodes Naturelles',
							description: 'Désherbage manuel, engrais organiques, paillage végétal.',
						},
						{
							icon: 'heart',
							title: 'Respect des Cycles',
							description: 'Taille raisonnée selon les saisons.',
						},
						{
							icon: 'award',
							title: 'Valorisation des Déchets',
							description: 'Compostage, paillage, broyage.',
						},
						{
							icon: 'shield',
							title: 'Engagement Qualité',
							description: 'Travail soigné et conseil personnalisé.',
						},
					],
					preferences: [
						{ title: 'Désherbage manuel', description: 'Préserve la vie du sol' },
						{ title: 'Engrais biologiques', description: 'Nourrissent durablement' },
					],
					refusals: [
						{ title: 'Produits phytosanitaires', description: 'Néfastes' },
						{ title: 'Désherbants chimiques', description: 'Détruisent le sol' },
					],
					engagementBanner: {
						title: 'Un Engagement Fort',
						description: "Je m'engage pour votre jardin.",
						ctaLabel: 'Me Contacter',
						ctaUrl: '/contact',
					},
				},
				interventionZone: {
					title: "Zone d'Intervention",
					subtitle: "Basé à Monnières, j'interviens dans un rayon de 20 km",
					mapCenterLat: 47.1339,
					mapCenterLng: -1.3433,
					radiusKm: 20,
					communes: [{ name: 'Monnières' }, { name: 'Vallet' }, { name: 'Clisson' }, { name: 'Le Pallet' }],
					ctaSection: {
						title: "Votre commune n'est pas dans la liste ?",
						description: "N'hésitez pas à me contacter !",
						ctaLabel: 'Me Contacter',
						ctaUrl: '/contact',
					},
				},
				realisationsPreview: {
					title: 'Découvrez Mes Réalisations',
					description: 'Entretien naturel et aménagements paysagers en Loire-Atlantique.',
					ctaLabel: 'Voir Toutes Mes Réalisations',
					ctaUrl: '/realisations',
				},
				faqShort: {
					title: 'Questions Fréquentes',
					description: 'Les réponses aux questions les plus courantes.',
					ctaLabel: 'Voir Toutes les Questions',
					ctaUrl: '/faq',
				},
				taxCredit: {
					title: "Comment Profiter de 50% de Réduction d'Impôt ?",
					subtitle: 'Tous mes services sont éligibles',
					steps: TAX_CREDIT_INFO.steps.map(step => ({
						number: step.number,
						title: step.title,
						description: step.description,
						image1: null,
						image2: null,
					})),
				},
				finalCta: {
					title: 'Prêt à Redonner Vie à Votre Jardin ?',
					description: 'Contactez-moi pour un devis gratuit.',
					buttonText: 'Demander un Devis Gratuit',
					buttonUrl: '/contact',
					benefits: [
						{ benefit: 'Devis gratuit' },
						{ benefit: "50% de crédit d'impôt" },
						{ benefit: 'Méthodes écologiques' },
					],
				},
			},
		})
		results.homepage = '✓'
	} catch (error: any) {
		results.homepage = `❌ ${error.message}`
	}

	// Site Settings
	try {
		await payload.updateGlobal({
			slug: 'site-settings',
			data: {
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
		results.siteSettings = '✓'
	} catch (error: any) {
		results.siteSettings = `❌ ${error.message}`
	}

	// Other pages (simplified for brevity - just populate minimal data)
	const pages = [
		{ slug: 'prestations-page', title: 'Mes Prestations Écologiques' },
		{ slug: 'realisations-page', title: 'Mes Réalisations' },
		{ slug: 'faq-page', title: 'Questions Fréquentes' },
		{ slug: 'contact-page', title: 'Contactez-Moi' },
		{ slug: 'mentions-legales-page', title: 'Mentions Légales' },
	]

	for (const page of pages) {
		try {
			await payload.updateGlobal({
				slug: page.slug,
				data: {
					hero: {
						title: page.title,
						image: null,
					},
				},
			})
			results[page.slug] = '✓'
		} catch (error: any) {
			results[page.slug] = `❌ ${error.message}`
		}
	}

	return results
}

// ============================================
// API ROUTE HANDLER
// ============================================

export async function GET(request: NextRequest) {
	// Security: require secret key
	const secret = request.nextUrl.searchParams.get('secret')
	if (secret !== process.env.PAYLOAD_SECRET) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const payload = await getPayload({ config })

		const results = {
			services: await migrateServices(payload),
			realisations: await migrateRealisations(payload),
			faq: await migrateFAQ(payload),
			globals: await migrateGlobals(payload),
			timestamp: new Date().toISOString(),
		}

		return NextResponse.json({
			success: true,
			message: 'Migration completed!',
			results,
		})
	} catch (error: any) {
		console.error('Migration failed:', error)
		return NextResponse.json(
			{
				success: false,
				error: error.message,
				stack: error.stack,
			},
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	return GET(request)
}
