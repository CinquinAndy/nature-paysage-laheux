import { Award, Check, Heart, Leaf, Shield, X, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Homepage } from '@/payload-types'
import { getMediaUrl } from '@/lib/payload'

interface PhilosophySectionProps {
	data: Homepage['philosophy']
}

const iconMap: Record<string, LucideIcon> = {
	leaf: Leaf,
	heart: Heart,
	award: Award,
	shield: Shield,
}

export function PhilosophySection({ data }: PhilosophySectionProps) {
	// Parse title to extract bold text (text between **)
	const parseTitleWithBold = (title: string) => {
		const parts = title.split(/(\*\*.*?\*\*)/)
		return parts.map((part, index) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const text = part.slice(2, -2)
				return (
					<span key={index} className="text-primary">
						{text}
					</span>
				)
			}
			return <span key={index}>{part}</span>
		})
	}

	const imageUrl = getMediaUrl(data.primaryImage)
	const philosophyPoints = data.philosophyPoints || []
	const preferences = data.preferences || []
	const refusals = data.refusals || []
	return (
		<section className="py-16 md:py-24 bg-background relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="max-w-3xl mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{parseTitleWithBold(data.title)}</h2>
					{data.introText && <p className="text-lg text-muted-foreground leading-relaxed">{data.introText}</p>}
					{data.quote && (
						<p className="text-base text-muted-foreground mt-4 italic">
							<strong className="text-foreground">{data.quote}</strong>
						</p>
					)}
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
					{/* Left: Layered Image Mockup */}
					{imageUrl && (
						<div className="relative h-[400px] lg:h-[500px]">
							{/* Secondary Image (Background) */}
							<div className="absolute top-0 right-0 w-[85%] h-[70%] rounded-2xl overflow-hidden shadow-2xl">
								<Image src={imageUrl} alt="Travail dans un jardin" fill className="object-cover blur-[2px] opacity-90 -scale-x-100" />
							</div>

							{/* Primary Image (Foreground) */}
							<div className="absolute bottom-0 left-0 w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-2xl group">
								<Image
									src={imageUrl}
									alt="Travail avec des méthodes naturelles"
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-700"
								/>
								{/* Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

								{/* Content on Image */}
								{(data.imageOverlayTitle || data.imageOverlayDescription) && (
									<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
										{data.imageOverlayTitle && <h3 className="text-xl font-bold mb-2">{data.imageOverlayTitle}</h3>}
										{data.imageOverlayDescription && (
											<p className="text-white/90 text-sm leading-relaxed">{data.imageOverlayDescription}</p>
										)}
									</div>
								)}
							</div>
						</div>
					)}

					{/* Right: Philosophy Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
						{philosophyPoints.map((point, index) => {
							const Icon = point.icon
							return (
								<div
									key={point.title}
									className={cn(
										'flex flex-col border-border py-8 px-6 relative group/feature transition-all duration-200',
										'lg:border-r',
										(index === 0 || index === 2) && 'lg:border-l',
										index < 2 && 'lg:border-b'
									)}
								>
									{/* Gradient overlay on hover - from top for top row */}
									{index < 2 && (
										<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
									)}
									{/* Gradient overlay on hover - from bottom for bottom row */}
									{index >= 2 && (
										<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />
									)}

									{/* Icon */}
									<div className="mb-4 relative z-10">
										<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover/feature:bg-primary/20 group-hover/feature:scale-110 transition-all duration-300">
											<Icon className="h-6 w-6 text-primary" />
										</div>
									</div>

									{/* Title with animated border */}
									<div className="mb-2 relative z-10">
										<div className="absolute left-0 top-0 h-6 w-1 rounded-tr-full rounded-br-full bg-muted-foreground/30 group-hover/feature:h-8 group-hover/feature:bg-primary transition-all duration-200 origin-top" />
										<h4 className="text-lg font-semibold pl-3 group-hover/feature:translate-x-1 transition-transform duration-200">
											{point.title}
										</h4>
									</div>

									{/* Description */}
									<p className="text-sm text-muted-foreground leading-relaxed relative z-10 pl-3">
										{point.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>

				{/* Two Columns: What I Do / What I Don't */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12">
					{/* What I Do */}
					<div className="flex gap-4 flex-col items-start">
						<div className="flex gap-2 flex-col">
							<h3 className="text-3xl md:text-4xl tracking-tighter font-semibold">Ce que je privilégie</h3>
						</div>
						<div className="flex gap-6 pt-8 flex-col w-full">
							{preferences.map(item => (
								<div key={item.title} className="flex flex-row gap-4 w-full items-start">
									<Check className="w-5 h-5 mt-0.5 text-green-600 flex-shrink-0" />
									<div className="flex flex-col gap-1">
										<p className="font-medium text-foreground">{item.title}</p>
										<p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* What I Don't */}
					<div className="flex gap-4 flex-col items-start">
						<div className="flex gap-2 flex-col">
							<h3 className="text-3xl md:text-4xl tracking-tighter font-semibold">Ce que je refuse</h3>
						</div>
						<div className="flex gap-6 pt-8 flex-col w-full">
							{refusals.map(item => (
								<div key={item.title} className="flex flex-row gap-4 w-full items-start">
									<X className="w-5 h-5 mt-0.5 text-red-600 flex-shrink-0" />
									<div className="flex flex-col gap-1">
										<p className="font-medium text-foreground">{item.title}</p>
										<p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Engagement Banner */}
				<section className="overflow-hidden pt-0 md:pt-0">
					<div className="relative mx-auto flex container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
						{/* Title */}
						<h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200">
							Transparence & Crédit d'impôt
						</h2>

						{/* Description */}
						{true && (
							<p className="text-muted-foreground opacity-0 animate-fade-in-up delay-300">
								En tant que membre de la coopérative Unipros, je vous garantis transparence sur les tarifs et bénéfice
								maximum du crédit d'impôt (50%). Chaque jardin mérite une attention particulière et des méthodes qui
								respectent son écosystème unique.
							</p>
						)}

						{/* Action Button */}
						<Button variant="default" size="lg" className="opacity-0 animate-fade-in-up delay-500" asChild>
							<Link href="/contact">Demander un devis gratuit</Link>
						</Button>

						{/* Glow Effect */}
						{true && (
							<div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in delay-700" />
						)}
					</div>
				</section>
			</div>
		</section>
	)
}
