import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { MentionsLegalesPage } from '@/payload-types'

export async function getMentionsLegalesPageData(): Promise<MentionsLegalesPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const mentionsLegalesPage = await payload.findGlobal({
		slug: 'mentions-legales-page',
		depth: 2, // Include related media
	})

	return mentionsLegalesPage as MentionsLegalesPage
}
