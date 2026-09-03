'use client'

import { useSyncExternalStore } from 'react'

/** Reactive `window.matchMedia`. Returns `false` on the server and during
 *  hydration, so gate only client-side presentation on it. */
export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )

/** Desktop layout switch — same 1024px split the SCSS `b-up(lg)` mixin uses. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
