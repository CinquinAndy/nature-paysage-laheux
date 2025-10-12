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
		sort: '-createdAt', // Most recent first
		limit: limit || 100,
	})

	return realisations.docs as Realisation[]
}

export async function getLatestRealisations(count: number = 6): Promise<Realisation[]> {
	return getRealisations(count)
}
