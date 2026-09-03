'use client'

import React from 'react'
import cn from 'classnames'
import { Drawer } from 'vaul'

import CloseIcon from '~icons/close.svg'

import { AppButton } from '../AppButton'
import { AppIcon } from '../AppIcon'
import { useIsDesktop } from '~hooks/useMediaQuery'

import s from './AppDrawer.module.scss'

import type {
  AppDrawerHeaderProps,
  AppDrawerProps,
  AppDrawerSectionProps,
} from './AppDrawer.types'

const Header = ({
  children,
  className,
  closeLabel,
  onClose,
}: AppDrawerHeaderProps) => {
  const closeButton = closeLabel ? (
    <AppButton
      iconOnly
      variant="outlined"
      size="small"
      aria-label={closeLabel}
      onClick={onClose}
    >
      <AppIcon icon={CloseIcon} size={20} />
    </AppButton>
  ) : null

  return (
    <div className={cn(s.drawer_header, className)}>
      <Drawer.Title className={s.drawer_title}>{children}</Drawer.Title>
      {closeButton ? (
        onClose ? (
          closeButton
        ) : (
          <Drawer.Close asChild>{closeButton}</Drawer.Close>
        )
      ) : null}
    </div>
  )
}

const Body = ({ children, className }: AppDrawerSectionProps) => (
  <div className={cn(s.drawer_body, className)}>{children}</div>
)

const Footer = ({ children, className }: AppDrawerSectionProps) => (
  <div className={cn(s.drawer_footer, className)}>{children}</div>
)

export const AppDrawer = ({
  open,
  onOpenChange,
  trigger,
  children,
  direction: directionProp,
  showOverlay = true,
  dismissible = true,
  offset = 'default',
  className,
}: AppDrawerProps) => {
  const isDesktop = useIsDesktop()
  const direction = directionProp ?? (isDesktop ? 'right' : 'bottom')

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={direction}
      modal={showOverlay}
      dismissible={dismissible}
      noBodyStyles={!showOverlay}
    >
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Drawer.Portal>
        {showOverlay ? <Drawer.Overlay className={s.drawer_overlay} /> : null}
        {/* Drawer body is arbitrary content, not a summary — opt out of vaul's description warning. */}
        <Drawer.Content
          className={cn(
            s.drawer_content,
            { [s.drawer_contentScreen]: offset === 'screen' },
            className
          )}
          aria-describedby={undefined}
        >
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

AppDrawer.Header = Header
AppDrawer.Body = Body
AppDrawer.Footer = Footer

export type {
  AppDrawerDirection,
  AppDrawerHeaderProps,
  AppDrawerProps,
  AppDrawerSectionProps,
} from './AppDrawer.types'
