import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'

export const metadata: Metadata = {
	title: 'Mentions Légales | Jean-Luc Laheux Eco-Paysagiste',
	description: 'Mentions légales et informations sur le site nature-paysage-laheux.fr',
	robots: 'noindex, follow',
}

export default function MentionsLegalesPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<PageHero
				title="Mentions Légales"
				imageSrc="/usable/PXL_20251006_080220831.jpg"
				imageAlt="Mentions légales Nature et Paysage Laheux"
			/>

			{/* Content */}
			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto prose prose-gray">
						<h2>Éditeur du site</h2>
						<p>
							<strong>SASU Nature et Paysage Laheux</strong>
							<br />
							Représentée par Jean-Luc Laheux, Président
						</p>
						<p>
							37 bis la Miniere
							<br />
							44690 Monnières
							<br />
							France
						</p>
						<p>
							<strong>SIRET :</strong> [EN ATTENTE]
							<br />
							<strong>Email :</strong> nature.paysage.laheux@gmail.com
							<br />
							<strong>Téléphone :</strong> 06 31 04 34 45
						</p>
						<p>
							<strong>Responsable de publication :</strong> Jean-Luc Laheux
						</p>

						<h2>Agrément Services à la Personne</h2>
						<p>
							SASU Nature et Paysage Laheux est agréée Services à la Personne (SAP). Cet agrément nous autorise à
							exercer les activités de petits travaux de jardinage éligibles au crédit d'impôt prévu à l'article 199
							sexdecies du Code général des impôts.
						</p>

						<h2>Hébergement du site</h2>
						<p>
							Ce site est hébergé par :
							<br />
							<strong>netcup GmbH</strong>
							<br />
							Daimlerstraße 25
							<br />
							76185 Karlsruhe
							<br />
							Allemagne
						</p>

						<h2>Création du site internet</h2>
						<p>
							<strong>Conception, développement et design :</strong>
						</p>
						<p>
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
							<Link href="https://andy-cinquin.fr" target="_blank" rel="noopener noreferrer">
								https://andy-cinquin.fr
							</Link>
						</p>
						<p>
							Prestation "clé en main" incluant : création de thème personnalisé, image de marque, référencement,
							hébergement.
						</p>

						<h2>Droit d'auteur et propriété intellectuelle</h2>
						<p>
							L'ensemble de ce site est soumis à une protection de droits d'auteur selon les Articles L335-2 et suivants
							du Code de la propriété intellectuelle.
						</p>
						<p>
							Toute reproduction ou représentation totale ou partielle de son contenu (textes, images, sons, éléments
							graphiques) par quelque procédé utilisé, sans l'autorisation préalable de Cinquin Andy, est strictement
							interdite et constituera une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
							propriété intellectuelle.
						</p>
						<p>
							<strong>Titulaire des droits :</strong>
							<br />
							Cinquin Andy
							<br />
							SIRET : 880 505 276 00019
							<br />4 Impasse de la Marchaisière
							<br />
							44115 Haute-Goulaine
						</p>
						<p>Toute violation fera l'objet de poursuites.</p>

						<h2>Crédits photographiques</h2>
						<p>
							Les photographies présentes sur ce site sont la propriété de :
							<ul>
								<li>Cinquin Andy (création et design)</li>
								<li>Jean-Luc Laheux (photos de réalisations jardins)</li>
							</ul>
							Toute utilisation sans autorisation est interdite.
						</p>

						<h2>Protection des données personnelles</h2>
						<h3>Responsable du traitement</h3>
						<p>
							SASU Nature et Paysage Laheux
							<br />
							37 bis la Miniere
							<br />
							44690 Monnières
							<br />
							Email : nature.paysage.laheux@gmail.com
						</p>

						<h3>Données collectées</h3>
						<p>Dans le cadre de la gestion des demandes de devis et des prestations, nous collectons :</p>
						<ul>
							<li>Identité : civilité, nom, prénom</li>
							<li>Coordonnées : adresse, email, téléphone</li>
							<li>Informations sur votre jardin : surface, type de prestations souhaitées</li>
							<li>Photos de votre jardin (avec votre accord)</li>
						</ul>

						<h3>Finalités</h3>
						<p>Ces données sont utilisées exclusivement pour :</p>
						<ul>
							<li>Traiter votre demande de devis</li>
							<li>Réaliser les prestations commandées</li>
							<li>Établir les factures et attestations fiscales</li>
							<li>Gérer notre relation client</li>
						</ul>

						<h3>Vos droits</h3>
						<p>
							Conformément au RGPD, vous disposez des droits suivants : droit d'accès, de rectification, d'effacement,
							de limitation du traitement, d'opposition et de portabilité.
						</p>
						<p>
							<strong>Pour exercer vos droits :</strong>
							<br />
							Email : nature.paysage.laheux@gmail.com
							<br />
							Courrier : SASU Nature et Paysage Laheux, 37 bis la Miniere, 44690 Monnières
						</p>
						<p>Nous vous répondrons dans un délai d'un mois.</p>
						<p>
							<strong>Réclamation :</strong> Si vous estimez que vos droits ne sont pas respectés, vous pouvez
							introduire une réclamation auprès de la CNIL : www.cnil.fr
						</p>

						<h2>Limitation de responsabilité</h2>
						<p>
							SASU Nature et Paysage Laheux s'efforce d'assurer l'exactitude des informations diffusées sur ce site.
							Toutefois, nous ne pouvons garantir l'exhaustivité ou l'absence d'erreur.
						</p>

						<h2>Droit applicable</h2>
						<p>
							Le présent site et les présentes mentions légales sont régis par le droit français. En cas de litige, une
							solution amiable sera recherchée avant toute action judiciaire.
						</p>

						<p className="text-sm text-muted-foreground mt-12">
							<strong>Date de dernière mise à jour :</strong> Janvier 2025
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}
