import { describe, expect, test } from 'bun:test'
import { validateContactForm } from '@/lib/contact-validation'

const valide = {
	name: 'Jeanne Test',
	email: 'jeanne@example.com',
	phone: '0600000000',
	message: 'Bonjour, je voudrais un devis.',
}

describe('validateContactForm', () => {
	test('accepte un formulaire complet', () => {
		expect(validateContactForm(valide)).toBeNull()
	})

	test.each(['name', 'email', 'phone', 'message'] as const)('refuse un champ obligatoire vide : %s', champ => {
		expect(validateContactForm({ ...valide, [champ]: '' })?.error).toBe('VALIDATION_ERROR')
	})

	test('refuse un champ fait seulement d’espaces', () => {
		expect(validateContactForm({ ...valide, name: '   ' })?.error).toBe('VALIDATION_ERROR')
	})

	test.each([
		['name', 101],
		['phone', 31],
		['message', 5001],
		['gardenSize', 51],
	] as const)('refuse un champ trop long : %s', (champ, longueur) => {
		expect(validateContactForm({ ...valide, [champ]: 'a'.repeat(longueur) })).toEqual({
			message: 'Un ou plusieurs champs dépassent la longueur autorisée.',
			error: 'VALIDATION_ERROR',
		})
	})

	test('accepte un message à la longueur maximale', () => {
		expect(validateContactForm({ ...valide, message: 'a'.repeat(5000) })).toBeNull()
	})

	test.each(['jeanne', 'jeanne@', 'jeanne@example', 'jean ne@example.com'])('refuse l’email %s', email => {
		expect(validateContactForm({ ...valide, email })).toEqual({
			message: 'Veuillez entrer une adresse email valide.',
			error: 'INVALID_EMAIL',
		})
	})

	test('les champs facultatifs peuvent manquer', () => {
		expect(validateContactForm({ ...valide, city: undefined, postalCode: undefined })).toBeNull()
	})
})
