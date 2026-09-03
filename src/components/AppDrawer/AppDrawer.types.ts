import type { ReactNode } from 'react'

export type AppDrawerDirection = 'right' | 'bottom'

export type AppDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Optional trigger element — rendered via vaul's `asChild` Trigger. */
  trigger?: ReactNode
  /** `AppDrawer.Header` / `.Body` / `.Footer` sections. */
  children: ReactNode
  /**
   * Slide direction. Default: `right` from `lg`, `bottom` below.
   * Pass `right` to keep the desktop panel on narrow Storybook canvases.
   */
  direction?: AppDrawerDirection
  /** Backdrop dim. Set `false` when the map must stay visible and clickable. */
  showOverlay?: boolean
  /**
   * When `false`, pointer-down outside the panel does not close it — the host
   * owns dismiss (map empty-click, etc.). Close button and Esc still work.
   */
  dismissible?: boolean
  /**
   * `screen` = 32px inset on a right-side panel (map overlay).
   * Default keeps the 24px desktop inset.
   */
  offset?: 'default' | 'screen'
  className?: string
}

export type AppDrawerSectionProps = {
  children: ReactNode
  className?: string
}

export type AppDrawerHeaderProps = AppDrawerSectionProps & {
  /** Close-button aria-label; the button renders only when it is supplied. */
  closeLabel?: string
  /**
   * Host-owned close. Use when `dismissible={false}` — vaul ignores
   * `Drawer.Close` / `onOpenChange(false)` in that mode.
   */
  onClose?: () => void
}
