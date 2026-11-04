'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { ContactFormEmail } from '@/emails/contact-form-email'
import { type ContactFormData, normalizeSubmissionId, validateContactForm } from '@/lib/contact-validation'
import { getClientIp, rateLimit } from '@/lib/security/rate-limit'
import { verifyTurnstile } from '@/lib/security/turnstile'

// Expéditeur sur un domaine vérifié dans le compte Resend (andy-cinquin.com).
// L'ancien expéditeur contact@email.andy-cinquin.fr n'est plus vérifié : Resend répondait 403.
const FROM = 'Nature Paysage Laheux <contact@andy-cinquin.com>'
const TO = ['nature.paysage.laheux@gmail.com']

const SEND_ERROR_MESSAGE = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."

// Limites de rate-limiting : max 3 envois par IP toutes les 10 minutes.
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

export interface ContactFormResponse {
	success: boolean
	message: string
	error?: string
}

// Client créé à l'appel : une clé absente ne fait plus planter le module au chargement.
function getResend(): Resend | null {
	const apiKey = process.env.RESEND_TOKEN
	return apiKey ? new Resend(apiKey) : null
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

		// 3. Validation : champs obligatoires, longueurs max, format de l'email.
		const invalid = validateContactForm(formData)
		if (invalid) {
			return { success: false, message: invalid.message, error: invalid.error }
		}

		// 4. Vérification Cloudflare Turnstile (anti-bot).
		const turnstile = await verifyTurnstile(formData.turnstileToken, ip)
		if (!turnstile.success) {
			return {
				success: false,
				message: 'La vérification anti-robot a échoué. Veuillez réessayer.',
				error: 'CAPTCHA_FAILED',
			}
		}

		// 5. Envoyer l'email via Resend avec React Email.
		const resend = getResend()
		if (!resend) {
			console.error('Formulaire de contact : RESEND_TOKEN absent, envoi impossible.')
			return { success: false, message: SEND_ERROR_MESSAGE, error: 'CONFIG_ERROR' }
		}

		// Clé d'idempotence : un renvoi du même envoi (après une mise à jour du site ou une coupure réseau)
		// est reconnu par Resend pendant 24 h et ne crée pas un second email.
		const submissionId = normalizeSubmissionId(formData.submissionId)
		const sendOptions = submissionId ? { idempotencyKey: `contact-form/${submissionId}` } : undefined

		const { data, error } = await resend.emails.send(
			{
				from: FROM,
				to: TO,
				replyTo: formData.email.trim(),
				subject: `Nouvelle demande de contact de ${formData.name.trim()}`,
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
			},
			sendOptions
		)

		if (error) {
			// Pas de données du visiteur dans les journaux : seulement le retour de Resend.
			console.error('Erreur Resend:', { name: error.name, statusCode: error.statusCode, message: error.message })
			return { success: false, message: SEND_ERROR_MESSAGE, error: 'RESEND_ERROR' }
		}

		console.info('Formulaire de contact envoyé, id Resend :', data?.id)
		return {
			success: true,
			message: 'Votre demande a été envoyée avec succès ! Je vous répondrai sous 48h.',
		}
	} catch (error) {
		console.error('Erreur lors de la soumission du formulaire:', error instanceof Error ? error.message : error)
		return {
			success: false,
			message: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
			error: 'UNKNOWN_ERROR',
		}
	}
}
