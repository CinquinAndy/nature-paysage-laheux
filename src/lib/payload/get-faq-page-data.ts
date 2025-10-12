import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { FaqPage } from '@/payload-types'

export async function getFaqPageData(): Promise<FaqPage> {
	const payload = await getPayload({
		config: configPromise,
	})

	const faqPage = await payload.findGlobal({
		slug: 'faq-page',
		depth: 2, // Include related media
	})

	return faqPage as FaqPage
}
