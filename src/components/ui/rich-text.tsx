'use client'

import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
	content: {
		root: {
			type: string
			children: unknown[]
			direction: ('ltr' | 'rtl') | null
			format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
			indent: number
			version: number
		}
		[k: string]: unknown
	}
	className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
	if (!content) return null

	return (
		<div className={className}>
			<PayloadRichText data={content as never} />
		</div>
	)
}
