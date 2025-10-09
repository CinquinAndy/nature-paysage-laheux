import type { Metadata } from 'next'
import type React from 'react'
import '@/app/(frontend)/global.css'
import { Footer } from '@/components/global/footer'
import { NavigationBar } from '@/components/global/navigationbar'

export const metadata: Metadata = {
	title: 'Nature Paysage Laheux',
	description: 'A blank template using Payload in a Next.js app.',
	appleWebApp: {
		title: 'Nature Paysage Laheux',
	},
	manifest: '/manifest.json',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="fr">
			<body>
				<NavigationBar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
