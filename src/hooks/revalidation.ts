import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Hook Payload pour déclencher la revalidation ISR après modification/suppression de contenu
 *
 * Ce hook appelle l'API route /api/revalidate pour invalider le cache Next.js
 * et forcer la régénération des pages statiques.
 */

/**
 * Fonction utilitaire pour appeler l'API de revalidation
 */
async function triggerRevalidation(params: { collection?: string; slug?: string; global?: string }) {
	const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate`
	const revalidateSecret = process.env.REVALIDATE_SECRET

	if (!revalidateUrl || !revalidateSecret) {
		console.warn('[Revalidate Hook] Missing NEXT_PUBLIC_SERVER_URL or REVALIDATE_SECRET')
		return
	}

	try {
		const response = await fetch(revalidateUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				secret: revalidateSecret,
				...params,
			}),
		})

		if (!response.ok) {
			const error = await response.json()
			console.error('[Revalidate Hook] Failed to revalidate:', error)
			return
		}

		const data = await response.json()
		console.log('[Revalidate Hook] Successfully revalidated:', data)
	} catch (error) {
		console.error('[Revalidate Hook] Error calling revalidate API:', error)
	}
}

/**
 * Hook afterChange - Déclenché après création ou modification d'un document de collection
 */
export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, collection }) => {
	// Vérifier que le document a un slug pour les collections qui en ont besoin
	if (collection.slug === 'services' || collection.slug === 'realisations') {
		if (!doc.slug) {
			console.warn(`[Revalidate Hook] No slug found for ${collection.slug} document`)
			return doc
		}
	}

	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation({
		collection: collection.slug,
		slug: doc.slug || undefined,
	}).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}

/**
 * Hook afterDelete - Déclenché après suppression d'un document de collection
 */
export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation({
		collection: collection.slug,
		slug: doc.slug || undefined,
	}).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}

/**
 * Hook afterChange pour les globals - Déclenché après modification d'un global
 */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, global }) => {
	// Déclencher la revalidation en arrière-plan (non-bloquant)
	triggerRevalidation({
		global: global.slug,
	}).catch(error => {
		console.error('[Revalidate Hook] Async error:', error)
	})

	return doc
}
