'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
	content: SerializedEditorState
	className?: string
}

/**
 * RichText component for rendering Payload CMS Lexical content
 * Uses Payload's built-in RichText component + Tailwind Typography for clean, maintainable styling
 */
export function RichText({ content, className = '' }: RichTextProps) {
	if (!content) return null

	return (
		<article className={`prose prose-nature prose-lg max-w-none ${className}`}>
			<PayloadRichText data={content} />
		</article>
	)
}
