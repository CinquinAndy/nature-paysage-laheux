import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Vérifie qu'une requête provient d'un utilisateur Payload authentifié.
 *
 * Ces routes API (génération SEO/alt-text, nettoyage média) sont appelées
 * depuis le panneau d'administration Payload, où le cookie de session est
 * envoyé automatiquement (même origine). Sans cette garde, n'importe qui
 * peut déclencher des appels payants (Gemini, ForVoyez) ou muter le contenu.
 *
 * Retourne `null` si l'utilisateur est authentifié, sinon une réponse 401.
 */
export async function requireAdmin(req: Request): Promise<NextResponse | null> {
	try {
		const payload = await getPayload({ config })
		const { user } = await payload.auth({ headers: req.headers })

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		return null
	} catch (error) {
		console.error('[requireAdmin] Auth check failed:', error)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
}
