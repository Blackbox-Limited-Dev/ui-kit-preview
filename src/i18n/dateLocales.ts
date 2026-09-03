import { enUS, pl, ro, uk } from 'react-day-picker/locale'

import type { Locale } from 'date-fns'

/** date-fns locales for the app languages; `ua` is the design code for Ukrainian. */
export const DATE_LOCALES: Record<string, Locale> = {
  ua: uk,
  pl,
  ro,
  en: enUS,
}

export const getDateLocale = (language: string): Locale =>
  DATE_LOCALES[language] ?? uk
