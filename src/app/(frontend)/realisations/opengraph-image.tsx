import { ImageResponse } from 'next/og'
import { loadFont, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, OGImageTemplate } from '@/lib/og-image'
import { getRealisationsPageData } from '@/lib/payload'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export default async function Image() {
	const realisationsPage = await getRealisationsPageData()
	const font = await loadFont()

	// Extract title with fallback logic
	const title =
		realisationsPage.seo_title ||
		realisationsPage.hero?.title ||
		'Mes Réalisations de Jardins Écologiques | Jean-Luc Laheux'

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
