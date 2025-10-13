import fs from 'node:fs'
import path from 'node:path'
import config from '@payload-config'
import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

/**
 * Export all Payload CMS data to a JSON backup file
 *
 * Usage: GET /api/export-data?secret=YOUR_PAYLOAD_SECRET
 *
 * This will create a timestamped backup file in /backups directory with:
 * - All collections (Services, Realisations, FAQ, Media, Users)
 * - All globals (Homepage, SiteSettings, all page configs)
 */

export async function GET(request: NextRequest) {
	// Security: require secret key
	const secret = request.nextUrl.searchParams.get('secret')
	if (secret !== process.env.PAYLOAD_SECRET) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const payload = await getPayload({ config })

		// Export all collections
		const collections = {
			services: await payload.find({
				collection: 'services',
				limit: 1000,
				depth: 2,
			}),
			realisations: await payload.find({
				collection: 'realisations',
				limit: 1000,
				depth: 2,
			}),
			faq: await payload.find({
				collection: 'faq',
				limit: 1000,
			}),
			media: await payload.find({
				collection: 'media',
				limit: 1000,
			}),
			users: await payload.find({
				collection: 'users',
				limit: 1000,
			}),
		}

		// Export all globals
		const globals = {
			homepage: await payload.findGlobal({
				slug: 'homepage',
				depth: 2,
			}),
			siteSettings: await payload.findGlobal({
				slug: 'site-settings',
				depth: 2,
			}),
			prestationsPage: await payload.findGlobal({
				slug: 'prestations-page',
				depth: 2,
			}),
			realisationsPage: await payload.findGlobal({
				slug: 'realisations-page',
				depth: 2,
			}),
			faqPage: await payload.findGlobal({
				slug: 'faq-page',
				depth: 2,
			}),
			contactPage: await payload.findGlobal({
				slug: 'contact-page',
				depth: 2,
			}),
			mentionsLegalesPage: await payload.findGlobal({
				slug: 'mentions-legales-page',
				depth: 2,
			}),
		}

		// Create backup object
		const backup = {
			metadata: {
				exportedAt: new Date().toISOString(),
				version: '1.0',
				source: 'nature-paysage-laheux',
			},
			collections,
			globals,
		}

		// Create backups directory if it doesn't exist
		const backupsDir = path.join(process.cwd(), 'backups')
		if (!fs.existsSync(backupsDir)) {
			fs.mkdirSync(backupsDir, { recursive: true })
		}

		// Generate filename with timestamp
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
		const filename = `payload-backup-${timestamp}.json`
		const filepath = path.join(backupsDir, filename)

		// Write backup file
		fs.writeFileSync(filepath, JSON.stringify(backup, null, 2), 'utf-8')

		// Calculate statistics
		const stats = {
			services: collections.services.docs.length,
			realisations: collections.realisations.docs.length,
			faq: collections.faq.docs.length,
			media: collections.media.docs.length,
			users: collections.users.docs.length,
		}

		return NextResponse.json({
			success: true,
			message: 'Data exported successfully',
			filename,
			filepath: filepath.replace(process.cwd(), ''),
			stats,
			timestamp: new Date().toISOString(),
		})
	} catch (error: unknown) {
		console.error('Export failed:', error)
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				stack: error instanceof Error ? error.stack : undefined,
			},
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	return GET(request)
}
