import type { AppLanguage } from '~i18n/config'
import type { ComponentPropsWithRef } from 'react'

export type { AppLanguage }

export type AppLanguageSelectorProps = {
  language: AppLanguage
  /** Fires with the picked language when a menu item is selected. */
  onLanguageChange?: (language: AppLanguage) => void
  /** Applied to the trigger button. */
  className?: string
} & ComponentPropsWithRef<'button'>
