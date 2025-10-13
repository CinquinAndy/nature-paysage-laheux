'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useState } from 'react'
import { Button } from '../ui/button'

const AltTextGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { id } = useDocumentInfo()

	const alt = useFormFields(([fields]) => fields.alt)

	const handleGenerate = async () => {
		if (!id) {
			setError('Document not saved yet')
			return
		}

		setIsGenerating(true)
		setError(null)

		try {
			const response = await fetch('/api/forvoyez/generate-alt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ mediaId: id }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate alt text')
			}

			// Update the form field value
			if (alt && typeof alt.value === 'string') {
				// Force a page reload to update the form with the new value
				window.location.reload()
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<div className="field-type">
			<div className="flex flex-col gap-2">
				<Button type="button" onClick={handleGenerate} disabled={isGenerating || !id} className="w-full">
					{isGenerating ? 'Génération en cours...' : '✨ Générer alt text avec ForVoyez'}
				</Button>
				{error && <p className="text-sm text-red-500">{error}</p>}
				{!id && <p className="text-sm text-gray-500">Sauvegardez d'abord l'image pour générer l'alt text</p>}
			</div>
		</div>
	)
}

export default AltTextGenerator
