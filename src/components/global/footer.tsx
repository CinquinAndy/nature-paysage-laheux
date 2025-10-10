import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { CONTACT_INFO } from '@/lib/data/contact-info'

export function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-muted/30 border-t">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Column 1: About */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Image src="/logo.svg" alt="Nature & Paysage Laheux" width={40} height={40} />
							<div>
								<h3 className="font-bold text-lg">Jean-Luc Laheux</h3>
								<p className="text-sm text-muted-foreground">Eco-Paysagiste</p>
							</div>
						</div>
						<p className="text-sm text-muted-foreground">
							{CONTACT_INFO.address.city}, {CONTACT_INFO.address.region}
						</p>
						<p className="text-sm text-muted-foreground">
							Services à la personne
							<br />
							<span className="font-semibold text-primary">50% de crédit d'impôt</span>
						</p>
					</div>

					{/* Column 2: Quick Links */}
					<div className="space-y-4">
						<h3 className="font-semibold text-base">Liens Rapides</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
									Accueil
								</Link>
							</li>
							<li>
								<Link href="/prestations" className="text-muted-foreground hover:text-primary transition-colors">
									Ce Que Je Fais
								</Link>
							</li>
							<li>
								<Link href="/realisations" className="text-muted-foreground hover:text-primary transition-colors">
									Mes Réalisations
								</Link>
							</li>
							<li>
								<Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
									FAQ
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
									Contact
								</Link>
							</li>
							<li>
								<Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
									Mentions Légales
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 3: Services */}
					<div className="space-y-4">
						<h3 className="font-semibold text-base">Mes Prestations</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>Tonte Écologique</li>
							<li>Désherbage Naturel</li>
							<li>Taille Raisonnée</li>
							<li>Potager Permaculture</li>
							<li>Entretien Massifs</li>
							<li>Accompagnement Annuel</li>
						</ul>
					</div>

					{/* Column 4: Contact */}
					<div className="space-y-4">
						<h3 className="font-semibold text-base">Contact</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
									className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
								>
									<Phone className="h-4 w-4" />
									{CONTACT_INFO.phone}
								</Link>
							</li>
							<li>
								<Link
									href={`mailto:${CONTACT_INFO.email}`}
									className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors break-all"
								>
									<Mail className="h-4 w-4 shrink-0" />
									{CONTACT_INFO.email}
								</Link>
							</li>
							<li>
								<div className="flex items-start gap-2 text-muted-foreground">
									<MapPin className="h-4 w-4 shrink-0 mt-0.5" />
									<span>
										{CONTACT_INFO.address.street}
										<br />
										{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}
									</span>
								</div>
							</li>
						</ul>
						<div className="flex items-center gap-3 pt-2">
							<Link
								href={CONTACT_INFO.social.facebook}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors"
								aria-label="Facebook"
							>
								<Facebook className="h-5 w-5" />
							</Link>
							<Link
								href={CONTACT_INFO.social.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</Link>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom section */}
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
					<p>
						© {currentYear} {CONTACT_INFO.company.name} - Tous droits réservés
					</p>
					<p>
						Developed & Designed with ❤️ by{' '}
						<Link
							href="https://andy-cinquin.fr"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition-colors underline"
						>
							Andy Cinquin
						</Link>
					</p>
				</div>
			</div>
		</footer>
	)
}
