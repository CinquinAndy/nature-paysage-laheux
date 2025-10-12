import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	label: 'Site Settings',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// CONTACT INFORMATION
		// ===========================
		{
			name: 'contact',
			type: 'group',
			label: 'Contact Information',
			fields: [
				{
					name: 'phone',
					type: 'text',
					required: true,
					label: 'Phone Number',
				},
				{
					name: 'email',
					type: 'email',
					required: true,
					label: 'Email Address',
				},
				{
					name: 'company',
					type: 'group',
					label: 'Company Details',
					fields: [
						{
							name: 'name',
							type: 'text',
							defaultValue: 'SASU Nature et Paysage Laheux',
							label: 'Company Name',
						},
						{
							name: 'representative',
							type: 'text',
							defaultValue: 'Jean-Luc Laheux',
							label: 'Legal Representative',
						},
						{
							name: 'legalForm',
							type: 'text',
							defaultValue: 'SASU',
							label: 'Legal Form',
						},
					],
				},
				{
					name: 'address',
					type: 'group',
					label: 'Address',
					fields: [
						{
							name: 'postalCode',
							type: 'text',
							label: 'Postal Code',
						},
						{
							name: 'city',
							type: 'text',
							label: 'City',
						},
						{
							name: 'region',
							type: 'text',
							label: 'Region',
						},
						{
							name: 'country',
							type: 'text',
							defaultValue: 'France',
							label: 'Country',
						},
					],
				},
				{
					name: 'social',
					type: 'group',
					label: 'Social Media',
					fields: [
						{
							name: 'facebook',
							type: 'text',
							label: 'Facebook URL',
						},
						{
							name: 'linkedin',
							type: 'text',
							label: 'LinkedIn URL',
						},
					],
				},
				{
					name: 'hours',
					type: 'group',
					label: 'Business Hours',
					fields: [
						{
							name: 'weekday',
							type: 'text',
							label: 'Weekday Hours',
						},
						{
							name: 'saturday',
							type: 'text',
							label: 'Saturday Hours',
						},
						{
							name: 'sunday',
							type: 'text',
							label: 'Sunday Hours',
						},
						{
							name: 'note',
							type: 'textarea',
							label: 'Additional Note',
						},
					],
				},
			],
		},

		// ===========================
		// TAX CREDIT INFORMATION
		// ===========================
		{
			name: 'taxCredit',
			type: 'group',
			label: 'Tax Credit Information',
			fields: [
				{
					name: 'percentage',
					type: 'number',
					defaultValue: 50,
					label: 'Tax Credit Percentage',
					admin: {
						description: 'Percentage of tax credit (usually 50%)',
					},
				},
				{
					name: 'maxAnnualExpense',
					type: 'number',
					defaultValue: 12000,
					label: 'Maximum Annual Expense (€)',
					admin: {
						description: 'Maximum amount that can be claimed per year',
					},
				},
				{
					name: 'maxAnnualCredit',
					type: 'number',
					defaultValue: 6000,
					label: 'Maximum Annual Credit (€)',
					admin: {
						description: 'Maximum tax credit that can be received per year',
					},
				},
				{
					name: 'steps',
					type: 'array',
					label: 'Steps to Benefit',
					admin: {
						description: 'Steps to benefit from the tax credit',
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
					],
				},
				{
					name: 'example',
					type: 'group',
					label: 'Example Calculation',
					fields: [
						{
							name: 'serviceCost',
							type: 'number',
							label: 'Service Cost (€)',
						},
						{
							name: 'taxCredit',
							type: 'number',
							label: 'Tax Credit Amount (€)',
						},
						{
							name: 'realCost',
							type: 'number',
							label: 'Real Cost After Credit (€)',
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
					label: 'Main Menu Items',
					admin: {
						description: 'Main navigation menu items',
					},
					fields: [
						{
							name: 'label',
							type: 'text',
							required: true,
							label: 'Menu Label',
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
					label: 'CTA Button',
					fields: [
						{
							name: 'label',
							type: 'text',
							defaultValue: 'Devis Gratuit',
							label: 'Button Label',
						},
						{
							name: 'url',
							type: 'text',
							defaultValue: '/contact',
							label: 'Button URL',
						},
					],
				},
			],
		},

		// ===========================
		// FOOTER
		// ===========================
		{
			name: 'footer',
			type: 'group',
			label: 'Footer',
			fields: [
				{
					name: 'logoAlt',
					type: 'text',
					label: 'Logo Alt Text',
				},
				{
					name: 'tagline',
					type: 'text',
					label: 'Footer Tagline',
				},
				{
					name: 'copyrightText',
					type: 'text',
					label: 'Copyright Text',
				},
				{
					name: 'developerName',
					type: 'text',
					label: 'Developer Name',
				},
				{
					name: 'developerUrl',
					type: 'text',
					label: 'Developer URL',
				},
			],
		},

		// ===========================
		// SEO DEFAULTS
		// ===========================
		{
			name: 'seo',
			type: 'group',
			label: 'SEO Defaults',
			fields: [
				{
					name: 'siteTitle',
					type: 'text',
					label: 'Default Site Title',
				},
				{
					name: 'siteDescription',
					type: 'textarea',
					label: 'Default Site Description',
				},
				{
					name: 'ogImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Default OG Image',
					admin: {
						description: 'Default image for social media sharing',
					},
				},
			],
		},
	],
}
