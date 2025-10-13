'use client'

import { useState } from 'react'

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
		<div
			style={{
				width: '100%',
				display: 'flex',
				justifyContent: 'flex-end',
				marginBottom: '16px',
				marginRight: '24px',
				marginTop: '16px',
			}}
		>
			<div style={{ maxWidth: '28rem' }}>
				<div
					style={{
						padding: '16px',
						backgroundColor: 'white',
						border: '1px solid #e5e7eb',
						borderRadius: '8px',
						boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
						<div style={{ textAlign: 'right' }}>
							<h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
								Génération en masse avec ForVoyez
							</h3>
							<p style={{ fontSize: '14px', color: '#4b5563', marginTop: '4px', marginBottom: 0 }}>
								Générer automatiquement les alt text manquants pour toutes les images
							</p>
						</div>
						<button
							type="button"
							onClick={handleBulkGenerate}
							disabled={isGenerating}
							style={{
								width: '100%',
								padding: '8px 16px',
								backgroundColor: isGenerating ? '#9ca3af' : '#3b82f6',
								color: 'white',
								border: 'none',
								borderRadius: '6px',
								fontSize: '14px',
								fontWeight: '500',
								cursor: isGenerating ? 'not-allowed' : 'pointer',
								opacity: isGenerating ? 0.6 : 1,
							}}
						>
							{isGenerating ? '⏳ Génération en cours...' : '✨ Générer tous les alt texts'}
						</button>

						{progress && (
							<div
								style={{
									padding: '12px',
									backgroundColor: '#eff6ff',
									border: '1px solid #bfdbfe',
									borderRadius: '6px',
								}}
							>
								<div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
									<p style={{ fontWeight: '500', color: '#1e3a8a', margin: 0 }}>
										{isDone ? '✅ Génération terminée !' : '⏳ Traitement en cours...'}
									</p>
									<p style={{ color: '#1d4ed8', margin: 0 }}>
										Total: <span style={{ fontWeight: '600' }}>{progress.total}</span> images
									</p>
									<p style={{ color: '#1d4ed8', margin: 0 }}>
										Traités: <span style={{ fontWeight: '600' }}>{progress.processed}</span>
									</p>
									<p style={{ color: '#15803d', margin: 0 }}>
										Réussis: <span style={{ fontWeight: '600' }}>{progress.succeeded}</span>
									</p>
									{progress.failed > 0 && (
										<p style={{ color: '#b91c1c', margin: 0 }}>
											Échoués: <span style={{ fontWeight: '600' }}>{progress.failed}</span>
										</p>
									)}
								</div>
								{isDone && (
									<p style={{ fontSize: '12px', color: '#2563eb', marginTop: '8px', marginBottom: 0 }}>
										La page va se recharger dans 5 secondes...
									</p>
								)}
							</div>
						)}

						{error && (
							<div
								style={{
									padding: '12px',
									backgroundColor: '#fef2f2',
									border: '1px solid #fecaca',
									borderRadius: '6px',
								}}
							>
								<p style={{ fontSize: '14px', color: '#b91c1c', margin: 0 }}>{error}</p>
							</div>
						)}

						{isGenerating && !progress && (
							<div
								style={{
									padding: '12px',
									backgroundColor: '#f9fafb',
									border: '1px solid #e5e7eb',
									borderRadius: '6px',
								}}
							>
								<p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
									⏳ Recherche des images sans alt text...
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BulkAltTextGenerator
