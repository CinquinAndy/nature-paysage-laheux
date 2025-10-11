import type { Metadata } from 'next'
import localFont from 'next/font/local'
import type React from 'react'
import '@/app/(frontend)/global.css'
import { Footer } from '@/components/global/footer'
import { NavigationBar } from '@/components/global/navigationbar'

// Apple Garamond pour les titres
const appleGaramond = localFont({
	src: [
		{
			path: '../../../public/font/AppleGaramond-Light.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../../public/font/AppleGaramond-LightItalic.ttf',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../../public/font/AppleGaramond.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../../public/font/AppleGaramond-Italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../../public/font/AppleGaramond-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../../public/font/AppleGaramond-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
	variable: '--font-garamond',
	display: 'swap',
})

// Baskerville pour les textes
const baskerville = localFont({
	src: [
		{
			path: '../../../public/font/Baskervville-VariableFont_wght.ttf',
			style: 'normal',
		},
		{
			path: '../../../public/font/Baskervville-Italic-VariableFont_wght.ttf',
			style: 'italic',
		},
	],
	variable: '--font-baskerville',
	display: 'swap',
})

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
		<html lang="fr" className={`${appleGaramond.variable} ${baskerville.variable}`}>
			<body>
				<NavigationBar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
