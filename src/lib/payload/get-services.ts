import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Service } from '@/payload-types'

export async function getServices(limit?: number): Promise<Service[]> {
	const payload = await getPayload({
		config: configPromise,
	})

	const services = await payload.find({
		collection: 'services',
		depth: 2, // Include related media
		sort: 'order',
		limit: limit || 100,
	})

	return services.docs as Service[]
}

export async function getFeaturedServices(count: number = 6): Promise<Service[]> {
	return getServices(count)
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
	const payload = await getPayload({
		config: configPromise,
	})

	const result = await payload.find({
		collection: 'services',
		where: {
			slug: {
				equals: slug,
			},
		},
		depth: 2, // Include related media
		limit: 1,
	})

	return result.docs.length > 0 ? (result.docs[0] as Service) : null
}
