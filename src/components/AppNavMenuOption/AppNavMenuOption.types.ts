import type { StaticImageData } from 'next/image'

export type AppNavMenuOptionProps = {
  /** Card photo — a static import or a remote URL. */
  image: StaticImageData | string
  /** Describes the photo; never empty. */
  alt: string
  title: string
  /** Optional line under the title. */
  description?: string
  href: string
  /** `next/image` `sizes` — the card width varies per mega-menu panel. */
  sizes?: string
  className?: string
}
