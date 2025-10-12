import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RichText } from '@/components/ui/rich-text'
import { getMediaUrl, getMentionsLegalesPageData } from '@/lib/payload'
import type { MentionsLegalesPage as MentionsLegalesPageType } from '@/payload-types'

export const metadata: Metadata = {
	title: 'Mentions Légales | Jean-Luc Laheux Eco-Paysagiste',
	description: 'Mentions légales et informations sur le site nature-paysage-laheux.fr',
	robots: 'noindex, follow',
}

/**
 * Add Lorem Ipsum fallback values to easily identify missing content
 */
function addLoremFallbacks(pageData: MentionsLegalesPageType): MentionsLegalesPageType {
	return {
		...pageData,
		hero: {
			...pageData.hero,
			title: pageData.hero?.title || '🚨 LOREM: Mentions Légales',
			image: pageData.hero?.image || null,
		},
		content: pageData.content || {
			root: {
				type: 'root',
				children: [
					{
						type: 'paragraph',
						version: 1,
						children: [
							{
								type: 'text',
								version: 1,
								text: '🚨 LOREM: Contenu des mentions légales à remplir dans Payload CMS. Inclure : Éditeur du site, Agrément SAP, Crédits photographiques, Protection des données personnelles (RGPD), Limitation de responsabilité, Droit applicable.',
							},
						],
					},
				],
				direction: null,
				format: '',
				indent: 0,
				version: 1,
			},
		},
	}
}

export default async function MentionsLegalesPage() {
	// Fetch data from Payload CMS
	const pageDataRaw = await getMentionsLegalesPageData()

	// Add Lorem Ipsum fallbacks
	const pageData = addLoremFallbacks(pageDataRaw)

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
				<div className="mx-auto max-w-3xl text-base/7 text-gray-700">
					{/* Category Badge */}
					<p className="text-base/7 font-semibold text-emerald-600">Informations Légales</p>

					{/* Title */}
					<h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
						Mentions Légales
					</h1>

					{/* Main Content from Payload CMS */}
					<div className="mt-10 max-w-2xl text-gray-600">
						<RichText content={pageData.content} />

						{/* HARDCODED SECTIONS - NON-EDITABLE VIA PAYLOAD */}
						{/* These sections ensure proper attribution and copyright protection */}

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
					</div>
				</div>
			</div>
		</div>
	)
}
