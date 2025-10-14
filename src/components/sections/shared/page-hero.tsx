import type { ReactNode } from 'react'
import { BlobMaskedImage } from '@/components/ui/blob-masked-image'

interface PageHeroProps {
	title: string
	imageSrc: string
	imageAlt: string
	action?: ReactNode
}

export function PageHero({ title, imageSrc, imageAlt, action }: PageHeroProps) {
	return (
		<section className="relative w-full h-full min-h-screen overflow-hidden bg-sidebar-accent rounded-b-2xl md:rounded-b-4xl">
			<div className="px-4 sm:px-6 lg:px-8 h-full w-full flex items-center justify-center md:mt-16">
				<div className="relative w-full h-full flex items-center">
					{/* Blob Masked Image Container */}
					<div className="relative w-screen h-screen">
						<BlobMaskedImage src={imageSrc} alt={imageAlt} priority useVerticalOnMobile />

						{/* Overlay gradient for better text readability - responsive mask */}
						<div
							className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent blob-mask-responsive"
							style={
								{
									'--blob-mask-mobile': 'url(/blob_bg_vertical.svg)',
									'--blob-mask-desktop': 'url(/blob_bg.svg)',
									maskImage: 'var(--blob-mask-mobile)',
									WebkitMaskImage: 'var(--blob-mask-mobile)',
									maskRepeat: 'no-repeat',
									WebkitMaskRepeat: 'no-repeat',
									maskSize: 'contain',
									WebkitMaskSize: 'contain',
									maskPosition: 'center',
									WebkitMaskPosition: 'center',
								} as React.CSSProperties
							}
						/>

						{/* Title overlay */}
						<div className="absolute inset-0 flex items-center justify-center px-4">
							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center px-4 sm:px-8 leading-tight drop-shadow-2xl max-w-5xl">
								{title}
							</h1>
						</div>

						{/* Action button - responsive positioning */}
						{action && <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10">{action}</div>}
					</div>
				</div>
			</div>
		</section>
	)
}
