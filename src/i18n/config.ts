export const locales = ['ua', 'pl', 'ro'] as const

export type AppLanguage = (typeof locales)[number]

export const defaultLocale: AppLanguage = 'ua'

/** Design code → BCP 47 language tag ('ua' is the design code for Ukrainian,
 *  whose language tag is 'uk'). */
export const localeToLangTag: Record<string, string> = {
  ua: 'uk',
  pl: 'pl',
  ro: 'ro',
  en: 'en-GB',
}

export const LANGUAGE_COOKIE = 'language'
