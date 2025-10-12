import type { GlobalConfig } from 'payload'

export const PrestationsDetailTemplate: GlobalConfig = {
	slug: 'prestations-detail-template',
	label: 'Modèle Page Prestation',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// SECTION APPROCHE
		// ===========================
		{
			name: 'approachSection',
			type: 'group',
			label: 'Section Approche Écologique',
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
		// SECTION TARIFICATION
		// ===========================
		{
			name: 'pricingSection',
			type: 'group',
			label: 'Section Tarification',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Tarification',
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description des tarifs',
				},
			],
		},

		// ===========================
		// SECTION APPEL À L'ACTION
		// ===========================
		{
			name: 'ctaSection',
			type: 'group',
			label: "Section Appel à l'Action",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Intéressé par cette prestation ?',
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
					defaultValue: 'Demander un devis gratuit',
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
			'Configuration du modèle pour les pages /prestations/[slug]. Le contenu dynamique provient de la collection "Prestations".',
	},
}
