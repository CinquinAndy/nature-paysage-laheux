import type { CollectionConfig } from 'payload'

export const Realisations: CollectionConfig = {
	slug: 'realisations',
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
			label: 'Project Title',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'URL Slug',
			validate: (val: string) => {
				if (!val) return 'Slug is required'
				if (!/^[a-z0-9-]+$/.test(val)) {
					return 'Slug must contain only lowercase letters, numbers, and hyphens'
				}
				return true
			},
		},
		{
			name: 'location',
			type: 'text',
			label: 'Location (City/Town)',
			admin: {
				description: 'e.g., Monnières, Vallet, etc.',
			},
		},
		{
			name: 'date',
			type: 'date',
			label: 'Project Date',
			admin: {
				description: 'When the project was completed',
			},
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
			label: 'Main Image',
		},
		{
			name: 'shortDescription',
			type: 'textarea',
			required: true,
			label: 'Short Description',
			admin: {
				description: 'Brief description for cards/previews',
			},
		},
		{
			name: 'description',
			type: 'richText',
			required: true,
			label: 'Full Description',
			admin: {
				description: 'Complete project description',
			},
		},
		{
			name: 'category',
			type: 'select',
			required: true,
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
			label: 'Key Features',
			admin: {
				description: 'Main highlights of the project',
			},
			fields: [
				{
					name: 'feature',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'images',
			type: 'array',
			label: 'Additional Images',
			admin: {
				description: 'Gallery of additional project images',
			},
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
			],
		},
		{
			name: 'testimonial',
			type: 'group',
			label: 'Client Testimonial',
			fields: [
				{
					name: 'quote',
					type: 'textarea',
					label: 'Testimonial Quote',
				},
				{
					name: 'author',
					type: 'text',
					label: 'Client Name',
				},
				{
					name: 'location',
					type: 'text',
					label: 'Client Location',
				},
			],
		},
	],
}
