import type { GlobalConfig } from 'payload'

export const RealisationsPage: GlobalConfig = {
	slug: 'realisations-page',
	label: 'Realisations Page',
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
					defaultValue: 'Mes Réalisations en Loire-Atlantique',
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
		// INTRODUCTION SECTION
		// ===========================
		{
			name: 'introduction',
			type: 'group',
			label: 'Introduction Section',
			fields: [
				{
					name: 'paragraph1',
					type: 'textarea',
					label: 'First Paragraph',
				},
				{
					name: 'paragraph2',
					type: 'richText',
					label: 'Second Paragraph',
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
					defaultValue: 'Envie du Même Résultat Pour Votre Jardin ?',
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
		description: 'Configuration for /realisations page. Realisations themselves come from the Realisations collection.',
	},
}
