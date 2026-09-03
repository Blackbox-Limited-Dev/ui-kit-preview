import type { ComponentPropsWithRef } from 'react'

/** No visible label by design — pass `aria-label` (or rely on `placeholder`)
 *  so the field keeps an accessible name. */
export type AppSearchProps = {
  /** Applied to the root wrapper, not the input. */
  className?: string
} & ComponentPropsWithRef<'input'>
