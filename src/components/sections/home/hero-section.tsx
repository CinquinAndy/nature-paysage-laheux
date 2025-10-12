import Image from 'next/image'
import { getMediaUrl } from '@/lib/payload'
import type { Homepage } from '@/payload-types'

interface HeroSectionProps {
	data: Homepage['hero']
}

export function HeroSection({ data }: HeroSectionProps) {
	// Parse title to extract bold text (text between **)
	const parseTitleWithBlob = (title: string) => {
		const parts = title.split(/(\*\*.*?\*\*)/)
		return parts.map(part => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const text = part.slice(2, -2)
				return (
					<span key={`blob-${text}`} className="relative overflow-visible">
						<span className="z-10">{text}</span>
						<Image
							src="/blob.svg"
							alt="Blob"
							className="w-full scale-x-125 scale-y-175 overflow-visible -z-10 opacity-85"
							fill
						/>
					</span>
				)
			}
			return <span key={`text-${part}`}>{part}</span>
		})
	}

	const backgroundImageUrl = getMediaUrl(data.backgroundImage) || '/usable/bg.jpg'

	return (
		<section className="w-screen min-h-screen p-4 xl:p-8 rounded-4xl z-20">
			<div className="relative z-10">
				<Image
					src={backgroundImageUrl}
					alt="Paysagiste background"
					width={1920}
					height={1080}
					className="w-full h-full object-cover min-h-[80vh] max-h-screen rounded-xl brightness-75 z-10"
				/>
				<h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-7xl font-extrabold text-white absolute bottom-6 left-4 sm:bottom-12 sm:left-8 xl:bottom-20 xl:left-20 max-w-full sm:max-w-4xl xl:max-w-7xl leading-tight z-10">
					{parseTitleWithBlob(data.title)}{' '}
				</h1>
			</div>
		</section>
	)
}
