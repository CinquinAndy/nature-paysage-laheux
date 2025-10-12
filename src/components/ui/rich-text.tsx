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
		<div
			className={`prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-p:text-gray-600 prose-p:leading-7 prose-p:my-4 prose-a:text-emerald-600 prose-a:font-medium hover:prose-a:text-emerald-700 hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:text-gray-600 prose-li:my-2 prose-blockquote:border-l-4 prose-blockquote:border-emerald-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 ${className}`}
		>
			<PayloadRichText data={content as never} />
		</div>
	)
}
