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
 * Valide un token Turnstile. Si `TURNSTILE_SECRET_KEY` n'est pas configuré,
 * la vérification est ignorée (retourne success) afin de ne pas casser les
 * environnements de dev non configurés — mais un warning est loggé.
 */
export async function verifyTurnstile(token: string | undefined, remoteIp?: string): Promise<TurnstileResult> {
	const secret = process.env.TURNSTILE_SECRET_KEY

	if (!secret) {
		console.warn('[Turnstile] TURNSTILE_SECRET_KEY non défini — vérification ignorée.')
		return { success: true }
	}

	if (!token) {
		return { success: false, errorCodes: ['missing-input-response'] }
	}

	try {
		const body = new URLSearchParams({ secret, response: token })
		if (remoteIp && remoteIp !== 'unknown') body.append('remoteip', remoteIp)

		const res = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
		})

		const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
		return { success: data.success === true, errorCodes: data['error-codes'] }
	} catch (error) {
		console.error('[Turnstile] Erreur de vérification:', error)
		return { success: false, errorCodes: ['internal-error'] }
	}
}
