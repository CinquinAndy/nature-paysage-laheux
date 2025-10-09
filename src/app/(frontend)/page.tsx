import { FaqShortSection } from '@/components/sections/home/faq-short-section'
import { FinalCtaSection } from '@/components/sections/home/final-cta-section'
import { HeroSection } from '@/components/sections/home/hero-section'
import { InterventionZoneSection } from '@/components/sections/home/intervention-zone-section'
import { PhilosophySection } from '@/components/sections/home/philosophy-section'
import { RealisationsPreviewSection } from '@/components/sections/home/realisations-preview-section'
import { ServicesPreviewSection } from '@/components/sections/home/services-preview-section'
import { TaxCreditSection } from '@/components/sections/home/tax-credit-section'

export default function HomePage() {
	return (
		<>
			<HeroSection />
			{/* <ValuesSection /> */}
			<ServicesPreviewSection />

			<PhilosophySection />
			<TaxCreditSection />
			<InterventionZoneSection />
			<RealisationsPreviewSection />
			<FaqShortSection />
			<FinalCtaSection />
		</>
	)
}
