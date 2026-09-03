'use client'

import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import cn from 'classnames'

import CaretDownIcon from '~icons/caret-down.svg'
import ChevronUpIcon from '~icons/chevron-up.svg'

import { AppIcon } from '../AppIcon'

import s from './AppAccordion.module.scss'

import type {
  AppAccordionItemProps,
  AppAccordionProps,
} from './AppAccordion.types'

const Item = ({ value, title, children, className }: AppAccordionItemProps) => (
  <Accordion.Item value={value} className={cn(s.accordion_item, className)}>
    <Accordion.Header className={s.accordion_header}>
      <Accordion.Trigger className={s.accordion_trigger}>
        {title}
        <span className={s.accordion_chevron} aria-hidden>
          <AppIcon
            icon={CaretDownIcon}
            size={20}
            className={s.accordion_chevron_closed}
          />
          <AppIcon
            icon={ChevronUpIcon}
            size={20}
            className={s.accordion_chevron_open}
          />
        </span>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className={s.accordion_content}>
      <div className={s.accordion_content_inner}>{children}</div>
    </Accordion.Content>
  </Accordion.Item>
)

export const AppAccordion = ({
  defaultValue,
  variant = 'divider',
  children,
  className,
}: AppAccordionProps) => (
  <Accordion.Root
    type="multiple"
    defaultValue={defaultValue}
    className={cn(s.accordion, s[variant], className)}
  >
    {children}
  </Accordion.Root>
)

AppAccordion.Item = Item

// A server component cannot read `.Item` off a client-component reference, so
// the item ships as its own export too.
export const AppAccordionItem = Item

export type {
  AppAccordionItemProps,
  AppAccordionProps,
  AppAccordionVariant,
} from './AppAccordion.types'
