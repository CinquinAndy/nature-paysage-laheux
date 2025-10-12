import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RichText } from '@/components/ui/rich-text'
import { getMediaUrl, getMentionsLegalesPageData } from '@/lib/payload'

export const metadata: Metadata = {
	title: 'Mentions Légales | Jean-Luc Laheux Eco-Paysagiste',
	description: 'Mentions légales et informations sur le site nature-paysage-laheux.fr',
	robots: 'noindex, follow',
}

export default async function MentionsLegalesPage() {
	const pageData = await getMentionsLegalesPageData()

	const heroImageUrl = getMediaUrl(pageData.hero?.image)

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={pageData.hero?.title || 'Mentions Légales'}
				imageSrc={heroImageUrl || '/usable/PXL_20251006_080220831.jpg'}
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
				<div className="mx-auto max-w-3xl">
					{/* Category Badge */}
					<p className="text-base/7 font-semibold text-emerald-600">Informations Légales</p>

					{/* Title */}
					<h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
						Mentions Légales
					</h1>

					{/* Main Content from Payload CMS */}
					<div className="mt-10">
						{pageData.content && <RichText content={pageData.content} />}

						{/* HARDCODED SECTIONS - NON-EDITABLE VIA PAYLOAD */}
						{/* These sections ensure proper attribution and copyright protection */}

						<div className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-7 prose-p:my-4 prose-a:text-emerald-600 prose-a:font-medium hover:prose-a:text-emerald-700 hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold">
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
								<Link
									href="https://andy-cinquin.fr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-emerald-600 hover:underline"
								>
									https://andy-cinquin.fr
								</Link>
							</p>
							<p>
								Prestation "clé en main" incluant : création de thème personnalisé, image de marque, référencement,
								hébergement.
							</p>

							<h2>Droit d&apos;auteur et propriété intellectuelle</h2>
							<p>
								L&apos;ensemble de ce site est soumis à une protection de droits d&apos;auteur selon les Articles L335-2
								et suivants du Code de la propriété intellectuelle.
							</p>
							<p>
								Toute reproduction ou représentation totale ou partielle de son contenu (textes, images, sons, éléments
								graphiques, sauf photos prise par Mr Jean-Luc Laheux) par quelque procédé utilisé, sans
								l&apos;autorisation préalable de Cinquin Andy, est strictement interdite et constituera une contrefaçon
								sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
							</p>
							<p>
								<strong>Titulaire des droits :</strong>
								<br />
								Cinquin Andy, Développeur Freelance. Et Mr Jean-Luc Laheux, Eco-Paysagiste.
								<br />
								SIRET : 880 505 276 00019
								<br />4 Impasse de la Marchaisière
								<br />
								44115 Haute-Goulaine
							</p>
							<p>Toute violation fera l&apos;objet de poursuites.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
