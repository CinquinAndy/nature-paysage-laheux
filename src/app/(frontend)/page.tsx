import { FaqShortSection } from '@/components/sections/home/faq-short-section'
import { FinalCtaSection } from '@/components/sections/home/final-cta-section'
import { HeroSection } from '@/components/sections/home/hero-section'
import { InterventionZoneSection } from '@/components/sections/home/intervention-zone-section'
import { PhilosophySection } from '@/components/sections/home/philosophy-section'
import { RealisationsPreviewSection } from '@/components/sections/home/realisations-preview-section'
import { ServicesPreviewSection } from '@/components/sections/home/services-preview-section'
import { TaxCreditSection } from '@/components/sections/home/tax-credit-section'
import { ValuesSection } from '@/components/sections/home/values-section'

export default function HomePage() {
	return (
		<>
			{/* good */}
			<HeroSection />
			{/* good */}
			<ServicesPreviewSection />
			{/* good */}
			<PhilosophySection />
			{/* good */}
			<TaxCreditSection />
			{/* good */}
			<InterventionZoneSection />
			<RealisationsPreviewSection />
			<FaqShortSection />

			<FinalCtaSection />
			<ValuesSection />
		</>
	)
}
