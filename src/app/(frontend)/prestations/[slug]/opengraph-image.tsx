import { ImageResponse } from 'next/og'
import { getServiceBySlug, getServices } from '@/lib/payload'
import { OGImageTemplate, OG_IMAGE_SIZE, OG_IMAGE_ALT, OG_IMAGE_CONTENT_TYPE, loadFont } from '@/lib/og-image'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = OG_IMAGE_CONTENT_TYPE

export async function generateStaticParams() {
	const services = await getServices()
	return services.map(service => ({
		slug: service.slug,
	}))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const service = await getServiceBySlug(slug)
	const font = await loadFont()

	if (!service) {
		return new ImageResponse(<OGImageTemplate title="Prestation non trouvée" />, {
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

	// Extract title with fallback logic
	const title =
		service.seo_title || service.title || `${service.title} | Jean-Luc Laheux - Loire-Atlantique`

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

