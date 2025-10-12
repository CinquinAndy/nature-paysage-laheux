import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
	slug: 'homepage',
	label: 'Homepage',
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
					name: 'backgroundImage',
					type: 'upload',
					relationTo: 'media',
					required: true,
					label: 'Background Image',
				},
				{
					name: 'imageAlt',
					type: 'text',
					label: 'Image Alt Text',
				},
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Hero Title',
					admin: {
						description: 'Use **word** syntax for bold text (shown with blob accent). Example: **Transformez** Votre Jardin',
					},
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Subtitle',
				},
			],
		},

		// ===========================
		// VALUES SECTION
		// ===========================
		{
			name: 'values',
			type: 'group',
			label: 'Values Section',
			fields: [
				{
					name: 'sectionTitle',
					type: 'text',
					required: true,
					label: 'Section Title',
					admin: {
						description: 'Use **word** syntax for bold text. Example: Une Approche **Écologique** et Sur-Mesure',
					},
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Section Image',
				},
				{
					name: 'imageAlt',
					type: 'text',
					label: 'Image Alt Text',
				},
				{
					name: 'valuesList',
					type: 'array',
					label: 'Values List',
					minRows: 4,
					maxRows: 4,
					admin: {
						description: 'Exactly 4 values will be displayed',
					},
					fields: [
						{
							name: 'icon',
							type: 'select',
							required: true,
							options: [
								{ label: 'Feuille (Leaf)', value: 'leaf' },
								{ label: 'Outil (Wrench)', value: 'wrench' },
								{ label: 'Carte (MapPin)', value: 'map-pin' },
								{ label: 'Tendance (TrendingDown)', value: 'trending-down' },
							],
						},
						{
							name: 'number',
							type: 'text',
							required: true,
							label: 'Display Number',
							admin: {
								description: 'e.g., "01", "02", etc.',
							},
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Value Title',
						},
						{
							name: 'description',
							type: 'textarea',
							required: true,
							label: 'Value Description',
						},
					],
				},
			],
		},

		// ===========================
		// SERVICES PREVIEW SECTION
		// ===========================
		{
			name: 'servicesPreview',
			type: 'group',
			label: 'Services Preview Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Mes Prestations d'Entretien de Jardin",
					label: 'Section Title',
				},
				{
					name: 'subtitle',
					type: 'text',
					defaultValue: "Toutes mes prestations bénéficient de 50% de réduction d'impôt",
					label: 'Subtitle',
				},
				{
					name: 'ctaLabel',
					type: 'text',
					defaultValue: 'Voir Toutes Mes Prestations',
					label: 'CTA Button Text',
				},
				{
					name: 'ctaUrl',
					type: 'text',
					defaultValue: '/prestations',
					label: 'CTA Button URL',
				},
			],
			admin: {
				description: 'Services are pulled from the Services collection',
			},
		},

		// ===========================
		// PHILOSOPHY SECTION
		// ===========================
		{
			name: 'philosophy',
			type: 'group',
			label: 'Philosophy Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Section Title',
					admin: {
						description: 'Use **word** syntax for bold text. Example: Mon Approche : **Nature & Respect**',
					},
				},
				{
					name: 'introText',
					type: 'textarea',
					label: 'Introduction Text',
				},
				{
					name: 'quote',
					type: 'text',
					label: 'Highlighted Quote',
				},
				{
					name: 'primaryImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Main Image',
				},
				{
					name: 'imageAlt',
					type: 'text',
					label: 'Image Alt Text',
				},
				{
					name: 'imageOverlayTitle',
					type: 'text',
					label: 'Image Overlay Title',
				},
				{
					name: 'imageOverlayDescription',
					type: 'textarea',
					label: 'Image Overlay Description',
				},
				{
					name: 'philosophyPoints',
					type: 'array',
					label: 'Philosophy Points',
					minRows: 4,
					maxRows: 4,
					admin: {
						description: 'Exactly 4 philosophy cards',
					},
					fields: [
						{
							name: 'icon',
							type: 'select',
							required: true,
							options: [
								{ label: 'Feuille (Leaf)', value: 'leaf' },
								{ label: 'Coeur (Heart)', value: 'heart' },
								{ label: 'Récompense (Award)', value: 'award' },
								{ label: 'Bouclier (Shield)', value: 'shield' },
							],
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Point Title',
						},
						{
							name: 'description',
							type: 'textarea',
							required: true,
							label: 'Point Description',
						},
					],
				},
				{
					name: 'preferences',
					type: 'array',
					label: 'What I Prefer (Green List)',
					admin: {
						description: 'Ecological practices I prioritize',
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
					name: 'refusals',
					type: 'array',
					label: 'What I Refuse (Red List)',
					admin: {
						description: 'Practices I refuse to use',
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
					name: 'engagementBanner',
					type: 'group',
					label: 'Engagement Banner',
					fields: [
						{
							name: 'title',
							type: 'text',
							label: 'Banner Title',
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Banner Description',
						},
						{
							name: 'ctaLabel',
							type: 'text',
							label: 'CTA Button Text',
						},
						{
							name: 'ctaUrl',
							type: 'text',
							defaultValue: '/contact',
							label: 'CTA Button URL',
						},
					],
				},
			],
		},

		// ===========================
		// INTERVENTION ZONE SECTION
		// ===========================
		{
			name: 'interventionZone',
			type: 'group',
			label: 'Intervention Zone Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Section Title',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Subtitle',
				},
				{
					name: 'mapCenterLat',
					type: 'number',
					defaultValue: 47.1339,
					label: 'Map Center Latitude',
					admin: {
						description: 'Latitude for map center point',
					},
				},
				{
					name: 'mapCenterLng',
					type: 'number',
					defaultValue: -1.3433,
					label: 'Map Center Longitude',
					admin: {
						description: 'Longitude for map center point',
					},
				},
				{
					name: 'radiusKm',
					type: 'number',
					defaultValue: 20,
					label: 'Intervention Radius (km)',
				},
				{
					name: 'communes',
					type: 'array',
					label: 'Main Cities/Towns',
					admin: {
						description: 'List of main cities where you operate',
					},
					fields: [
						{
							name: 'name',
							type: 'text',
							required: true,
							label: 'City Name',
						},
					],
				},
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
							name: 'ctaLabel',
							type: 'text',
							label: 'CTA Button Text',
						},
						{
							name: 'ctaUrl',
							type: 'text',
							defaultValue: '/contact',
							label: 'CTA Button URL',
						},
					],
				},
			],
		},

		// ===========================
		// REALISATIONS PREVIEW SECTION
		// ===========================
		{
			name: 'realisationsPreview',
			type: 'group',
			label: 'Realisations Preview Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Découvrez Mes Réalisations',
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Section Description',
				},
				{
					name: 'ctaLabel',
					type: 'text',
					defaultValue: 'Voir Toutes Mes Réalisations',
					label: 'CTA Button Text',
				},
				{
					name: 'ctaUrl',
					type: 'text',
					defaultValue: '/realisations',
					label: 'CTA Button URL',
				},
			],
			admin: {
				description: 'Realisations are pulled from the Realisations collection (gallery of 6)',
			},
		},

		// ===========================
		// FAQ SHORT SECTION
		// ===========================
		{
			name: 'faqShort',
			type: 'group',
			label: 'FAQ Short Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Questions Fréquentes',
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Section Description',
				},
				{
					name: 'ctaLabel',
					type: 'text',
					defaultValue: 'Voir Toutes les Questions',
					label: 'CTA Button Text',
				},
				{
					name: 'ctaUrl',
					type: 'text',
					defaultValue: '/faq',
					label: 'CTA Button URL',
				},
			],
			admin: {
				description: 'Top 4 FAQs are pulled from the FAQ collection (showOnHomepage = true)',
			},
		},

		// ===========================
		// TAX CREDIT SECTION
		// ===========================
		{
			name: 'taxCredit',
			type: 'group',
			label: 'Tax Credit Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Comment Profiter de 50% de Réduction d'Impôt ?",
					label: 'Section Title',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Subtitle',
				},
				{
					name: 'steps',
					type: 'array',
					label: 'Tax Credit Steps',
					minRows: 4,
					maxRows: 4,
					admin: {
						description: 'The 4 steps to benefit from tax credit',
					},
					fields: [
						{
							name: 'number',
							type: 'number',
							required: true,
							label: 'Step Number',
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Step Title',
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Step Description',
						},
						{
							name: 'image1',
							type: 'upload',
							relationTo: 'media',
							label: 'First Image',
						},
						{
							name: 'image2',
							type: 'upload',
							relationTo: 'media',
							label: 'Second Image',
						},
					],
				},
			],
		},

		// ===========================
		// FINAL CTA SECTION
		// ===========================
		{
			name: 'finalCta',
			type: 'group',
			label: 'Final CTA Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Prêt à Redonner Vie à Votre Jardin ?',
					label: 'Section Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Section Description',
				},
				{
					name: 'buttonText',
					type: 'text',
					defaultValue: 'Demander un Devis Gratuit',
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
					admin: {
						description: 'List of key benefits/reasons to contact',
					},
					fields: [
						{
							name: 'benefit',
							type: 'text',
							required: true,
						},
					],
				},
			],
		},
	],
}
