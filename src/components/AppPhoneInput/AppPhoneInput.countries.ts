import FlagPl from '~img/flags/flag-pl.svg'
import FlagRo from '~img/flags/flag-ro.svg'
import FlagUa from '~img/flags/flag-ua.svg'

import type { AppPhoneCountry, AppPhoneCountryIso } from './AppPhoneInput.types'

// Add a country by appending a row here plus its circle flag in `src/assets/img/flags/`.
export const countries: AppPhoneCountry[] = [
  {
    iso: 'UA',
    name: 'Ukraine',
    dial: '+380',
    mask: '00 000 00 00',
    placeholder: '50 123 45 67',
    Flag: FlagUa,
  },
  {
    iso: 'PL',
    name: 'Poland',
    dial: '+48',
    mask: '000 000 000',
    placeholder: '512 345 678',
    Flag: FlagPl,
  },
  {
    iso: 'RO',
    name: 'Romania',
    dial: '+40',
    mask: '000 000 000',
    placeholder: '712 345 678',
    Flag: FlagRo,
  },
]

export const countriesByIso = Object.fromEntries(
  countries.map((country) => [country.iso, country])
) as Record<AppPhoneCountryIso, AppPhoneCountry>
