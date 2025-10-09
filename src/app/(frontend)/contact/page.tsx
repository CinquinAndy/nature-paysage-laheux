'use client'

import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_INFO } from '@/lib/data/contact-info'

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		message: '',
		services: [] as string[],
		gardenSize: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: Handle form submission (email service, API, etc.)
		console.log('Form submitted:', formData)
		alert('Merci pour votre demande ! Je vous répondrai sous 48h.')
	}

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-primary/10 to-green-50 dark:from-primary/5 dark:to-green-950 py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Contactez-Moi</h1>
						<p className="text-xl text-muted-foreground">Demandez votre devis gratuit - Réponse sous 48h</p>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						{/* Contact Info */}
						<div className="lg:col-span-1 space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Informations de Contact</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-start gap-3">
										<Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
										<div>
											<p className="font-medium">Téléphone</p>
											<a
												href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
												className="text-muted-foreground hover:text-primary"
											>
												{CONTACT_INFO.phone}
											</a>
											<p className="text-xs text-muted-foreground mt-1">Le moyen le plus rapide</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
										<div>
											<p className="font-medium">Email</p>
											<a
												href={`mailto:${CONTACT_INFO.email}`}
												className="text-muted-foreground hover:text-primary break-all text-sm"
											>
												{CONTACT_INFO.email}
											</a>
											<p className="text-xs text-muted-foreground mt-1">Réponse sous 48h</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
										<div>
											<p className="font-medium">Adresse</p>
											<p className="text-sm text-muted-foreground">{CONTACT_INFO.address.street}</p>
											<p className="text-sm text-muted-foreground">
												{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
										<div>
											<p className="font-medium">Horaires</p>
											<p className="text-sm text-muted-foreground">Lundi - Vendredi</p>
											<p className="text-sm text-muted-foreground">{CONTACT_INFO.hours.weekday}</p>
											<p className="text-xs text-muted-foreground mt-1">{CONTACT_INFO.hours.note}</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Benefits */}
							<Card className="bg-primary/5">
								<CardContent className="pt-6 space-y-3">
									<div className="flex items-center gap-2 text-sm">
										<CheckCircle2 className="h-4 w-4 text-primary" />
										<span>Devis gratuit et sans engagement</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<CheckCircle2 className="h-4 w-4 text-primary" />
										<span>Visite gratuite</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<CheckCircle2 className="h-4 w-4 text-primary" />
										<span>Réponse sous 48h</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<CheckCircle2 className="h-4 w-4 text-primary" />
										<span>50% de crédit d'impôt</span>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Contact Form */}
						<div className="lg:col-span-2">
							<Card>
								<CardHeader>
									<CardTitle>Demande de Devis Gratuit</CardTitle>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleSubmit} className="space-y-6">
										{/* Personal Info */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="name">Nom *</Label>
												<Input
													id="name"
													required
													value={formData.name}
													onChange={e => setFormData({ ...formData, name: e.target.value })}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="email">Email *</Label>
												<Input
													id="email"
													type="email"
													required
													value={formData.email}
													onChange={e => setFormData({ ...formData, email: e.target.value })}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="phone">Téléphone *</Label>
											<Input
												id="phone"
												type="tel"
												required
												value={formData.phone}
												onChange={e => setFormData({ ...formData, phone: e.target.value })}
											/>
										</div>

										{/* Address */}
										<div className="space-y-4">
											<h3 className="font-semibold">Adresse du jardin</h3>
											<div className="space-y-2">
												<Label htmlFor="address">Rue</Label>
												<Input
													id="address"
													value={formData.address}
													onChange={e => setFormData({ ...formData, address: e.target.value })}
												/>
											</div>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="postalCode">Code postal</Label>
													<Input
														id="postalCode"
														value={formData.postalCode}
														onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="city">Commune</Label>
													<Input
														id="city"
														value={formData.city}
														onChange={e => setFormData({ ...formData, city: e.target.value })}
													/>
												</div>
											</div>
										</div>

										{/* Garden Size */}
										<div className="space-y-2">
											<Label htmlFor="gardenSize">Surface approximative de votre jardin</Label>
											<select
												id="gardenSize"
												className="flex h-11 w-full rounded-lg border border-input bg-transparent px-4 py-2 text-sm"
												value={formData.gardenSize}
												onChange={e => setFormData({ ...formData, gardenSize: e.target.value })}
											>
												<option value="">Sélectionnez...</option>
												<option value="<100">Moins de 100m²</option>
												<option value="100-300">100-300m²</option>
												<option value="300-500">300-500m²</option>
												<option value="500-1000">500-1000m²</option>
												<option value=">1000">Plus de 1000m²</option>
											</select>
										</div>

										{/* Message */}
										<div className="space-y-2">
											<Label htmlFor="message">Votre message *</Label>
											<Textarea
												id="message"
												required
												rows={6}
												placeholder="Décrivez votre projet, vos besoins, vos attentes..."
												value={formData.message}
												onChange={e => setFormData({ ...formData, message: e.target.value })}
											/>
										</div>

										{/* Submit */}
										<Button type="submit" size="lg" className="w-full">
											Envoyer Ma Demande
										</Button>

										<p className="text-xs text-muted-foreground text-center">
											En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre
											demande. Réponse sous 48h maximum.
										</p>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
