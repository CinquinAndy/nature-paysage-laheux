import type { GlobalConfig } from 'payload'

export const RealisationsDetailTemplate: GlobalConfig = {
	slug: 'realisations-detail-template',
	label: 'Realisations Detail Template',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// PROCESS SECTION
		// ===========================
		{
			name: 'processSection',
			type: 'group',
			label: 'Process Section',
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
		// TAX CREDIT INFO SECTION
		// ===========================
		{
			name: 'taxCreditInfo',
			type: 'group',
			label: 'Tax Credit Info Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Bénéficiez de 50% de crédit d'impôt",
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Section Description',
				},
			],
		},

		// ===========================
		// TESTIMONIAL SECTION
		// ===========================
		{
			name: 'testimonialSection',
			type: 'group',
			label: 'Testimonial Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Le mot du client',
					label: 'Section Title',
				},
				{
					name: 'defaultTestimonial',
					type: 'richText',
					label: 'Default Testimonial',
					admin: {
						description: "Used if the realisation doesn't have its own testimonial",
					},
				},
				{
					name: 'defaultAuthor',
					type: 'text',
					label: 'Default Author',
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
					defaultValue: 'Un projet similaire ?',
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
			],
		},
	],
	admin: {
		description:
			'Template configuration for /realisations/[id] pages. Dynamic content comes from the Realisations collection.',
	},
}
