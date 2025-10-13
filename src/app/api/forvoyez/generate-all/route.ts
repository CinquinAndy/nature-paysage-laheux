import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function generateAltTextForMedia(
	payload: Payload,
	mediaId: string | number,
	origin: string,
): Promise<{ success: boolean; alt?: string; error?: string }> {
	try {
		const media = await payload.findByID({
			collection: 'media',
			id: mediaId,
		})

		if (!media || !media.url) {
			return { success: false, error: 'Media not found or no URL' }
		}

		// Get image URL
		let imageUrl = media.url
		if (imageUrl.startsWith('/')) {
			imageUrl = `${origin}${imageUrl}`
		}

		// Fetch the image
		const imageResponse = await fetch(imageUrl)
		if (!imageResponse.ok) {
			return { success: false, error: 'Failed to fetch image' }
		}

		const imageBlob = await imageResponse.blob()

		// Prepare FormData for ForVoyez API
		const formData = new FormData()
		formData.append('image', imageBlob, media.filename || 'image.jpg')
		formData.append('language', 'fr')

		const schema = JSON.stringify({
			alternativeText: 'string',
		})
		formData.append('schema', schema)

		// Call ForVoyez API
		const forvoyezToken = process.env.FORVOYEZ_TOKEN
		if (!forvoyezToken) {
			return { success: false, error: 'ForVoyez token not configured' }
		}

		const forvoyezResponse = await fetch('https://forvoyez.com/api/describe', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${forvoyezToken}`,
			},
			body: formData,
		})

		if (!forvoyezResponse.ok) {
			return { success: false, error: `ForVoyez API error: ${forvoyezResponse.status}` }
		}

		const forvoyezData = await forvoyezResponse.json()
		const altText = forvoyezData.alternativeText || forvoyezData.caption || forvoyezData.title || ''

		// Update the media document
		await payload.update({
			collection: 'media',
			id: mediaId,
			data: {
				alt: altText,
			},
		})

		return { success: true, alt: altText }
	} catch (error) {
		console.error(`Error generating alt text for media ${mediaId}:`, error)
		return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
	}
}

export async function POST(req: NextRequest) {
	try {
		const payload = await getPayload({ config })

		// Get all media without alt text
		const mediaWithoutAlt = await payload.find({
			collection: 'media',
			where: {
				or: [{ alt: { equals: null } }, { alt: { equals: '' } }],
			},
			limit: 1000,
		})

		const totalCount = mediaWithoutAlt.docs.length

		if (totalCount === 0) {
			return NextResponse.json({
				success: true,
				message: 'No media without alt text found',
				total: 0,
				processed: 0,
				succeeded: 0,
				failed: 0,
			})
		}

		const origin = req.nextUrl.origin
		const results = {
			total: totalCount,
			processed: 0,
			succeeded: 0,
			failed: 0,
			details: [] as Array<{
				id: string | number
				filename: string | null | undefined
				success: boolean
				alt?: string
				error?: string
			}>,
		}

		// Process images sequentially to avoid rate limiting
		for (const media of mediaWithoutAlt.docs) {
			const result = await generateAltTextForMedia(payload, media.id, origin)
			results.processed++

			if (result.success) {
				results.succeeded++
			} else {
				results.failed++
			}

			results.details.push({
				id: media.id,
				filename: media.filename,
				success: result.success,
				alt: result.alt,
				error: result.error,
			})

			// Optional: Add a small delay between requests to avoid overwhelming ForVoyez API
			await new Promise((resolve) => setTimeout(resolve, 500))
		}

		return NextResponse.json({
			success: true,
			message: `Processed ${results.processed} images: ${results.succeeded} succeeded, ${results.failed} failed`,
			...results,
		})
	} catch (error) {
		console.error('Error in bulk alt text generation:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}

