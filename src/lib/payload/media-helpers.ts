import type { Media } from '@/payload-types'

/**
 * Récupère l'URL d'un média depuis Payload
 */
export function getMediaUrl(media: number | Media | null | undefined): string | null {
	if (!media) return null

	if (typeof media === 'number') {
		return null // Needs to be populated
	}

	return media.url || null
}

/**
 * Récupère l'alt text d'un média depuis Payload
 */
export function getMediaAlt(media: number | Media | null | undefined): string {
	if (!media) return ''

	if (typeof media === 'number') {
		return ''
	}

	return media.alt || ''
}

/**
 * Récupère les informations complètes d'un média
 */
export function getMediaInfo(media: number | Media | null | undefined): {
	url: string | null
	alt: string
	width?: number | null
	height?: number | null
} {
	return {
		url: getMediaUrl(media),
		alt: getMediaAlt(media),
		width: typeof media === 'object' ? media?.width : undefined,
		height: typeof media === 'object' ? media?.height : undefined,
	}
}

/**
 * Convertit un champ Lexical en texte plain
 */
export function lexicalToPlainText(lexical: any): string {
	if (!lexical?.root?.children) return ''

	const extractText = (children: any[]): string => {
		return children
			.map((child: any) => {
				if (child.text) return child.text
				if (child.children) return extractText(child.children)
				return ''
			})
			.join('')
	}

	return extractText(lexical.root.children)
}
