import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { generateAltText } from '@/lib/forvoyez/generate-alt-text'

export async function POST(req: NextRequest) {
	try {
		const { mediaId } = await req.json()

		if (!mediaId) {
			return NextResponse.json({ error: 'Media ID is required' }, { status: 400 })
		}

		const payload = await getPayload({ config })

		// Get the media document
		const media = await payload.findByID({
			collection: 'media',
			id: mediaId,
		})

		if (!media) {
			return NextResponse.json({ error: 'Media not found' }, { status: 404 })
		}

		// Get the image URL (Payload serves S3 images via /api/media/file/)
		let imageUrl = media.url

		if (!imageUrl) {
			return NextResponse.json({ error: 'Image URL not found' }, { status: 404 })
		}

		// Convert relative URL to absolute for fetch
		if (imageUrl.startsWith('/')) {
			const origin = req.nextUrl.origin
			imageUrl = `${origin}${imageUrl}`
		}

		// Generate alt text using ForVoyez
		const altText = await generateAltText(imageUrl, media.filename || 'image.jpg')

		if (!altText) {
			return NextResponse.json({ error: 'Failed to generate alt text' }, { status: 500 })
		}

		// Update the media document with the generated alt text
		const updatedMedia = await payload.update({
			collection: 'media',
			id: mediaId,
			data: {
				alt: altText,
			},
		})

		return NextResponse.json({
			success: true,
			alt: updatedMedia.alt,
		})
	} catch (error) {
		console.error('Error generating alt text:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
