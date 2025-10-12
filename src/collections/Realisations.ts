import type { CollectionConfig } from 'payload'

export const Realisations: CollectionConfig = {
	slug: 'realisations',
	labels: {
		singular: 'Réalisation',
		plural: 'Réalisations',
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'location', 'category', 'date'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Titre du projet',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'Identifiant URL (slug)',
			admin: {
				description: "Utilisé dans l'URL de la page (ex : jardin-monnieres). Ne modifier que si nécessaire.",
			},
			validate: (val: string) => {
				if (!val) return 'Le slug est obligatoire'
				if (!/^[a-z0-9-]+$/.test(val)) {
					return 'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets'
				}
				return true
			},
		},
		{
			name: 'location',
			type: 'text',
			label: 'Ville / Commune',
			admin: {
				description: 'Par exemple : Monnières, Vallet, Clisson...',
			},
		},
		{
			name: 'date',
			type: 'date',
			label: 'Date du projet',
			admin: {
				description: 'Date de réalisation ou de fin du projet',
			},
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
			label: 'Image principale',
		},
		{
			name: 'shortDescription',
			type: 'textarea',
			required: true,
			label: 'Description courte',
			admin: {
				description: 'Brève description pour les cartes et aperçus (2-3 phrases)',
			},
		},
		{
			name: 'description',
			type: 'richText',
			required: true,
			label: 'Description complète',
			admin: {
				description: 'Description détaillée du projet et des travaux réalisés',
			},
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Entretien', value: 'entretien' },
				{ label: 'Aménagement', value: 'amenagement' },
				{ label: 'Potager', value: 'potager' },
				{ label: 'Taille', value: 'taille' },
			],
			defaultValue: 'entretien',
		},
		{
			name: 'features',
			type: 'array',
			label: 'Caractéristiques principales',
			admin: {
				description: 'Points forts et aspects remarquables du projet',
			},
			fields: [
				{
					name: 'feature',
					type: 'text',
					required: true,
					label: 'Caractéristique',
				},
			],
		},
		{
			name: 'images',
			type: 'array',
			label: 'Images supplémentaires',
			admin: {
				description: "Galerie d'images additionnelles du projet",
			},
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
					label: 'Image',
				},
			],
		},
		{
			name: 'testimonial',
			type: 'group',
			label: 'Témoignage client',
			fields: [
				{
					name: 'quote',
					type: 'textarea',
					label: 'Citation du client',
				},
				{
					name: 'author',
					type: 'text',
					label: 'Nom du client',
				},
				{
					name: 'location',
					type: 'text',
					label: 'Ville du client',
				},
			],
		},
	],
}
