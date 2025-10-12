import { CheckCircle2, XCircle } from 'lucide-react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EligibilityItem {
	text: string
	description?: string
}

interface TabContent {
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
	heading: string
	description: string
	tabs: Tab[]
	importantNote?: string
}

const TaxCreditEligibility = (props: TaxCreditEligibilityProps) => {
	const { heading, description, tabs, importantNote } = props

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
					<div className="mx-auto mt-8 container rounded-2xl bg-background border border-border p-6 lg:p-12">
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
				{importantNote && (
					<div className="mt-8 text-center">
						<p className="text-sm text-muted-foreground">
							<strong>Note importante :</strong> {importantNote}
						</p>
					</div>
				)}
			</div>
		</section>
	)
}

export { TaxCreditEligibility }
