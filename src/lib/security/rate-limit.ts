/**
 * Rate limiter en mémoire (fenêtre glissante), sans dépendance externe.
 *
 * Suffisant pour une instance unique. Pour un déploiement multi-instances,
 * remplacer par un store partagé (ex. Upstash Redis + @upstash/ratelimit).
 */

interface RateLimitEntry {
	timestamps: number[]
}

const store = new Map<string, RateLimitEntry>()

// Nettoyage périodique des entrées expirées pour éviter une fuite mémoire.
let lastSweep = 0

function sweep(now: number, windowMs: number) {
	if (now - lastSweep < windowMs) return
	lastSweep = now
	for (const [key, entry] of store) {
		const fresh = entry.timestamps.filter(t => now - t < windowMs)
		if (fresh.length === 0) {
			store.delete(key)
		} else {
			entry.timestamps = fresh
		}
	}
}

export interface RateLimitResult {
	success: boolean
	remaining: number
	retryAfterSeconds: number
}

/**
 * @param key      Identifiant du client (ex. IP).
 * @param limit    Nombre d'actions autorisées par fenêtre.
 * @param windowMs Durée de la fenêtre en millisecondes.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
	const now = Date.now()
	sweep(now, windowMs)

	const entry = store.get(key) ?? { timestamps: [] }
	const recent = entry.timestamps.filter(t => now - t < windowMs)

	if (recent.length >= limit) {
		const oldest = Math.min(...recent)
		const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000))
		store.set(key, { timestamps: recent })
		return { success: false, remaining: 0, retryAfterSeconds }
	}

	recent.push(now)
	store.set(key, { timestamps: recent })
	return { success: true, remaining: limit - recent.length, retryAfterSeconds: 0 }
}

/**
 * Extrait l'IP client depuis les en-têtes d'une requête, en tenant compte
 * du reverse proxy (Coolify/Traefik/Nginx). Prend la première IP de la
 * chaîne `x-forwarded-for`.
 */
export function getClientIp(headers: Headers): string {
	const forwardedFor = headers.get('x-forwarded-for')
	if (forwardedFor) {
		const first = forwardedFor.split(',')[0]?.trim()
		if (first) return first
	}
	return headers.get('x-real-ip')?.trim() || 'unknown'
}
