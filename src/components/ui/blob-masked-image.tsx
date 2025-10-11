import Image from 'next/image'
import React from 'react'

interface BlobMaskedImageProps {
	src: string
	alt: string
	className?: string
	priority?: boolean
}

export const BlobMaskedImage = React.forwardRef<HTMLDivElement, BlobMaskedImageProps>(
	({ src, alt, className = '', priority = false }, ref) => {
		return (
			<div
				ref={ref}
				className={`relative w-full h-full ${className}`}
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
			>
				<Image
					src={src}
					alt={alt}
					fill
					className="object-cover transition-transform duration-300 hover:scale-105"
					priority={priority}
				/>
			</div>
		)
	}
)

BlobMaskedImage.displayName = 'BlobMaskedImage'
