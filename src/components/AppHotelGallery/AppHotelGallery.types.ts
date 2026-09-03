import type { HTMLAttributes } from 'react'

import type { StaticImageData } from 'next/image'

export type AppHotelGalleryPhoto = {
  src: string | StaticImageData
  alt: string
}

/** Control labels — supplied by the caller so the component stays locale-free. */
export type AppHotelGalleryLabels = {
  favourite: string
  prevPhoto: string
  nextPhoto: string
}

export type AppHotelGalleryProps = {
  photos: AppHotelGalleryPhoto[]
  labels: AppHotelGalleryLabels
  /** Discount pill content rendered top-left, e.g. «-20%». */
  statusLabel?: string
  /** `next/image` sizes for the slides — match the host's rendered width. */
  sizes?: string
  className?: string
} & HTMLAttributes<HTMLDivElement>
