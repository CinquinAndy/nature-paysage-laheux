/**
 * Vérification côté serveur d'un token Cloudflare Turnstile.
 * Doc : https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface TurnstileResult {
	success: boolean
	/** Codes d'erreur renvoyés par Cloudflare (utile pour le debug/log). */
	errorCodes?: string[]
}

/**
 * Valide un token Turnstile.
 * Sans `TURNSTILE_SECRET_KEY` : refus en production (une variable oubliée ne doit pas ouvrir le formulaire
 * en silence), vérification ignorée en développement et en test.
 */
export async function verifyTurnstile(token: unknown, remoteIp?: string): Promise<TurnstileResult> {
	const secret = process.env.TURNSTILE_SECRET_KEY

	if (!secret) {
		if (process.env.NODE_ENV === 'production') {
			console.error('[Turnstile] TURNSTILE_SECRET_KEY absent en production : envoi refusé.')
			return { success: false, errorCodes: ['missing-secret'] }
		}
		console.warn('[Turnstile] TURNSTILE_SECRET_KEY non défini — vérification ignorée (hors production).')
		return { success: true }
	}

	if (typeof token !== 'string' || !token || token.length > 2048) {
		return { success: false, errorCodes: ['missing-input-response'] }
	}

	try {
		const body = new URLSearchParams({ secret, response: token })
		if (remoteIp && remoteIp !== 'unknown') body.append('remoteip', remoteIp)

		const res = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
			signal: AbortSignal.timeout(10_000),
		})

		const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
		return { success: data.success === true, errorCodes: data['error-codes'] }
	} catch (error) {
		console.error('[Turnstile] Erreur de vérification:', error)
		return { success: false, errorCodes: ['internal-error'] }
	}
}
