import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from 'bun:test'

// Resend simulé : chaque test choisit la réponse de l'API.
type Reponse = { data: { id: string } | null; error: { name: string; statusCode: number; message: string } | null }
let reponse: Reponse = { data: { id: 'test-id' }, error: null }
const envois: Record<string, unknown>[] = []
const clesUtilisees: (string | undefined)[] = []
const optionsEnvois: ({ idempotencyKey?: string } | undefined)[] = []

mock.module('resend', () => ({
	Resend: class {
		constructor(cle?: string) {
			clesUtilisees.push(cle)
		}
		emails = {
			send: async (payload: Record<string, unknown>, options?: { idempotencyKey?: string }) => {
				envois.push(payload)
				optionsEnvois.push(options)
				return reponse
			},
		}
	},
}))

// En-têtes simulés : une IP différente à chaque appel, pour ne pas buter sur la limite de 3 envois par IP.
let ipSuivante = 0
let ipFixe: string | null = null
mock.module('next/headers', () => ({
	headers: async () => new Headers({ 'x-forwarded-for': ipFixe ?? `10.0.0.${++ipSuivante}` }),
}))

const { submitContactForm } = await import('@/actions/contact')

const formulaire = {
	name: 'Jeanne Test',
	email: 'jeanne@example.com',
	phone: '0600000000',
	city: 'Angers',
	postalCode: '49000',
	message: 'Bonjour, je voudrais un devis pour mon jardin.',
}

const MESSAGE_ERREUR = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer."

describe('submitContactForm', () => {
	const cleAvant = process.env.RESEND_TOKEN
	const turnstileAvant = process.env.TURNSTILE_SECRET_KEY
	let consoleError: ReturnType<typeof spyOn>
	let consoleInfo: ReturnType<typeof spyOn>
	let consoleWarn: ReturnType<typeof spyOn>

	beforeEach(() => {
		process.env.RESEND_TOKEN = 're_test_factice'
		// Sans clé Turnstile, la vérification anti-robot est ignorée (avec un avertissement).
		delete process.env.TURNSTILE_SECRET_KEY
		reponse = { data: { id: 'test-id' }, error: null }
		envois.length = 0
		clesUtilisees.length = 0
		optionsEnvois.length = 0
		ipFixe = null
		consoleError = spyOn(console, 'error').mockImplementation(() => {})
		consoleInfo = spyOn(console, 'info').mockImplementation(() => {})
		consoleWarn = spyOn(console, 'warn').mockImplementation(() => {})
	})

	afterEach(() => {
		process.env.RESEND_TOKEN = cleAvant
		if (turnstileAvant === undefined) delete process.env.TURNSTILE_SECRET_KEY
		else process.env.TURNSTILE_SECRET_KEY = turnstileAvant
		consoleError.mockRestore()
		consoleInfo.mockRestore()
		consoleWarn.mockRestore()
	})

	test('envoi réussi : même destinataire qu’avant, expéditeur vérifié, réponse au visiteur', async () => {
		const resultat = await submitContactForm(formulaire)
		expect(resultat.success).toBe(true)
		expect(envois).toHaveLength(1)
		expect(envois[0].to).toEqual(['nature.paysage.laheux@gmail.com'])
		expect(envois[0].from).toBe('Nature Paysage Laheux <contact@andy-cinquin.com>')
		expect(envois[0].replyTo).toBe('jeanne@example.com')
		expect(envois[0].subject).toBe('Nouvelle demande de contact de Jeanne Test')
		expect(clesUtilisees).toEqual(['re_test_factice'])
	})

	test.each([
		[401, 'validation_error', 'API key is invalid'],
		[403, 'validation_error', 'The email.andy-cinquin.fr domain is not verified'],
	])('Resend répond %i : message clair et RESEND_ERROR', async (statusCode, name, message) => {
		reponse = { data: null, error: { name, statusCode, message } }
		const resultat = await submitContactForm(formulaire)
		expect(resultat).toEqual({ success: false, message: MESSAGE_ERREUR, error: 'RESEND_ERROR' })
		// Le journal garde le code de Resend, sans les données du visiteur.
		const journal = JSON.stringify(consoleError.mock.calls)
		expect(journal).toContain(String(statusCode))
		expect(journal).not.toContain('jeanne@example.com')
		expect(journal).not.toContain('0600000000')
	})

	test('clé absente : pas d’envoi, CONFIG_ERROR journalisé', async () => {
		delete process.env.RESEND_TOKEN
		const resultat = await submitContactForm(formulaire)
		expect(resultat).toEqual({ success: false, message: MESSAGE_ERREUR, error: 'CONFIG_ERROR' })
		expect(envois).toHaveLength(0)
		expect(consoleError).toHaveBeenCalled()
	})

	test('formulaire invalide : rien n’est envoyé', async () => {
		const resultat = await submitContactForm({ ...formulaire, email: 'pas-un-email' })
		expect(resultat.error).toBe('INVALID_EMAIL')
		expect(envois).toHaveLength(0)
	})

	test('champ trop long : rien n’est envoyé', async () => {
		const resultat = await submitContactForm({ ...formulaire, message: 'a'.repeat(5001) })
		expect(resultat.error).toBe('VALIDATION_ERROR')
		expect(envois).toHaveLength(0)
	})

	test('honeypot rempli : faux succès, rien n’est envoyé', async () => {
		const resultat = await submitContactForm({ ...formulaire, website: 'https://spam.example' })
		expect(resultat.success).toBe(true)
		expect(envois).toHaveLength(0)
	})

	test('plus de 3 envois depuis la même IP : RATE_LIMITED', async () => {
		ipFixe = '10.9.9.9'
		for (let i = 0; i < 3; i++) {
			expect((await submitContactForm(formulaire)).success).toBe(true)
		}
		const resultat = await submitContactForm(formulaire)
		expect(resultat.error).toBe('RATE_LIMITED')
		expect(envois).toHaveLength(3)
	})

	test('exception du client : UNKNOWN_ERROR', async () => {
		reponse = undefined as unknown as Reponse
		const resultat = await submitContactForm(formulaire)
		expect(resultat.error).toBe('UNKNOWN_ERROR')
	})

	test('identifiant d’envoi valide : clé d’idempotence Resend (pas de double envoi au renvoi)', async () => {
		const submissionId = '3f2b8c1e-9a4d-4e6f-8b7a-1c2d3e4f5a6b'
		const premier = await submitContactForm({ ...formulaire, submissionId })
		const renvoi = await submitContactForm({ ...formulaire, submissionId })
		expect(premier.success).toBe(true)
		expect(renvoi.success).toBe(true)
		expect(optionsEnvois).toEqual([
			{ idempotencyKey: `contact-form/${submissionId}` },
			{ idempotencyKey: `contact-form/${submissionId}` },
		])
	})

	test('identifiant d’envoi absent ou mal formé : envoi sans clé d’idempotence', async () => {
		await submitContactForm(formulaire)
		await submitContactForm({ ...formulaire, submissionId: 'pas-un-uuid' })
		await submitContactForm({ ...formulaire, submissionId: { $ne: 1 } as unknown as string })
		expect(envois).toHaveLength(3)
		expect(optionsEnvois).toEqual([undefined, undefined, undefined])
	})
})
