import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
	slug: 'faq',
	admin: {
		useAsTitle: 'question',
		defaultColumns: ['question', 'category', 'showOnHomepage', 'order'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'question',
			type: 'text',
			required: true,
			label: 'Question',
		},
		{
			name: 'answer',
			type: 'richText',
			required: true,
			label: 'Answer',
			admin: {
				description: 'Detailed answer to the question',
			},
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			options: [
				{ label: 'Questions Générales', value: 'general' },
				{ label: 'Prestations & Services', value: 'services' },
				{ label: "Tarifs & Crédit d'Impôt", value: 'tarifs' },
				{ label: 'Approche Écologique', value: 'ecologie' },
			],
			defaultValue: 'general',
		},
		{
			name: 'showOnHomepage',
			type: 'checkbox',
			defaultValue: false,
			label: 'Show on Homepage',
			admin: {
				description: 'Display in the FAQ short section on homepage (top 4)',
			},
		},
		{
			name: 'order',
			type: 'number',
			defaultValue: 0,
			label: 'Display Order',
			admin: {
				description: 'Order within category (lower number = first)',
			},
		},
	],
}
