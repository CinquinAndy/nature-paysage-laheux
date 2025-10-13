import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: () => true,
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
