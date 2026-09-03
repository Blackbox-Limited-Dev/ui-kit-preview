'use client'

import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'

import FlagPl from '~img/flags/flag-pl.svg'
import FlagRo from '~img/flags/flag-ro.svg'
import FlagUa from '~img/flags/flag-ua.svg'

import { AppIcon } from '../AppIcon'

import s from './AppLanguageSelector.module.scss'

import type {
  AppLanguage,
  AppLanguageSelectorProps,
} from './AppLanguageSelector.types'

const flags = { ua: FlagUa, pl: FlagPl, ro: FlagRo }

// Dropdown labels — hardcoded, not in messages/*.json.
const languageNames: Record<AppLanguage, string> = {
  ua: 'Ukrainian',
  ro: 'Romanian',
  pl: 'Polish',
}

const languages = Object.keys(languageNames) as AppLanguage[]

export const AppLanguageSelector = ({
  language,
  onLanguageChange,
  className,
  ...rest
}: AppLanguageSelectorProps) => {
  const Flag = flags[language]

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className={cn(s.root, className)} {...rest}>
          <Flag width={20} height={20} className={s.flag} aria-hidden />
          <span>{language}</span>
          <AppIcon
            className={s.chevron}
            name="NavArrowDown"
            size="medium"
            color="var(--color-text-on-bg)"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.menu} align="end" sideOffset={8}>
          {languages.map((lang) => {
            const ItemFlag = flags[lang]

            return (
              <DropdownMenu.Item
                key={lang}
                className={s.menu_item}
                onSelect={() => onLanguageChange?.(lang)}
              >
                <ItemFlag
                  width={20}
                  height={20}
                  className={s.flag}
                  aria-hidden
                />
                {languageNames[lang]}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export type {
  AppLanguage,
  AppLanguageSelectorProps,
} from './AppLanguageSelector.types'
