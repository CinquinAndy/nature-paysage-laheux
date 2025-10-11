import { BlobMaskedImage } from '@/components/ui/blob-masked-image'

interface PageHeroProps {
	title: string
	imageSrc: string
	imageAlt: string
}

export function PageHero({ title, imageSrc, imageAlt }: PageHeroProps) {
	return (
		<section className="relative w-full h-full min-h-screen overflow-hidden bg-sidebar-accent rounded-b-4xl">
			<div className="px-4 sm:px-6 lg:px-8 h-full w-full flex items-center justify-center">
				<div className="relative w-full h-full flex items-center">
					{/* Blob Masked Image Container */}
					<div className="relative w-screen h-screen">
						<BlobMaskedImage src={imageSrc} alt={imageAlt} priority />

						{/* Overlay gradient for better text readability */}
						<div
							className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"
							style={{
								maskImage: 'url(/blob_bg.svg)',
								WebkitMaskImage: 'url(/blob_bg.svg)',
								maskRepeat: 'no-repeat',
								WebkitMaskRepeat: 'no-repeat',
								maskSize: 'contain',
								WebkitMaskSize: 'contain',
								maskPosition: 'center',
								WebkitMaskPosition: 'center',
							}}
						/>

						{/* Title overlay */}
						<div className="absolute inset-0 flex items-center justify-center">
							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center px-8 leading-tight drop-shadow-2xl">
								{title}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
