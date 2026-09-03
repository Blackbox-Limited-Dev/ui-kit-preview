import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, LANGUAGE_COOKIE, locales } from './config'

import type { AppLanguage } from './config'

const isLocale = (value: unknown): value is AppLanguage =>
  locales.includes(value as AppLanguage)

const subtagToLocale: Record<string, AppLanguage> = {
  uk: 'ua',
  pl: 'pl',
  ro: 'ro',
}

// Browsers list languages in preference order; the first supported primary
// subtag wins (q-values are not re-sorted).
const detectLocale = (acceptLanguage: string | null): AppLanguage | null => {
  if (!acceptLanguage) return null

  for (const part of acceptLanguage.split(',')) {
    const subtag = part.split(';')[0].trim().toLowerCase().split('-')[0]
    const locale = subtagToLocale[subtag]
    if (locale) return locale
  }

  return null
}

export default getRequestConfig(async () => {
  const stored = (await cookies()).get(LANGUAGE_COOKIE)?.value
  const locale = isLocale(stored)
    ? stored
    : (detectLocale((await headers()).get('accept-language')) ?? defaultLocale)

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
