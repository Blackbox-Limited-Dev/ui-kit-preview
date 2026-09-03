import type {
  AppHotelGalleryLabels,
  AppHotelGalleryPhoto,
} from '../AppHotelGallery/AppHotelGallery.types'
import type { AppIconComponent } from '../AppIcon/AppIcon.types'

export type HotelLabel = {
  icon?: AppIconComponent
  text: string
}

export type Hotel = {
  id: string
  name: string
  stars: number
  distanceLabel: string
  roomType: string
  roomTypesCount: number
  priceFrom: number
  oldPrice?: number
  /** E.g. «3 ночі від». */
  nightsLabel: string
  /** Discount pill on the gallery, e.g. «-20%». */
  discount?: string
  labels: HotelLabel[]
  photos: AppHotelGalleryPhoto[]
  monobank: boolean
}

/** `vertical` pins the stacked card (carousel slides); `responsive` keeps the
 *  same markup and switches to the wide row at `lg` via CSS. */
export type AppHotelCardLayout = 'vertical' | 'responsive'

export type AppHotelCardProps = {
  layout: AppHotelCardLayout
  hotel: Hotel
  /** Row layout — select-room button handler. */
  onSelect?: () => void
  selectLabel: string
  installmentsLabel: string
  /** «Ще N типів номерів», already formatted from `hotel.roomTypesCount`. */
  roomTypesCountLabel: string
  /** «N з 5» star rating, read by assistive tech. */
  starsLabel: string
  galleryLabels: AppHotelGalleryLabels
  className?: string
}
