import { ModernContactForm } from '@/components/sections/contact/modern-contact-form'
import { PageHero } from '@/components/sections/shared/page-hero'

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<PageHero
				title="Contactez-Moi"
				imageSrc="/usable/IMG_20240310_161440.jpg"
				imageAlt="Contact Jean-Luc Laheux Eco-Paysagiste"
			/>

			{/* Modern Contact Form */}
			<ModernContactForm />
		</div>
	)
}
