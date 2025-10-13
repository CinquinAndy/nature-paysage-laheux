'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'
import { Button } from '../ui/button'

const AltTextGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const { id } = useDocumentInfo()

	const handleGenerate = async () => {
		if (!id) {
			setError('Document not saved yet')
			return
		}

		setIsGenerating(true)
		setError(null)
		setSuccess(null)

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

			// Show success message with the generated alt text
			setSuccess(`✅ Alt text généré : "${data.alt}"`)

			// Reload after a short delay to let user see the success message
			setTimeout(() => {
				window.location.reload()
			}, 2000)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
			setIsGenerating(false)
		}
	}

	return (
		<div className="field-type">
			<div className="flex flex-col gap-2">
				<Button type="button" onClick={handleGenerate} disabled={isGenerating || !id} className="w-full">
					{isGenerating ? '⏳ Génération en cours...' : '✨ Générer alt text avec ForVoyez'}
				</Button>
				{success && <p className="text-sm text-green-600 font-medium">{success}</p>}
				{error && <p className="text-sm text-red-500">{error}</p>}
				{!id && <p className="text-sm text-gray-500">Sauvegardez d'abord l'image pour générer l'alt text</p>}
			</div>
		</div>
	)
}

export default AltTextGenerator
