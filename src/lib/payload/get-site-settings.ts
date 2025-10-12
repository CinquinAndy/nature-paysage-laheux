import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteSetting } from '@/payload-types'

export async function getSiteSettings(): Promise<SiteSetting> {
	const payload = await getPayload({
		config: configPromise,
	})

	const siteSettings = await payload.findGlobal({
		slug: 'site-settings',
		depth: 2, // Include related media
	})

	return siteSettings as SiteSetting
}
