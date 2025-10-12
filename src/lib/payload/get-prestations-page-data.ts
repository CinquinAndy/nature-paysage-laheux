import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PrestationsPage } from '@/payload-types'

export async function getPrestationsPageData(): Promise<PrestationsPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const prestationsPage = await payload.findGlobal({
		slug: 'prestations-page',
		depth: 2, // Include related media
	})

	return prestationsPage as PrestationsPage
}
