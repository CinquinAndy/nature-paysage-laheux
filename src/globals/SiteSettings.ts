import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	label: 'Paramètres du Site',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// INFORMATIONS DE CONTACT
		// ===========================
		{
			name: 'contact',
			type: 'group',
			label: 'Informations de Contact',
			fields: [
				{
					name: 'phone',
					type: 'text',
					required: true,
					label: 'Numéro de téléphone',
				},
				{
					name: 'email',
					type: 'email',
					required: true,
					label: 'Adresse email',
				},
				{
					name: 'company',
					type: 'group',
					label: "Informations de l'entreprise",
					fields: [
						{
							name: 'name',
							type: 'text',
							defaultValue: 'SASU Nature et Paysage Laheux',
							label: "Nom de l'entreprise",
						},
						{
							name: 'representative',
							type: 'text',
							defaultValue: 'Jean-Luc Laheux',
							label: 'Représentant légal',
						},
						{
							name: 'legalForm',
							type: 'text',
							defaultValue: 'SASU',
							label: 'Forme juridique',
						},
					],
				},
				{
					name: 'address',
					type: 'group',
					label: 'Adresse',
					fields: [
						{
							name: 'postalCode',
							type: 'text',
							label: 'Code postal',
						},
						{
							name: 'city',
							type: 'text',
							label: 'Ville',
						},
						{
							name: 'region',
							type: 'text',
							label: 'Région',
						},
						{
							name: 'country',
							type: 'text',
							defaultValue: 'France',
							label: 'Pays',
						},
					],
				},
				{
					name: 'social',
					type: 'group',
					label: 'Réseaux sociaux',
					fields: [
						{
							name: 'facebook',
							type: 'text',
							label: 'URL Facebook',
						},
						{
							name: 'linkedin',
							type: 'text',
							label: 'URL LinkedIn',
						},
					],
				},
				{
					name: 'hours',
					type: 'group',
					label: "Horaires d'ouverture",
					fields: [
						{
							name: 'weekday',
							type: 'text',
							label: 'Horaires en semaine',
						},
						{
							name: 'saturday',
							type: 'text',
							label: 'Horaires le samedi',
						},
						{
							name: 'sunday',
							type: 'text',
							label: 'Horaires le dimanche',
						},
						{
							name: 'note',
							type: 'textarea',
							label: 'Note complémentaire',
						},
					],
				},
			],
		},

		// ===========================
		// INFORMATIONS CRÉDIT D'IMPÔT
		// ===========================
		{
			name: 'taxCredit',
			type: 'group',
			label: "Crédit d'Impôt",
			fields: [
				{
					name: 'percentage',
					type: 'number',
					defaultValue: 50,
					label: "Pourcentage du crédit d'impôt",
					admin: {
						description: "Pourcentage du crédit d'impôt (généralement 50%)",
					},
				},
				{
					name: 'maxAnnualExpense',
					type: 'number',
					defaultValue: 12000,
					label: 'Plafond annuel de dépenses (€)',
					admin: {
						description: 'Montant maximum pouvant être déclaré par an',
					},
				},
				{
					name: 'maxAnnualCredit',
					type: 'number',
					defaultValue: 6000,
					label: "Crédit d'impôt annuel maximum (€)",
					admin: {
						description: "Montant maximum de crédit d'impôt pouvant être obtenu par an",
					},
				},
				{
					name: 'steps',
					type: 'array',
					label: 'Étapes pour en bénéficier',
					admin: {
						description: "Les étapes pour profiter du crédit d'impôt",
					},
					fields: [
						{
							name: 'number',
							type: 'number',
							required: true,
							label: "Numéro de l'étape",
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: "Titre de l'étape",
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Description',
						},
					],
				},
				{
					name: 'example',
					type: 'group',
					label: 'Exemple de calcul',
					fields: [
						{
							name: 'serviceCost',
							type: 'number',
							label: 'Coût du service (€)',
						},
						{
							name: 'taxCredit',
							type: 'number',
							label: "Montant du crédit d'impôt (€)",
						},
						{
							name: 'realCost',
							type: 'number',
							label: 'Coût réel après crédit (€)',
						},
					],
				},
			],
		},

		// ===========================
		// NAVIGATION
		// ===========================
		{
			name: 'navigation',
			type: 'group',
			label: 'Navigation',
			fields: [
				{
					name: 'mainMenu',
					type: 'array',
					label: 'Menu principal',
					admin: {
						description: 'Liens du menu de navigation principal',
					},
					fields: [
						{
							name: 'label',
							type: 'text',
							required: true,
							label: 'Libellé du lien',
						},
						{
							name: 'url',
							type: 'text',
							required: true,
							label: 'URL',
						},
					],
				},
				{
					name: 'ctaButton',
					type: 'group',
					label: "Bouton d'appel à l'action",
					fields: [
						{
							name: 'label',
							type: 'text',
							defaultValue: 'Devis Gratuit',
							label: 'Texte du bouton',
						},
						{
							name: 'url',
							type: 'text',
							defaultValue: '/contact',
							label: 'Lien du bouton',
						},
					],
				},
			],
		},

		// ===========================
		// PIED DE PAGE
		// ===========================
		{
			name: 'footer',
			type: 'group',
			label: 'Pied de page',
			fields: [
				{
					name: 'logoAlt',
					type: 'text',
					label: 'Texte alternatif du logo',
				},
				{
					name: 'tagline',
					type: 'text',
					label: 'Slogan',
				},
				{
					name: 'copyrightText',
					type: 'text',
					label: 'Texte de copyright',
				},
				{
					name: 'developerName',
					type: 'text',
					label: 'Nom du développeur',
				},
				{
					name: 'developerUrl',
					type: 'text',
					label: 'URL du développeur',
				},
			],
		},

		// ===========================
		// PARAMÈTRES SEO PAR DÉFAUT
		// ===========================
		{
			name: 'seo',
			type: 'group',
			label: 'Référencement (SEO)',
			fields: [
				{
					name: 'siteTitle',
					type: 'text',
					label: 'Titre du site par défaut',
				},
				{
					name: 'siteDescription',
					type: 'textarea',
					label: 'Description du site par défaut',
				},
				{
					name: 'ogImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image de partage par défaut',
					admin: {
						description: 'Image utilisée par défaut lors des partages sur les réseaux sociaux',
					},
				},
			],
		},
	],
}
