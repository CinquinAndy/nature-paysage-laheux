import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Service } from '@/lib/data/services'
import { CheckCircle2 } from 'lucide-react'

interface ServiceCardProps {
	service: Service
	showImage?: boolean
	ctaText?: string
	ctaHref?: string
}

export function ServiceCard({
	service,
	showImage = true,
	ctaText = 'En savoir plus',
	ctaHref = '/prestations',
}: ServiceCardProps) {
	return (
		<Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
			{showImage && service.image && (
				<div className="relative h-48 w-full overflow-hidden">
					<Image
						src={service.image}
						alt={service.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
			)}
			<CardHeader>
				<div className="flex items-start justify-between gap-2">
					<CardTitle className="text-xl">{service.title}</CardTitle>
					{service.eligibleTaxCredit && (
						<Badge variant="success" className="shrink-0 text-xs">
							✓ -50%
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<p className="text-sm text-muted-foreground mb-4">{service.shortDescription}</p>
				<ul className="space-y-2">
					{service.features.slice(0, 4).map((feature, index) => (
						<li key={index} className="flex items-start gap-2 text-sm">
							<CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="flex flex-col items-stretch gap-3">
				<p className="text-sm font-medium text-muted-foreground">{service.price}</p>
				<Button variant="outline" className="w-full" asChild>
					<Link href={ctaHref}>{ctaText}</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
