import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: NextRequest) {
	try {
		const mediaId = req.nextUrl.searchParams.get('mediaId')

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

		return NextResponse.json({
			success: true,
			hasAlt: !!media.alt && media.alt.length > 0,
			alt: media.alt || null,
		})
	} catch (error) {
		console.error('Error checking media status:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
