'use client'

import { useState } from 'react'
import { Button } from '../ui/button'

const BulkAltTextGenerator: React.FC = () => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [progress, setProgress] = useState<{
		total: number
		processed: number
		succeeded: number
		failed: number
	} | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isDone, setIsDone] = useState(false)

	const handleBulkGenerate = async () => {
		setIsGenerating(true)
		setError(null)
		setProgress(null)
		setIsDone(false)

		try {
			const response = await fetch('/api/forvoyez/generate-all', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to generate alt texts')
			}

			setProgress({
				total: data.total,
				processed: data.processed,
				succeeded: data.succeeded,
				failed: data.failed,
			})
			setIsDone(true)

			// Reload after showing results
			setTimeout(() => {
				window.location.reload()
			}, 5000)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
			<div className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-base font-semibold text-gray-900">Génération en masse avec ForVoyez</h3>
						<p className="text-sm text-gray-600 mt-1">
							Générer automatiquement les alt text manquants pour toutes les images
						</p>
					</div>
					<Button
						type="button"
						onClick={handleBulkGenerate}
						disabled={isGenerating}
						className="whitespace-nowrap"
					>
						{isGenerating ? '⏳ Génération en cours...' : '✨ Générer tous les alt texts'}
					</Button>
				</div>

				{progress && (
					<div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
						<div className="text-sm space-y-1">
							<p className="font-medium text-blue-900">
								{isDone ? '✅ Génération terminée !' : '⏳ Traitement en cours...'}
							</p>
							<p className="text-blue-700">
								Total: <span className="font-semibold">{progress.total}</span> images
							</p>
							<p className="text-blue-700">
								Traités: <span className="font-semibold">{progress.processed}</span>
							</p>
							<p className="text-green-700">
								Réussis: <span className="font-semibold">{progress.succeeded}</span>
							</p>
							{progress.failed > 0 && (
								<p className="text-red-700">
									Échoués: <span className="font-semibold">{progress.failed}</span>
								</p>
							)}
						</div>
						{isDone && (
							<p className="text-xs text-blue-600 mt-2">La page va se recharger dans 5 secondes...</p>
						)}
					</div>
				)}

				{error && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-sm text-red-700">{error}</p>
					</div>
				)}

				{isGenerating && !progress && (
					<div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
						<p className="text-sm text-gray-700">⏳ Recherche des images sans alt text...</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default BulkAltTextGenerator

