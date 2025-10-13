import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/shared/page-hero'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RichText } from '@/components/ui/rich-text'
import { getMediaUrl, getMentionsLegalesPageData } from '@/lib/payload'
import { generateSEOMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const mentionsLegalesPage = await getMentionsLegalesPageData()

	return generateSEOMetadata(mentionsLegalesPage, '/mentions-legales', {
		robots: 'noindex, follow',
	})
}

export default async function MentionsLegalesPage() {
	const pageData = await getMentionsLegalesPageData()

	const heroImageUrl = getMediaUrl(pageData.hero!.image!)!

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title={pageData.hero!.title!}
				imageSrc={heroImageUrl}
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
					<div className="mt-10">{pageData.content && <RichText content={pageData.content} />}</div>
				</div>
			</div>
		</div>
	)
}
