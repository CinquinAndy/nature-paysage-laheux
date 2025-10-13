import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Load Apple Garamond Bold font for OG images
 * Cached at module level to avoid re-reading on every image generation
 */
let fontCache: Buffer | null = null

export async function loadFont(): Promise<Buffer> {
	if (fontCache) return fontCache

	const fontPath = join(process.cwd(), 'public/font/AppleGaramond-Bold.ttf')
	fontCache = await readFile(fontPath)

	return fontCache
}

/**
 * OG Image Template Component
 * Simple design with centered title on #F5F1EC background
 */
export function OGImageTemplate({ title }: { title: string }) {
	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#F5F1EC',
				padding: '80px',
			}}
		>
			<div
				style={{
					fontSize: 72,
					fontWeight: 700,
					color: '#1F2937',
					textAlign: 'center',
					lineHeight: 1.2,
					maxWidth: '1040px',
				}}
			>
				{title}
			</div>
		</div>
	)
}

/**
 * Common OG image metadata
 */
export const OG_IMAGE_SIZE = {
	width: 1200,
	height: 630,
}

export const OG_IMAGE_ALT = 'Nature Paysage Laheux - Éco-Paysagiste Loire-Atlantique'
export const OG_IMAGE_CONTENT_TYPE = 'image/png'

