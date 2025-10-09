import { Card, CardContent } from '@/components/ui/card'
import { TAX_CREDIT_INFO } from '@/lib/data/services'

export function TaxCreditSection() {
	return (
		<section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
						Comment Profiter de 50% de Réduction d'Impôt ?
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Un processus simple en 4 étapes pour économiser sur vos travaux de jardinage
					</p>
				</div>

				{/* Steps Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
					{TAX_CREDIT_INFO.steps.map((step, index) => (
						<Card
							key={step.number}
							className="relative overflow-hidden border-2 hover:border-primary transition-colors"
						>
							{/* Step Number */}
							<div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
								<span className="text-2xl font-bold text-primary">{step.number}</span>
							</div>

							<CardContent className="pt-6 pb-6">
								<h3 className="text-xl font-semibold mb-3 pr-14">{step.title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
							</CardContent>

							{/* Connector Arrow (hidden on last item and mobile) */}
							{index < TAX_CREDIT_INFO.steps.length - 1 && (
								<div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
									<svg width="32" height="32" viewBox="0 0 32 32" className="text-primary">
										<path
											d="M8 16 L24 16 M24 16 L18 10 M24 16 L18 22"
											stroke="currentColor"
											strokeWidth="2"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							)}
						</Card>
					))}
				</div>

				{/* Example Box */}
				<div className="max-w-2xl mx-auto">
					<Card className="bg-white dark:bg-gray-900 border-2 border-primary/30 shadow-xl">
						<CardContent className="p-6 md:p-8">
							<h3 className="text-2xl font-bold mb-6 text-center">Exemple Concret</h3>
							<div className="space-y-4">
								<div className="flex justify-between items-center pb-3 border-b">
									<span className="text-muted-foreground">Coût d'une prestation :</span>
									<span className="text-xl font-semibold">{TAX_CREDIT_INFO.example.serviceCost} €</span>
								</div>
								<div className="flex justify-between items-center pb-3 border-b">
									<span className="text-muted-foreground">Crédit d'impôt (50%) :</span>
									<span className="text-xl font-semibold text-green-600">- {TAX_CREDIT_INFO.example.taxCredit} €</span>
								</div>
								<div className="flex justify-between items-center pt-2">
									<span className="font-semibold text-lg">Coût réel pour vous :</span>
									<span className="text-3xl font-bold text-primary">{TAX_CREDIT_INFO.example.realCost} €</span>
								</div>
							</div>
							<p className="text-sm text-center text-muted-foreground mt-6 pt-6 border-t">
								Plafond annuel : {TAX_CREDIT_INFO.maxAnnualExpense}€ de prestations = {TAX_CREDIT_INFO.maxAnnualCredit}€
								de crédit maximum
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}
