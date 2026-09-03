import type { AppLanguage } from '~i18n/config'
import type messages from '../messages/ua.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: AppLanguage
    Messages: typeof messages
  }
}
