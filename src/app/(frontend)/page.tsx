import Image from 'next/image'

export default function HomePage() {
	return (
		<section className="w-screen min-h-screen p-8 rounded-xl">
			<div className="relative">
				<Image
					src="/usable/bg.jpg"
					alt="Paysagiste background"
					width={1920}
					height={1080}
					className="w-full h-full object-cover max-h-screen rounded-xl brightness-75"
				/>
				<h1 className="text-7xl font-extrabold text-white absolute bottom-20 left-20 max-w-7xl leading-tight z-0">
					<span className="relative overflow-visible">
						<span className="z-10">Transformez</span>
						<Image
							src="/blob.svg"
							alt="Blob"
							className="w-full scale-x-125 scale-y-175 overflow-visible -z-10 opacity-85"
							fill
						/>
					</span>{' '}
					Votre Jardin, <br />
					Votre Paysagiste d'Exception en Loire-Atlantique
				</h1>
			</div>
		</section>
	)
}
