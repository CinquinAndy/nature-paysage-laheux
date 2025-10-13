import type { CollectionConfig } from 'payload'
import { generateAltText } from '@/lib/forvoyez/generate-alt-text'

export const Media: CollectionConfig = {
	slug: 'media',
	admin: {
		components: {
			beforeList: ['@/components/admin/BulkAltTextGenerator'],
		},
	},
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			async ({ doc, req, operation }) => {
				// Only generate alt text for new uploads without alt text
				if (operation === 'create' && (!doc.alt || doc.alt === '')) {
					try {
						// Get the image URL
						let imageUrl = doc.url
						if (!imageUrl) return doc

						// Convert relative URL to absolute for fetch (server-side)
						if (imageUrl.startsWith('/')) {
							const protocol = req.protocol || 'http'
							const host = req.headers.get('host') || 'localhost:3000'
							imageUrl = `${protocol}://${host}${imageUrl}`
						}

						// Generate alt text
						const altText = await generateAltText(imageUrl, doc.filename || 'image')

						if (altText) {
							// Update the document with generated alt text
							await req.payload.update({
								collection: 'media',
								id: doc.id,
								data: {
									alt: altText,
								},
							})

							console.log(`✅ Auto-generated alt text for ${doc.filename}: "${altText}"`)
						}
					} catch (error) {
						console.error('Error in auto-generate alt text hook:', error)
					}
				}

				return doc
			},
		],
	},
	fields: [
		{
			name: 'altGenerator',
			type: 'ui',
			admin: {
				components: {
					Field: '@/components/fields/AltTextGenerator',
				},
			},
		},
		{
			name: 'alt',
			type: 'text',
			required: false,
		},
	],
	upload: true,
}
