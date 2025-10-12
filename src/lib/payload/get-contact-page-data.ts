import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { ContactPage } from '@/payload-types'

export async function getContactPageData(): Promise<ContactPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const contactPage = await payload.findGlobal({
		slug: 'contact-page',
		depth: 2, // Include related media
	})

	return contactPage as ContactPage
}
