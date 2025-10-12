'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { type ContactFormData, submitContactForm } from '@/actions/contact'
import { AddressAutocomplete } from '@/components/ui/address-autocomplete'
import { Button } from '@/components/ui/button'
import type { ContactPage, SiteSetting } from '@/payload-types'

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: 'easeOut' as const,
		},
	},
}

interface ModernContactFormProps {
	formSection?: ContactPage['formSection']
	contactInfo: SiteSetting['contact']
	benefits?:
		| {
				benefit?: string | null
				id?: string | null
		  }[]
		| null
}

export function ModernContactForm({ formSection, contactInfo, benefits }: ModernContactFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		message: '',
		gardenSize: '',
	})

	const [focusedField, setFocusedField] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const result = await submitContactForm(formData as ContactFormData)

			if (result.success) {
				toast.success('Message envoyé !', {
					description: 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.',
					duration: 5000,
				})
				// Réinitialiser le formulaire
				setFormData({
					name: '',
					email: '',
					phone: '',
					address: '',
					city: '',
					postalCode: '',
					message: '',
					gardenSize: '',
				})
			} else {
				toast.error('Erreur', {
					description: result.message,
					duration: 5000,
				})
			}
		} catch (_error) {
			toast.error('Erreur', {
				description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
				duration: 5000,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	// Format phone for href
	const phoneHref = contactInfo.phone.replace(/\s/g, '')

	// Format full address
	const fullAddress = [contactInfo.address?.postalCode, contactInfo.address?.city, contactInfo.address?.region]
		.filter(Boolean)
		.join(' ')

	return (
		<div className="relative isolate bg-background px-6 py-24 sm:py-32 lg:px-8">
			{/* Background Pattern */}
			<svg
				aria-hidden="true"
				className="absolute inset-0 -z-10 size-full stroke-border/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
			>
				<defs>
					<pattern x="50%" y={-64} id="contact-pattern" width={200} height={200} patternUnits="userSpaceOnUse">
						<path d="M100 200V.5M.5 .5H200" fill="none" />
					</pattern>
				</defs>
				<svg x="50%" y={-64} className="overflow-visible fill-muted/20" aria-hidden="true">
					<path
						d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
						strokeWidth={0}
					/>
				</svg>
				<rect fill="url(#contact-pattern)" width="100%" height="100%" strokeWidth={0} />
			</svg>

			<motion.div
				className="mx-auto max-w-xl lg:max-w-6xl"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<motion.div variants={itemVariants} className="text-center lg:text-left">
					<h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
						{formSection?.title || 'Parlons de Votre Jardin'}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{formSection?.subtitle ||
							"Demandez votre devis gratuit et bénéficiez de 50% de crédit d'impôt sur vos prestations."}
					</p>
				</motion.div>

				<div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
					{/* Form */}
					<motion.form variants={itemVariants} onSubmit={handleSubmit} className="lg:flex-auto">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							{/* Name */}
							<motion.div variants={itemVariants} className="sm:col-span-2">
								<label htmlFor="name" className="block text-sm font-semibold text-foreground">
									Nom complet *
								</label>
								<div className="mt-2.5">
									<input
										id="name"
										name="name"
										type="text"
										required
										value={formData.name}
										onChange={e => setFormData({ ...formData, name: e.target.value })}
										onFocus={() => setFocusedField('name')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'name'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="Jean Dupont"
									/>
								</div>
							</motion.div>

							{/* Email */}
							<motion.div variants={itemVariants}>
								<label htmlFor="email" className="block text-sm font-semibold text-foreground">
									Email *
								</label>
								<div className="mt-2.5">
									<input
										id="email"
										name="email"
										type="email"
										required
										value={formData.email}
										onChange={e => setFormData({ ...formData, email: e.target.value })}
										onFocus={() => setFocusedField('email')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'email'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="jean.dupont@email.com"
									/>
								</div>
							</motion.div>

							{/* Phone */}
							<motion.div variants={itemVariants}>
								<label htmlFor="phone" className="block text-sm font-semibold text-foreground">
									Téléphone *
								</label>
								<div className="mt-2.5">
									<input
										id="phone"
										name="phone"
										type="tel"
										required
										value={formData.phone}
										onChange={e => setFormData({ ...formData, phone: e.target.value })}
										onFocus={() => setFocusedField('phone')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'phone'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="06 12 34 56 78"
									/>
								</div>
							</motion.div>

							{/* Address */}
							<motion.div variants={itemVariants}>
								<label htmlFor="address" className="block text-sm font-semibold text-foreground">
									Adresse du jardin
								</label>
								<div className="mt-2.5">
									<AddressAutocomplete
										value={formData.address}
										onChange={value => setFormData({ ...formData, address: value })}
										onSelect={address => {
											setFormData({
												...formData,
												address: address.properties.label,
												city: address.properties.city,
												postalCode: address.properties.postcode,
											})
										}}
										onFocus={() => setFocusedField('address')}
										onBlur={() => setFocusedField(null)}
										placeholder="Commencez à taper une adresse..."
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none ${
											focusedField === 'address'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
									/>
								</div>
							</motion.div>

							{/* Garden Size */}
							<motion.div variants={itemVariants}>
								<label htmlFor="gardenSize" className="block text-sm font-semibold text-foreground">
									Surface du jardin
								</label>
								<div className="mt-2.5">
									<select
										id="gardenSize"
										name="gardenSize"
										value={formData.gardenSize}
										onChange={e => setFormData({ ...formData, gardenSize: e.target.value })}
										onFocus={() => setFocusedField('gardenSize')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 focus:outline-none ${
											focusedField === 'gardenSize'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
									>
										<option value="">Sélectionnez...</option>
										{formSection?.gardenSizeOptions?.map(option => (
											<option key={option.id || option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
							</motion.div>

							{/* Message */}
							<motion.div variants={itemVariants} className="sm:col-span-2">
								<label htmlFor="message" className="block text-sm font-semibold text-foreground">
									Votre message *
								</label>
								<div className="mt-2.5">
									<textarea
										id="message"
										name="message"
										rows={6}
										required
										value={formData.message}
										onChange={e => setFormData({ ...formData, message: e.target.value })}
										onFocus={() => setFocusedField('message')}
										onBlur={() => setFocusedField(null)}
										className={`block w-full rounded-lg bg-background px-4 py-3 text-base text-foreground border-2 transition-all duration-200 placeholder:text-muted-foreground focus:outline-none resize-none ${
											focusedField === 'message'
												? 'border-primary shadow-lg shadow-primary/20'
												: 'border-border hover:border-primary/50'
										}`}
										placeholder="Décrivez votre projet, vos besoins, vos attentes..."
									/>
								</div>
							</motion.div>
						</div>

						<motion.div variants={itemVariants} className="mt-10">
							<Button
								type="submit"
								size="lg"
								disabled={isSubmitting}
								className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Envoi en cours...
									</>
								) : (
									'Envoyer ma demande'
								)}
							</Button>
						</motion.div>

						<motion.p variants={itemVariants} className="mt-4 text-sm text-muted-foreground">
							{formSection?.privacyText ||
								'En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre demande. Réponse sous 48h maximum.'}
						</motion.p>
					</motion.form>

					{/* Sidebar Info */}
					<motion.div variants={itemVariants} className="lg:mt-6 lg:w-80 lg:flex-none">
						{/* Contact Info Card */}
						<div className="rounded-2xl bg-card border border-border p-8 shadow-lg">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
											<Phone className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Téléphone</p>
										<Link
											href={`tel:${phoneHref}`}
											className="text-base text-muted-foreground hover:text-primary transition-colors"
										>
											{contactInfo.phone}
										</Link>
										<p className="text-xs text-muted-foreground mt-1">Le moyen le plus rapide</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
											<Mail className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Email</p>
										<Link
											href={`mailto:${contactInfo.email}`}
											className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
										>
											{contactInfo.email}
										</Link>
										<p className="text-xs text-muted-foreground mt-1">Réponse sous 48h</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
											<MapPin className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Adresse</p>
										<p className="text-sm text-muted-foreground">{fullAddress}</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
											<Clock className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<p className="text-sm font-semibold text-foreground">Horaires</p>
										<p className="text-sm text-muted-foreground">Lundi - Vendredi</p>
										<p className="text-sm text-muted-foreground">{contactInfo.hours?.weekday}</p>
									</div>
								</div>
							</div>

							{/* Benefits */}
							<div className="mt-8 space-y-3 pt-8 border-t border-border">
								{benefits?.map(item =>
									item.benefit ? (
										<div key={item.id} className="flex items-center gap-3">
											<CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
											<span className="text-sm text-muted-foreground">{item.benefit}</span>
										</div>
									) : null
								)}
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	)
}
