import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
	slug: 'contact-page',
	label: 'Contact Page',
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
					defaultValue: 'Contactez-Moi',
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
		// FORM SECTION
		// ===========================
		{
			name: 'formSection',
			type: 'group',
			label: 'Form Section',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Parlons de Votre Jardin',
					label: 'Form Title',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Form Subtitle',
				},
				{
					name: 'gardenSizeOptions',
					type: 'array',
					label: 'Garden Size Options',
					admin: {
						description: 'Options for the garden surface dropdown',
					},
					fields: [
						{
							name: 'label',
							type: 'text',
							required: true,
							label: 'Display Label',
						},
						{
							name: 'value',
							type: 'text',
							required: true,
							label: 'Value',
						},
					],
				},
				{
					name: 'privacyText',
					type: 'textarea',
					label: 'Privacy Policy Text',
					admin: {
						description: 'Text displayed below the submit button',
					},
				},
			],
		},

		// ===========================
		// CONTACT INFO SIDEBAR
		// ===========================
		{
			name: 'contactInfoSidebar',
			type: 'group',
			label: 'Contact Info Sidebar',
			fields: [
				{
					name: 'benefits',
					type: 'array',
					label: 'Benefits List',
					admin: {
						description: 'Key benefits displayed in the sidebar',
					},
					fields: [
						{
							name: 'benefit',
							type: 'text',
						},
					],
				},
			],
			admin: {
				description: 'Contact information (phone, email, etc.) comes from Site Settings',
			},
		},
	],
}
