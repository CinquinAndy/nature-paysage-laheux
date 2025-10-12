import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { RealisationsPage } from '@/payload-types'

export async function getRealisationsPageData(): Promise<RealisationsPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const realisationsPage = await payload.findGlobal({
		slug: 'realisations-page',
		depth: 2, // Include related media
	})

	return realisationsPage as RealisationsPage
}
