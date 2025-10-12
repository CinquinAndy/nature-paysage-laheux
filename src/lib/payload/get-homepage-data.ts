import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Homepage } from '@/payload-types'

export async function getHomepageData(): Promise<Homepage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const homepage = await payload.findGlobal({
		slug: 'homepage',
		depth: 2, // Include related media
	})

	return homepage as Homepage
}
