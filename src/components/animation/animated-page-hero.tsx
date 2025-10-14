'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { heroText, imageReveal } from '@/lib/animation/variants'

interface AnimatedPageHeroProps {
	imageElement: ReactNode
	titleElement: ReactNode
	actionElement?: ReactNode
}

/**
 * Composant spécifique pour animer le PageHero
 * Anime l'image, le titre et le bouton d'action avec des délais appropriés
 */
export function AnimatedPageHero({ imageElement, titleElement, actionElement }: AnimatedPageHeroProps) {
	return (
		<div className="relative w-screen h-screen">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={imageReveal}
				style={{
					willChange: 'opacity, transform',
				}}
			>
				{imageElement}
			</motion.div>

			{/* Title overlay */}
			<div className="absolute inset-0 flex items-center justify-center px-4">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={heroText}
					transition={{
						delay: 0.4,
					}}
					style={{
						willChange: 'opacity, transform',
					}}
				>
					{titleElement}
				</motion.div>
			</div>

			{/* Action button */}
			{actionElement && (
				<motion.div
					className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-10"
					initial="hidden"
					animate="visible"
					variants={heroText}
					transition={{
						delay: 0.6,
					}}
					style={{
						willChange: 'opacity, transform',
					}}
				>
					{actionElement}
				</motion.div>
			)}
		</div>
	)
}
