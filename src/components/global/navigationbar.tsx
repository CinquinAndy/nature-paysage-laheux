'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
	MobileNavToggle,
	NavBody,
	Navbar,
	NavbarButton,
	NavbarLogo,
	NavItems,
} from '@/components/ui/resizable-navbar'

export const NavigationBar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const navItems = [
		{ name: 'Accueil', link: '/' },
		{ name: 'Ce Que Je Fais', link: '/prestations' },
		{ name: 'Mes Réalisations', link: '/realisations' },
		{ name: 'FAQ', link: '/faq' },
		{ name: 'Contact', link: '/contact' },
	]

	return (
		<Navbar>
			{/* Desktop Navigation */}
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					<NavbarButton variant="primary" asChild>
						<Link href="/contact">Devis Gratuit</Link>
					</NavbarButton>
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
				</MobileNavHeader>

				<MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
					{navItems.map(item => (
						<Link
							key={`mobile-link-${item.name}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-black  font-semibold text-lg hover:text-primary transition-colors"
						>
							<span className="block">{item.name}</span>
						</Link>
					))}
					<div className="flex w-full flex-col gap-4">
						<NavbarButton variant="primary" className="w-full" asChild>
							<Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
								Devis Gratuit
							</Link>
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	)
}
