import { ImageResponse } from 'next/og'
import { getRealisationsPageData } from '@/lib/payload'
import { OGImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, loadFont } from '@/lib/og-image'

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

