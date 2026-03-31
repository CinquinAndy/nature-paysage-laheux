'use client'

import { Leaf } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/animation/animated-section'
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail'
import { getMediaUrlOptional } from '@/lib/payload/media-helpers'
import type { Homepage } from '@/payload-types'

interface PartnersSectionProps {
	data: Homepage['partnersSection']
}

export function PartnersSection({ data }: PartnersSectionProps) {
	if (!data) return null

	const badgeLabel = data.badgeLabel || 'Mes Partenariats'

	const partners =
		data.partners?.map(
			(partner: NonNullable<NonNullable<Homepage['partnersSection']>['partners']>[number], index: number): FocusRailItem => ({
				id: partner.id || index,
				title: partner.title || partner.name,
				description: partner.title ? partner.name : undefined,
				meta: partner.title ? 'Partenaire' : undefined,
				// biome-ignore lint/suspicious/noExplicitAny: explicit any needed for Payload media object compatibility
				imageSrc: getMediaUrlOptional(partner.image as any) || 'https://images.unsplash.com/photo-1541888941259-7724ed2c4bf6?q=80&w=1000&auto=format&fit=crop',
				href: partner.link || undefined,
			})
		) || []

	// Fallback if no partners are defined
	const displayPartners =
		partners.length > 0
			? partners
			: [
					{
						id: 'fallback-1',
						title: 'Rouge Pivoine Paysagiste',
						description: 'Caroline Guette-Marsac',
						meta: 'Partenaire',
						imageSrc: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop',
						href: 'https://www.rougepivoinepaysagiste.fr/',
					},
					{
						id: 'fallback-2',
						title: 'Nature & Biodiversité',
						description: 'Expertise Locale',
						meta: 'Collaboration',
						imageSrc: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1000&auto=format&fit=crop',
					},
				]

	const parseTitleWithBold = (text: string) => {
		const parts = text.split(/(\*\*.*?\*\*)/)
		return parts.map((part, index) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				return (
					<span key={part} className="text-primary">
						{part.slice(2, -2)}
					</span>
				)
			}
			return part
		})
	}

	return (
		<section id="partenariats" className="py-24 bg-background overflow-hidden relative">
			{/* Background Pattern subtle */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
			</div>

			<div className="container mx-auto px-4 mb-16 text-center relative z-10">
				<AnimatedSection className="space-y-4 flex flex-col items-center">
					{badgeLabel && (
						<div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-2">
							<Leaf className="w-4 h-4 mr-2" />
							{badgeLabel}
						</div>
					)}
					{data.title && (
						<h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{parseTitleWithBold(data.title)}</h2>
					)}
					{data.description && <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{data.description}</p>}
				</AnimatedSection>
			</div>

			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
				className="w-full max-w-7xl mx-auto px-4 relative z-10"
			>
				<FocusRail items={displayPartners} autoPlay={false} loop={true} />
			</motion.div>
		</section>
	)
}
