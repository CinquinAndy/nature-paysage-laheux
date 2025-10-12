import type { GlobalConfig } from 'payload'

export const PrestationsDetailTemplate: GlobalConfig = {
	slug: 'prestations-detail-template',
	label: 'Prestations Detail Template',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// APPROACH SECTION
		// ===========================
		{
			name: 'approachSection',
			type: 'group',
			label: 'Ecological Approach Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Une approche écologique et respectueuse',
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'richText',
					label: 'Section Description',
				},
			],
		},

		// ===========================
		// PRICING SECTION
		// ===========================
		{
			name: 'pricingSection',
			type: 'group',
			label: 'Pricing Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Tarification',
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Pricing Description',
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
					defaultValue: 'Intéressé par cette prestation ?',
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
					defaultValue: 'Demander un devis gratuit',
					label: 'Button Text',
				},
				{
					name: 'buttonUrl',
					type: 'text',
					defaultValue: '/contact',
					label: 'Button URL',
				},
			],
		},
	],
	admin: {
		description:
			'Template configuration for /prestations/[slug] pages. Dynamic content comes from the Services collection.',
	},
}
