import type { GlobalConfig } from 'payload'

export const MentionsLegalesPage: GlobalConfig = {
	slug: 'mentions-legales-page',
	label: 'Mentions Légales Page',
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
					defaultValue: 'Mentions Légales',
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
		// CONTENT
		// ===========================
		{
			name: 'content',
			type: 'richText',
			required: true,
			label: 'Legal Content',
			admin: {
				description:
					'Complete legal content in rich text format. Include all sections: Editeur, Hebergement, Droits, RGPD, etc.',
			},
		},
	],
}
