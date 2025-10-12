import type { GlobalConfig } from 'payload'

export const PrestationsPage: GlobalConfig = {
	slug: 'prestations-page',
	label: 'Page Prestations',
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
					defaultValue: 'Mes Prestations Écologiques',
					label: 'Titre de la page',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Image d\'en-tête',
				},
			],
		},

		// ===========================
		// SECTION ÉLIGIBILITÉ CRÉDIT D'IMPÔT
		// ===========================
		{
			name: 'taxCreditEligibility',
			type: 'group',
			label: 'Section Éligibilité Crédit d\'Impôt',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Crédit d'Impôt : Ce Qui Est Pris en Charge",
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
				{
					name: 'eligibleItems',
					type: 'array',
					label: 'Services éligibles',
					admin: {
						description: 'Services qui bénéficient du crédit d\'impôt de 50%',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description',
						},
					],
				},
				{
					name: 'nonEligibleItems',
					type: 'array',
					label: 'Services non éligibles',
					admin: {
						description: 'Services qui NE bénéficient PAS du crédit d\'impôt',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description',
						},
					],
				},
				{
					name: 'eligibleImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image services éligibles',
				},
				{
					name: 'nonEligibleImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image services non éligibles',
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
				{
					name: 'benefits',
					type: 'array',
					label: 'Liste des avantages',
					fields: [
						{
							name: 'benefit',
							type: 'text',
							label: 'Avantage',
						},
					],
				},
			],
		},
	],
	admin: {
		description: 'Configuration de la page /prestations. Les prestations proviennent de la collection "Prestations".',
	},
}
