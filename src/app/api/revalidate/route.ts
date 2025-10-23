import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * API Route pour la revalidation ISR (Incremental Static Regeneration)
 *
 * Cette route est appelée par les hooks Payload CMS pour déclencher
 * la régénération des pages statiques lorsque le contenu change.
 *
 * Endpoint: POST /api/revalidate
 *
 * Body: {
 *   secret: string (REVALIDATE_SECRET)
 *   collection?: string (nom de la collection)
 *   slug?: string (slug du document pour les routes dynamiques)
 *   global?: string (nom du global)
 * }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { secret, collection, slug, global } = body

		// Vérifier le secret de revalidation
		if (secret !== process.env.REVALIDATE_SECRET) {
			return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
		}

		const revalidatedPaths: string[] = []

		// Revalidation des collections
		if (collection) {
			switch (collection) {
				case 'services':
					// Revalider la page liste des prestations
					revalidatePath('/prestations')
					revalidatedPaths.push('/prestations')

					// Si un slug est fourni, revalider aussi la page de détail
					if (slug) {
						revalidatePath(`/prestations/${slug}`)
						revalidatedPaths.push(`/prestations/${slug}`)
					}

					// Revalider aussi la homepage car elle affiche un aperçu des services
					revalidatePath('/')
					revalidatedPaths.push('/')
					break

				case 'realisations':
					// Revalider la page liste des réalisations
					revalidatePath('/realisations')
					revalidatedPaths.push('/realisations')

					// Si un slug est fourni, revalider aussi la page de détail
					if (slug) {
						revalidatePath(`/realisations/${slug}`)
						revalidatedPaths.push(`/realisations/${slug}`)
					}

					// Revalider aussi la homepage car elle affiche un aperçu des réalisations
					revalidatePath('/')
					revalidatedPaths.push('/')
					break

				case 'faq':
					// Revalider la page FAQ
					revalidatePath('/faq')
					revalidatedPaths.push('/faq')

					// Revalider aussi la homepage car elle affiche un aperçu de la FAQ
					revalidatePath('/')
					revalidatedPaths.push('/')
					break

				case 'media':
					// Pour les médias, on revalide toutes les pages car les images peuvent être partout
					revalidatePath('/', 'layout')
					revalidatedPaths.push('/ (layout)')
					break

				default:
					console.warn(`[Revalidate API] Unknown collection: ${collection}`)
			}
		}

		// Revalidation des globals
		if (global) {
			switch (global) {
				case 'homepage':
					revalidatePath('/')
					revalidatedPaths.push('/')
					break

				case 'prestations-page':
					revalidatePath('/prestations')
					revalidatedPaths.push('/prestations')
					break

				case 'realisations-page':
					revalidatePath('/realisations')
					revalidatedPaths.push('/realisations')
					break

				case 'faq-page':
					revalidatePath('/faq')
					revalidatedPaths.push('/faq')
					break

				case 'contact-page':
					revalidatePath('/contact')
					revalidatedPaths.push('/contact')
					break

				case 'mentions-legales-page':
					revalidatePath('/mentions-legales')
					revalidatedPaths.push('/mentions-legales')
					break

				case 'site-settings':
					// Les paramètres du site affectent toutes les pages (header, footer, etc.)
					revalidatePath('/', 'layout')
					revalidatedPaths.push('/ (layout)')
					break

				default:
					console.warn(`[Revalidate API] Unknown global: ${global}`)
			}
		}

		return NextResponse.json({
			revalidated: true,
			paths: revalidatedPaths,
			message: `Successfully revalidated ${revalidatedPaths.length} path(s)`,
		})
	} catch (error) {
		console.error('[Revalidate API] Error:', error)
		return NextResponse.json(
			{
				revalidated: false,
				message: 'Error revalidating',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
