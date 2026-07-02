'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { ContactFormEmail } from '@/emails/contact-form-email'
import { getClientIp, rateLimit } from '@/lib/security/rate-limit'
import { verifyTurnstile } from '@/lib/security/turnstile'

const resend = new Resend(process.env.RESEND_TOKEN)

// Limites de rate-limiting : max 3 envois par IP toutes les 10 minutes.
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

// Longueurs max par champ (anti-abus / anti-payload volumineux).
const MAX_LENGTHS: Record<string, number> = {
	name: 100,
	email: 150,
	phone: 30,
	address: 200,
	city: 100,
	postalCode: 20,
	message: 5000,
	gardenSize: 50,
}

export interface ContactFormData {
	name: string
	email: string
	phone: string
	address?: string
	city?: string
	postalCode?: string
	message: string
	gardenSize?: string
	/** Token Cloudflare Turnstile généré côté client. */
	turnstileToken?: string
	/** Champ honeypot : doit rester vide (rempli uniquement par des bots). */
	website?: string
}

export interface ContactFormResponse {
	success: boolean
	message: string
	error?: string
}

function tooLong(formData: ContactFormData): boolean {
	return Object.entries(MAX_LENGTHS).some(([field, max]) => {
		const value = formData[field as keyof ContactFormData]
		return typeof value === 'string' && value.length > max
	})
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
	try {
		// 1. Honeypot : si le champ caché est rempli, c'est un bot.
		//    On renvoie un faux succès sans rien envoyer.
		if (formData.website && formData.website.trim() !== '') {
			return { success: true, message: 'Votre demande a été envoyée avec succès !' }
		}

		// 2. Rate limiting par IP.
		const requestHeaders = await headers()
		const ip = getClientIp(requestHeaders)
		const limit = rateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)
		if (!limit.success) {
			const minutes = Math.ceil(limit.retryAfterSeconds / 60)
			return {
				success: false,
				message: `Trop de demandes envoyées. Veuillez réessayer dans ${minutes} minute(s).`,
				error: 'RATE_LIMITED',
			}
		}

		// 3. Validation basique (présence des champs obligatoires).
		if (!formData.name || !formData.email || !formData.phone || !formData.message) {
			return {
				success: false,
				message: 'Veuillez remplir tous les champs obligatoires.',
				error: 'VALIDATION_ERROR',
			}
		}

		// 4. Longueurs max.
		if (tooLong(formData)) {
			return {
				success: false,
				message: 'Un ou plusieurs champs dépassent la longueur autorisée.',
				error: 'VALIDATION_ERROR',
			}
		}

		// 5. Validation de l'email.
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			return {
				success: false,
				message: 'Veuillez entrer une adresse email valide.',
				error: 'INVALID_EMAIL',
			}
		}

		// 6. Vérification Cloudflare Turnstile (anti-bot).
		const turnstile = await verifyTurnstile(formData.turnstileToken, ip)
		if (!turnstile.success) {
			return {
				success: false,
				message: 'La vérification anti-robot a échoué. Veuillez réessayer.',
				error: 'CAPTCHA_FAILED',
			}
		}

		// 7. Envoyer l'email via Resend avec React Email.
		const { error } = await resend.emails.send({
			from: 'Nature Paysage Laheux <contact@email.andy-cinquin.fr>',
			to: ['nature.paysage.laheux@gmail.com'],
			replyTo: formData.email,
			subject: `Nouvelle demande de contact de ${formData.name}`,
			react: ContactFormEmail({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				address: formData.address,
				city: formData.city,
				postalCode: formData.postalCode,
				message: formData.message,
				gardenSize: formData.gardenSize,
			}),
		})

		if (error) {
			console.error('Erreur Resend:', error)
			return {
				success: false,
				message: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
				error: 'RESEND_ERROR',
			}
		}

		return {
			success: true,
			message: 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.',
		}
	} catch (error) {
		console.error('Erreur lors de la soumission du formulaire:', error)
		return {
			success: false,
			message: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
			error: 'UNKNOWN_ERROR',
		}
	}
}
