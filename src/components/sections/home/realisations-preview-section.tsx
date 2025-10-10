import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4'

const realisationsData: Gallery4Item[] = [
	{
		id: 'entretien-pelouse',
		title: 'Entretien de Pelouse Écologique',
		description:
			'Tonte raisonnée et entretien respectueux de votre gazon pour préserver la biodiversité tout en maintenant un aspect soigné de votre jardin.',
		href: '/realisations',
		image: '/usable/IMG_20231117_093237.jpg',
	},
	{
		id: 'taille-haies',
		title: 'Taille de Haies Naturelle',
		description:
			'Taille professionnelle de vos haies en respectant les cycles naturels des végétaux et en favorisant une croissance harmonieuse.',
		href: '/realisations',
		image: '/usable/IMG_20240310_161440.jpg',
	},
	{
		id: 'amenagement-jardin',
		title: 'Aménagement de Jardin',
		description:
			"Création et aménagement d'espaces verts sur mesure, adaptés à vos besoins et respectueux de l'environnement local.",
		href: '/realisations',
		image: '/usable/IMG_20250402_142527.jpg',
	},
	{
		id: 'potager-permaculture',
		title: 'Potager en Permaculture',
		description:
			'Conception et entretien de potagers productifs selon les principes de la permaculture pour une production saine et durable.',
		href: '/realisations',
		image: '/usable/IMG_20250803_122326_1.jpg',
	},
	{
		id: 'massif-fleuri',
		title: 'Massifs Fleuris',
		description:
			"Création de massifs colorés avec des plantes vivaces et annuelles, adaptées au climat local pour un fleurissement toute l'année.",
		href: '/realisations',
		image: '/usable/IMG_20250803_123919.jpg',
	},
	{
		id: 'jardin-entretenu',
		title: 'Entretien Complet de Jardin',
		description:
			"Prestation complète d'entretien régulier de votre jardin : tonte, taille, désherbage, et soins des végétaux pour un espace toujours impeccable.",
		href: '/realisations',
		image: '/usable/PXL_20251006_080220831.jpg',
	},
]

export function RealisationsPreviewSection() {
	return (
		<section className="py-16 md:pb-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<Gallery4
					title="Découvrez Mes Réalisations"
					description="Exemples de travaux de jardinage et d'aménagement paysager réalisés avec passion et respect de la nature dans la région de Monnières"
					items={realisationsData}
				/>

				{/* CTA */}
				<div className="text-center ">
					<Button size="lg" variant="outline" asChild>
						<Link href="/realisations">
							Voir Toutes Mes Réalisations
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
