import type { ComponentPropsWithRef, ReactNode } from 'react'

export type AppInputProps = {
  /** Label text. The field is wrapped in a `<label>`, so the association holds
   *  without an `id` — pass `id` when `description`/`error` must also be linked
   *  through `aria-describedby`. */
  label?: ReactNode
  /** Renders the red `*` next to the label and sets the native `required`. */
  required?: boolean
  description?: ReactNode
  /** Replaces `description` and paints the error styles. */
  error?: string
  /** Leading slot — icon or text appendix. */
  slotLeft?: ReactNode
  /** Trailing slot — icon or text appendix. */
  slotRight?: ReactNode
  className?: string
} & ComponentPropsWithRef<'input'>
