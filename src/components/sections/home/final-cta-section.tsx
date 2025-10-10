import { CtaShader } from '@/components/ui/cta-shader'

export function FinalCtaSection() {
	return (
		<CtaShader
			title="Prêt à Redonner Vie à Votre Jardin ?"
			description="Demandez votre devis gratuit et profitez de 50% de réduction d'impôt. Intervention dans le Vignoble Nantais et la Vallée de la Loire."
			buttonText="Demander un Devis Gratuit"
			buttonUrl="/contact"
			items={[
				'Réponse sous 48h',
				'Devis gratuit et sans engagement',
				'Visite et conseil gratuits',
				"50% de crédit d'impôt garanti",
			]}
			shaderVariant="energy"
		/>
	)
}
