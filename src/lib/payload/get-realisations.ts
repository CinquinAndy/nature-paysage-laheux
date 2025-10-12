import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Realisation } from '@/payload-types'

export async function getRealisations(limit?: number): Promise<Realisation[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const realisations = await payload.find({
		collection: 'realisations',
		depth: 2, // Include related media
		sort: '-date', // Most recent first by project date
		limit: limit || 100,
	})

	return realisations.docs as Realisation[]
}

export async function getLatestRealisations(count: number = 6): Promise<Realisation[]> {
	return getRealisations(count)
}

export async function getRealisationBySlug(slug: string): Promise<Realisation | null> {
	const payload = await getPayload({
		config: configPromise,
	})

	const result = await payload.find({
		collection: 'realisations',
		where: {
			slug: {
				equals: slug,
			},
		},
		depth: 2, // Include related media
		limit: 1,
	})

	return result.docs.length > 0 ? (result.docs[0] as Realisation) : null
}
