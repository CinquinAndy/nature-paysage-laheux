import type { GlobalConfig } from 'payload'

export const FaqPage: GlobalConfig = {
	slug: 'faq-page',
	label: 'FAQ Page',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// HERO SECTION
		// ===========================
		{
			name: 'hero',
			type: 'group',
			label: 'Hero Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Questions Fréquentes',
					label: 'Page Title',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Hero Image',
				},
				{
					name: 'imageAlt',
					type: 'text',
					label: 'Image Alt Text',
				},
			],
		},

		// ===========================
		// CATEGORY DESCRIPTIONS
		// ===========================
		{
			name: 'categoryDescriptions',
			type: 'array',
			label: 'Category Descriptions',
			admin: {
				description: 'Optional descriptions for each FAQ category',
			},
			fields: [
				{
					name: 'category',
					type: 'select',
					options: [
						{ label: 'Questions Générales', value: 'general' },
						{ label: 'Prestations & Services', value: 'services' },
						{ label: "Tarifs & Crédit d'Impôt", value: 'tarifs' },
						{ label: 'Approche Écologique', value: 'ecologie' },
					],
				},
				{
					name: 'description',
					type: 'textarea',
				},
			],
		},

		// ===========================
		// CTA SECTION
		// ===========================
		{
			name: 'ctaSection',
			type: 'group',
			label: 'CTA Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Une Autre Question ?',
					label: 'CTA Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'CTA Description',
				},
				{
					name: 'buttonText',
					type: 'text',
					defaultValue: 'Me Contacter',
					label: 'Button Text',
				},
				{
					name: 'buttonUrl',
					type: 'text',
					defaultValue: '/contact',
					label: 'Button URL',
				},
				{
					name: 'benefits',
					type: 'array',
					label: 'Benefits List',
					fields: [
						{
							name: 'benefit',
							type: 'text',
						},
					],
				},
			],
		},
	],
	admin: {
		description: 'Configuration for /faq page. FAQ items come from the FAQ collection.',
	},
}
