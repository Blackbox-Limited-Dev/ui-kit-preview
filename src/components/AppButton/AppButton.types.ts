import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outlined'
  | 'link'
  | 'error'

export type AppButtonSize = 'big' | 'small'

type AppButtonBaseProps = {
  size?: AppButtonSize
  children: ReactNode
  className?: string
}

/** Icon-only buttons have no visible label, so they must carry one, and the
 *  `link` variant has no icon-only counterpart in the design. */
type AppButtonContentProps =
  | {
      iconOnly: true
      variant?: Exclude<AppButtonVariant, 'link'>
      'aria-label': string
    }
  | {
      iconOnly?: false
      variant?: AppButtonVariant
    }

/** `href` picks the rendered element: absent → `<button>`, present →
 *  `next/link`, present with `external` → plain `<a target="_blank">`. */
export type AppButtonElementProps =
  | ({
      href?: never
      external?: never
    } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      href: string
      external?: boolean
      disabled?: never
    } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)

export type AppButtonProps = AppButtonBaseProps &
  AppButtonContentProps &
  AppButtonElementProps
