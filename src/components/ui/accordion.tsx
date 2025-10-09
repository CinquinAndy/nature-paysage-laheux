'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
	value: string
	title: string
	children: React.ReactNode
}

interface AccordionProps {
	items: AccordionItemProps[]
	type?: 'single' | 'multiple'
	className?: string
}

export function Accordion({ items, type = 'single', className }: AccordionProps) {
	const [openItems, setOpenItems] = React.useState<string[]>([])

	const toggleItem = (value: string) => {
		if (type === 'single') {
			setOpenItems(openItems.includes(value) ? [] : [value])
		} else {
			setOpenItems(openItems.includes(value) ? openItems.filter(item => item !== value) : [...openItems, value])
		}
	}

	return (
		<div className={cn('divide-y divide-border rounded-lg border', className)}>
			{items.map(item => {
				const isOpen = openItems.includes(item.value)
				return (
					<div key={item.value} className="group">
						<button
							type="button"
							onClick={() => toggleItem(item.value)}
							className="flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-colors hover:bg-muted/50"
							aria-expanded={isOpen}
						>
							<span className="text-base font-semibold">{item.title}</span>
							<ChevronDown
								className={cn('h-5 w-5 shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
							/>
						</button>
						<div
							className={cn(
								'overflow-hidden transition-all duration-300',
								isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
							)}
						>
							<div className="px-6 pb-4 pt-2 text-sm text-muted-foreground whitespace-pre-wrap">{item.children}</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
