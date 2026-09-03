import type { ReactNode } from 'react'

export type AppAccordionVariant = 'divider' | 'card'

export type AppAccordionProps = {
  /** Initially expanded item values (multiple groups can stay open). */
  defaultValue?: string[]
  /**
   * `divider` (default) stacks flush rows split by 1px lines;
   * `card` gives every item its own tinted 24px-radius card.
   */
  variant?: AppAccordionVariant
  children: ReactNode
  className?: string
}

export type AppAccordionItemProps = {
  value: string
  title: ReactNode
  children: ReactNode
  className?: string
}
