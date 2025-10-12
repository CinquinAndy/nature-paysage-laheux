import type { GlobalConfig } from 'payload'

export const PrestationsPage: GlobalConfig = {
	slug: 'prestations-page',
	label: 'Prestations Page',
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
					defaultValue: 'Mes Prestations Écologiques',
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
		// TAX CREDIT ELIGIBILITY SECTION
		// ===========================
		{
			name: 'taxCreditEligibility',
			type: 'group',
			label: 'Tax Credit Eligibility Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Crédit d'Impôt : Ce Qui Est Pris en Charge",
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Section Description',
				},
				{
					name: 'eligibleItems',
					type: 'array',
					label: 'Eligible Services',
					admin: {
						description: 'Services eligible for 50% tax credit',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
						},
						{
							name: 'description',
							type: 'text',
						},
					],
				},
				{
					name: 'nonEligibleItems',
					type: 'array',
					label: 'Non-Eligible Services',
					admin: {
						description: 'Services NOT eligible for tax credit',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
						},
						{
							name: 'description',
							type: 'text',
						},
					],
				},
				{
					name: 'eligibleImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Eligible Services Image',
				},
				{
					name: 'nonEligibleImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Non-Eligible Services Image',
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
		description: 'Configuration for /prestations page. Services themselves come from the Services collection.',
	},
}
