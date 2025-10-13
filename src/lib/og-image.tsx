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
		<div tw="h-full w-full flex flex-col items-center justify-center bg-[#F5F1EC] p-20 relative">
			{/* biome-ignore lint: it's for og image, not really important to set the classic nextjs image */}
			<img
				src="https://r2-andycinquin.andy-cinquin.fr/og_de5f87a262.svg"
				alt="Blob"
				tw="absolute top-0 left-0 w-full h-full"
			/>
			<div tw="text-[72px] font-bold text-gray-800 text-center leading-[1.2] max-w-[1040px]">{title}</div>
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
