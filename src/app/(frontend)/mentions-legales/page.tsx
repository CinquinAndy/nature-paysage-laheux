import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
	title: 'Mentions Légales | Jean-Luc Laheux Eco-Paysagiste',
	description: 'Mentions légales et informations sur le site nature-paysage-laheux.fr',
	robots: 'noindex, follow',
}

export default function MentionsLegalesPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title="Mentions Légales"
				imageSrc="/usable/PXL_20251006_080220831.jpg"
				imageAlt="Mentions légales Nature et Paysage Laheux"
			/>

			{/* Breadcrumb Navigation */}
			<div className="bg-white border-b border-gray-200">
				<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
					<Breadcrumb
						items={[
							{ label: 'Accueil', href: '/' },
							{ label: 'Mentions Légales', href: '/mentions-legales' },
						]}
					/>
				</div>
			</div>

			{/* Article Content in Prose Style */}
			<div className="bg-white px-6 py-16 lg:px-8">
				<div className="mx-auto max-w-3xl text-base/7 text-gray-700">
					{/* Category Badge */}
					<p className="text-base/7 font-semibold text-emerald-600">Informations Légales</p>

					{/* Title */}
					<h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
						Mentions Légales
					</h1>

					{/* Main Content */}
					<div className="mt-10 max-w-2xl text-gray-600">
						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground first:mt-0">
							Éditeur du site
						</h2>
						<p className="mt-6">
							<strong className="font-semibold text-foreground">SASU Nature et Paysage Laheux</strong>
							<br />
							Représentée par Jean-Luc Laheux, Président
						</p>
						<p className="mt-4">
							37 bis la Miniere
							<br />
							44690 Monnières
							<br />
							France
						</p>
						<p className="mt-4">
							<strong className="font-semibold text-foreground">SIRET :</strong> [EN ATTENTE]
							<br />
							<strong className="font-semibold text-foreground">Email :</strong> nature.paysage.laheux@gmail.com
							<br />
							<strong className="font-semibold text-foreground">Téléphone :</strong> 06 31 04 34 45
						</p>
						<p className="mt-4">
							<strong className="font-semibold text-foreground">Responsable de publication :</strong> Jean-Luc Laheux
						</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Agrément Services à la Personne
						</h2>
						<p className="mt-6">
							SASU Nature et Paysage Laheux est agréée Services à la Personne (SAP). Cet agrément nous autorise à
							exercer les activités de petits travaux de jardinage éligibles au crédit d&apos;impôt prévu à
							l&apos;article 199 sexdecies du Code général des impôts.
						</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Hébergement du site
						</h2>
						<p className="mt-6">
							Ce site est hébergé par :
							<br />
							<strong className="font-semibold text-foreground">netcup GmbH</strong>
							<br />
							Daimlerstraße 25
							<br />
							76185 Karlsruhe
							<br />
							Allemagne
						</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Création du site internet
						</h2>
						<p className="mt-6">
							<strong className="font-semibold text-foreground">Conception, développement et design :</strong>
						</p>
						<p className="mt-4">
							Cinquin Andy
							<br />
							SIRET : 880 505 276 00019
							<br />4 Impasse de la Marchaisière
							<br />
							44115 Haute-Goulaine
							<br />
							Téléphone : 06 21 58 26 84
							<br />
							Site web :{' '}
							<Link
								href="https://andy-cinquin.fr"
								target="_blank"
								rel="noopener noreferrer"
								className="text-emerald-600 hover:underline"
							>
								https://andy-cinquin.fr
							</Link>
						</p>
						<p className="mt-4">
							Prestation "clé en main" incluant : création de thème personnalisé, image de marque, référencement,
							hébergement.
						</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Droit d&apos;auteur et propriété intellectuelle
						</h2>
						<p className="mt-6">
							L&apos;ensemble de ce site est soumis à une protection de droits d&apos;auteur selon les Articles L335-2
							et suivants du Code de la propriété intellectuelle.
						</p>
						<p className="mt-4">
							Toute reproduction ou représentation totale ou partielle de son contenu (textes, images, sons, éléments
							graphiques) par quelque procédé utilisé, sans l&apos;autorisation préalable de Cinquin Andy, est
							strictement interdite et constituera une contrefaçon sanctionnée par les articles L.335-2 et suivants du
							Code de la propriété intellectuelle.
						</p>
						<p className="mt-4">
							<strong className="font-semibold text-foreground">Titulaire des droits :</strong>
							<br />
							Cinquin Andy
							<br />
							SIRET : 880 505 276 00019
							<br />4 Impasse de la Marchaisière
							<br />
							44115 Haute-Goulaine
						</p>
						<p className="mt-4">Toute violation fera l&apos;objet de poursuites.</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Crédits photographiques
						</h2>
						<p className="mt-6">Les photographies présentes sur ce site sont la propriété de :</p>
						<ul className="mt-4 space-y-2 list-disc pl-6">
							<li>Cinquin Andy (création et design)</li>
							<li>Jean-Luc Laheux (photos de réalisations jardins)</li>
						</ul>
						<p className="mt-4">Toute utilisation sans autorisation est interdite.</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Protection des données personnelles
						</h2>

						<h3 className="mt-8 text-xl font-semibold text-foreground">Responsable du traitement</h3>
						<p className="mt-4">
							SASU Nature et Paysage Laheux
							<br />
							37 bis la Miniere
							<br />
							44690 Monnières
							<br />
							Email : nature.paysage.laheux@gmail.com
						</p>

						<h3 className="mt-8 text-xl font-semibold text-foreground">Données collectées</h3>
						<p className="mt-4">
							Dans le cadre de la gestion des demandes de devis et des prestations, nous collectons :
						</p>
						<ul className="mt-4 space-y-2 list-disc pl-6">
							<li>Identité : civilité, nom, prénom</li>
							<li>Coordonnées : adresse, email, téléphone</li>
							<li>Informations sur votre jardin : surface, type de prestations souhaitées</li>
							<li>Photos de votre jardin (avec votre accord)</li>
						</ul>

						<h3 className="mt-8 text-xl font-semibold text-foreground">Finalités</h3>
						<p className="mt-4">Ces données sont utilisées exclusivement pour :</p>
						<ul className="mt-4 space-y-2 list-disc pl-6">
							<li>Traiter votre demande de devis</li>
							<li>Réaliser les prestations commandées</li>
							<li>Établir les factures et attestations fiscales</li>
							<li>Gérer notre relation client</li>
						</ul>

						<h3 className="mt-8 text-xl font-semibold text-foreground">Vos droits</h3>
						<p className="mt-4">
							Conformément au RGPD, vous disposez des droits suivants : droit d&apos;accès, de rectification,
							d&apos;effacement, de limitation du traitement, d&apos;opposition et de portabilité.
						</p>
						<p className="mt-4">
							<strong className="font-semibold text-foreground">Pour exercer vos droits :</strong>
							<br />
							Email : nature.paysage.laheux@gmail.com
							<br />
							Courrier : SASU Nature et Paysage Laheux, 37 bis la Miniere, 44690 Monnières
						</p>
						<p className="mt-4">Nous vous répondrons dans un délai d&apos;un mois.</p>
						<p className="mt-4">
							<strong className="font-semibold text-foreground">Réclamation :</strong> Si vous estimez que vos droits ne
							sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL : www.cnil.fr
						</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Limitation de responsabilité
						</h2>
						<p className="mt-6">
							SASU Nature et Paysage Laheux s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées
							sur ce site. Toutefois, nous ne pouvons garantir l&apos;exhaustivité ou l&apos;absence d&apos;erreur.
						</p>

						<h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-foreground">
							Droit applicable
						</h2>
						<p className="mt-6">
							Le présent site et les présentes mentions légales sont régis par le droit français. En cas de litige, une
							solution amiable sera recherchée avant toute action judiciaire.
						</p>

						<p className="mt-12 text-sm text-foreground">
							<strong className="font-semibold">Date de dernière mise à jour :</strong> Janvier 2025
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
