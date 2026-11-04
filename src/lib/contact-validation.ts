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

export type ContactValidationError = {
	message: string
	error: 'VALIDATION_ERROR' | 'INVALID_EMAIL'
}

// Longueurs max par champ (anti-abus / anti-payload volumineux).
export const MAX_LENGTHS: Record<string, number> = {
	name: 100,
	email: 150,
	phone: 30,
	address: 200,
	city: 100,
	postalCode: 20,
	message: 5000,
	gardenSize: 50,
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function tooLong(formData: Partial<ContactFormData>): boolean {
	return Object.entries(MAX_LENGTHS).some(([field, max]) => {
		const value = formData[field as keyof ContactFormData]
		return typeof value === 'string' && value.length > max
	})
}

/** Renvoie l'erreur à afficher, ou null si le formulaire est valide. */
export function validateContactForm(formData: Partial<ContactFormData>): ContactValidationError | null {
	const name = formData.name?.trim()
	const email = formData.email?.trim()
	const phone = formData.phone?.trim()
	const message = formData.message?.trim()

	if (!name || !email || !phone || !message) {
		return { message: 'Veuillez remplir tous les champs obligatoires.', error: 'VALIDATION_ERROR' }
	}

	if (tooLong(formData)) {
		return { message: 'Un ou plusieurs champs dépassent la longueur autorisée.', error: 'VALIDATION_ERROR' }
	}

	if (!emailRegex.test(email)) {
		return { message: 'Veuillez entrer une adresse email valide.', error: 'INVALID_EMAIL' }
	}

	return null
}
