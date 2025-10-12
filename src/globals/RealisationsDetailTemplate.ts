import type { GlobalConfig } from 'payload'

export const RealisationsDetailTemplate: GlobalConfig = {
	slug: 'realisations-detail-template',
	label: 'Modèle Page Réalisation',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// SECTION PROCESSUS
		// ===========================
		{
			name: 'processSection',
			type: 'group',
			label: 'Section Processus',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Une approche écologique et respectueuse',
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'richText',
					label: 'Description',
				},
			],
		},

		// ===========================
		// SECTION CRÉDIT D'IMPÔT
		// ===========================
		{
			name: 'taxCreditInfo',
			type: 'group',
			label: 'Section Crédit d\'Impôt',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Bénéficiez de 50% de crédit d'impôt",
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
			],
		},

		// ===========================
		// SECTION TÉMOIGNAGE
		// ===========================
		{
			name: 'testimonialSection',
			type: 'group',
			label: 'Section Témoignage',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Le mot du client',
					label: 'Titre de la section',
				},
				{
					name: 'defaultTestimonial',
					type: 'richText',
					label: 'Témoignage par défaut',
					admin: {
						description: 'Utilisé si la réalisation n\'a pas son propre témoignage',
					},
				},
				{
					name: 'defaultAuthor',
					type: 'text',
					label: 'Auteur par défaut',
				},
			],
		},

		// ===========================
		// SECTION APPEL À L'ACTION
		// ===========================
		{
			name: 'ctaSection',
			type: 'group',
			label: 'Section Appel à l\'Action',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Un projet similaire ?',
					label: 'Titre',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
				{
					name: 'buttonText',
					type: 'text',
					label: 'Texte du bouton',
				},
				{
					name: 'buttonUrl',
					type: 'text',
					defaultValue: '/contact',
					label: 'Lien du bouton',
				},
			],
		},
	],
	admin: {
		description:
			'Configuration du modèle pour les pages /realisations/[id]. Le contenu dynamique provient de la collection "Réalisations".',
	},
}
