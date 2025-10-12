import type { GlobalConfig } from 'payload'

export const MentionsLegalesPage: GlobalConfig = {
	slug: 'mentions-legales-page',
	label: 'Page Mentions Légales',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// SECTION HERO
		// ===========================
		{
			name: 'hero',
			type: 'group',
			label: 'Section Hero (En-tête)',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Mentions Légales',
					label: 'Titre de la page',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: "Image d'en-tête",
				},
			],
		},

		// ===========================
		// CONTENU LÉGAL
		// ===========================
		{
			name: 'content',
			type: 'richText',
			required: true,
			label: 'Contenu légal',
			admin: {
				description:
					"Contenu légal complet. Inclure toutes les sections : Éditeur du site, Hébergement, Droits d'auteur, RGPD, etc.",
			},
		},
	],
}
