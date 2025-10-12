import config from '@payload-config'
import { getPayload } from '@payloadcms/next/utilities'
import type { SiteSetting } from '@/payload-types'

export async function getSiteSettings(): Promise<SiteSetting> {
	const payload = await getPayload({ config })
	return await payload.findGlobal({ slug: 'site-settings' })
}
