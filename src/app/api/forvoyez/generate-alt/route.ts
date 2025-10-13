import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

		// Get the image URL
		const imageUrl = media.url

		if (!imageUrl) {
			return NextResponse.json({ error: 'Image URL not found' }, { status: 404 })
		}

		// Fetch the image
		const imageResponse = await fetch(imageUrl)
		if (!imageResponse.ok) {
			return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
		}

		const imageBlob = await imageResponse.blob()

		// Prepare FormData for ForVoyez API
		const formData = new FormData()
		formData.append('image', imageBlob, media.filename || 'image.jpg')
		formData.append('language', 'fr')

		// Optional: Add schema for structured output
		const schema = JSON.stringify({
			alternativeText: 'string',
		})
		formData.append('schema', schema)

		// Call ForVoyez API
		const forvoyezToken = process.env.FORVOYEZ_TOKEN
		if (!forvoyezToken) {
			return NextResponse.json({ error: 'ForVoyez token not configured' }, { status: 500 })
		}

		const forvoyezResponse = await fetch('https://forvoyez.com/api/describe', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${forvoyezToken}`,
			},
			body: formData,
		})

		if (!forvoyezResponse.ok) {
			const errorText = await forvoyezResponse.text()
			console.error('ForVoyez API error:', errorText)
			return NextResponse.json(
				{ error: `ForVoyez API error: ${forvoyezResponse.status}` },
				{ status: forvoyezResponse.status },
			)
		}

		const forvoyezData = await forvoyezResponse.json()

		// Update the media document with the generated alt text
		const updatedMedia = await payload.update({
			collection: 'media',
			id: mediaId,
			data: {
				alt: forvoyezData.alternativeText || forvoyezData.caption || forvoyezData.title || '',
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

