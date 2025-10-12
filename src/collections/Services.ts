import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
	slug: 'services',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'eligibleTaxCredit', 'order'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Service Title',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'URL Slug',
			admin: {
				description: 'Used in the URL (e.g., tonte-pelouse)',
			},
			validate: (val: string) => {
				// Simple URL-safe validation
				if (!val) return 'Slug is required'
				if (!/^[a-z0-9-]+$/.test(val)) {
					return 'Slug must contain only lowercase letters, numbers, and hyphens'
				}
				return true
			},
		},
		{
			name: 'shortDescription',
			type: 'textarea',
			required: true,
			label: 'Short Description',
			admin: {
				description: 'Used in cards and previews',
			},
		},
		{
			name: 'fullDescription',
			type: 'richText',
			required: true,
			label: 'Full Description',
			admin: {
				description: 'Detailed description for the service page',
			},
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
			label: 'Main Image',
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			options: [
				{ label: 'Entretien', value: 'entretien' },
				{ label: 'Création', value: 'creation' },
				{ label: 'Accompagnement', value: 'accompagnement' },
			],
			defaultValue: 'entretien',
		},
		{
			name: 'features',
			type: 'array',
			required: true,
			label: 'Key Features',
			admin: {
				description: 'List of key features/benefits (4-6 items)',
			},
			fields: [
				{
					name: 'feature',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'eligibleTaxCredit',
			type: 'checkbox',
			defaultValue: true,
			label: 'Eligible for Tax Credit',
			admin: {
				description: 'Is this service eligible for 50% tax credit?',
			},
		},
		{
			name: 'price',
			type: 'text',
			defaultValue: 'Sur devis personnalisé',
			label: 'Price Display',
			admin: {
				description: 'How pricing is displayed to clients',
			},
		},
		{
			name: 'order',
			type: 'number',
			defaultValue: 0,
			label: 'Display Order',
			admin: {
				description: 'Order in which services appear (lower number = first)',
			},
		},
	],
}
