import { ImageResponse } from 'next/og'
import { getContactPageData } from '@/lib/payload'
import { OGImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, loadFont } from '@/lib/og-image'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export default async function Image() {
	const contactPage = await getContactPageData()
	const font = await loadFont()

	// Extract title with fallback logic
	const title = contactPage.seo_title || contactPage.hero?.title || 'Contact | Jean-Luc Laheux Eco-Paysagiste'

	return new ImageResponse(<OGImageTemplate title={title} />, {
		...size,
		fonts: [
			{
				name: 'Apple Garamond',
				data: font,
				style: 'normal',
				weight: 700,
			},
		],
	})
}

