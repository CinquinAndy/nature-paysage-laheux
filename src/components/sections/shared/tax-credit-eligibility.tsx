import { CheckCircle2, XCircle } from 'lucide-react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EligibilityItem {
	text: string
	description?: string
}

interface TabContent {
	badge: string
	title: string
	description: string
	items: EligibilityItem[]
	imageSrc: string
	imageAlt: string
}

interface Tab {
	value: string
	icon: React.ReactNode
	label: string
	content: TabContent
}

interface TaxCreditEligibilityProps {
	badge?: string
	heading?: string
	description?: string
	tabs?: Tab[]
}

const defaultTabs: Tab[] = [
	{
		value: 'eligible',
		icon: <CheckCircle2 className="h-auto w-4 shrink-0" />,
		label: "Éligible au crédit d'impôt",
		content: {
			title: "Prestations Éligibles au Crédit d'Impôt",
			description:
				"Ces services bénéficient du crédit d'impôt de 50% sur le montant TTC. Vous ne payez que la moitié du prix !",
			items: [
				{
					text: 'Tonte de pelouse et entretien',
					description: 'Tonte régulière, scarification, aération',
				},
				{
					text: 'Désherbage manuel et écologique',
					description: 'Sans produits chimiques, respect du sol',
				},
				{
					text: 'Taille raisonnée des haies et arbustes',
					description: 'Taille douce respectueuse de la plante',
				},
				{
					text: 'Entretien des massifs et parterres',
					description: 'Désherbage, paillage, plantation de vivaces',
				},
				{
					text: 'Débroussaillage léger',
					description: 'Nettoyage et entretien de zones végétalisées',
				},
				{
					text: 'Ramassage de feuilles et déchets verts',
					description: 'Nettoyage saisonnier du jardin',
				},
				{
					text: 'Création et entretien de potager',
					description: 'Accompagnement en permaculture',
				},
			],
			imageSrc: '/usable/IMG_20250803_123919.jpg',
			imageAlt: "Prestations éligibles au crédit d'impôt",
		},
	},
	{
		value: 'non-eligible',
		icon: <XCircle className="h-auto w-4 shrink-0" />,
		label: 'Non éligible',
		content: {
			title: "Prestations Non Éligibles au Crédit d'Impôt",
			description:
				"Ces prestations restent possibles mais ne bénéficient pas du crédit d'impôt. Elles seront facturées séparément.",
			items: [
				{
					text: 'Vente de plantes et végétaux',
					description: 'Fourniture de plants, arbres, arbustes',
				},
				{
					text: 'Fourniture de matériaux en gros volume',
					description: 'Terre, paillage, graviers, dalles',
				},
				{
					text: 'Création paysagère complexe',
					description: 'Aménagement complet de jardin, terrasses',
				},
				{
					text: 'Travaux de terrassement importants',
					description: 'Nivellement, excavation, drainage',
				},
				{
					text: "Installation de systèmes d'arrosage automatique",
					description: 'Matériel et installation',
				},
				{
					text: "Construction d'ouvrages",
					description: 'Murets, clôtures, pergolas',
				},
			],
			imageSrc: '/usable/IMG_20240310_161440.jpg',
			imageAlt: "Prestations non éligibles au crédit d'impôt",
		},
	},
]

const TaxCreditEligibility = (props: TaxCreditEligibilityProps) => {
	const heading = props.heading || "Crédit d'Impôt : Ce Qui Est Pris en Charge"
	const description =
		props.description || "Par souci d'honnêteté, voici ce qui bénéficie ou non du crédit d'impôt de 50% selon la loi."
	const tabs = props.tabs || defaultTabs

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center gap-4 text-center mb-12">
					<h2 className="max-w-2xl text-3xl font-bold md:text-4xl">{heading}</h2>
					<p className="text-muted-foreground max-w-2xl">{description}</p>
				</div>
				<Tabs defaultValue={tabs[0].value} className="mt-8">
					<TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent h-auto p-0">
						{tabs.map(tab => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg border border-transparent data-[state=active]:border-primary/20"
							>
								{tab.icon} {tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					<div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-background border border-border p-6 lg:p-12">
						{tabs.map(tab => (
							<TabsContent
								key={tab.value}
								value={tab.value}
								className="grid place-items-start gap-12 lg:grid-cols-2 lg:gap-10 mt-0"
							>
								<div className="flex flex-col gap-6 order-2 lg:order-1">
									<h3 className="text-2xl font-bold lg:text-3xl">{tab.content.title}</h3>
									<p className="text-muted-foreground lg:text-lg">{tab.content.description}</p>
									<ul className="space-y-4 mt-4">
										{tab.content.items.map(item => (
											<li key={item.text} className="flex items-start gap-3">
												{tab.value === 'eligible' ? (
													<CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
												) : (
													<XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
												)}
												<div>
													<span className="font-medium">{item.text}</span>
													{item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
												</div>
											</li>
										))}
									</ul>
								</div>
								<div className="relative w-full h-full rounded-xl overflow-hidden order-1 lg:order-2">
									<Image src={tab.content.imageSrc} alt={tab.content.imageAlt} fill className="object-cover" />
								</div>
							</TabsContent>
						))}
					</div>
				</Tabs>
				<div className="mt-8 text-center">
					<p className="text-sm text-muted-foreground">
						<strong>Note importante :</strong> L'entretien ultérieur de créations non-éligibles reste éligible au crédit
						d'impôt.
					</p>
				</div>
			</div>
		</section>
	)
}

export { TaxCreditEligibility }
