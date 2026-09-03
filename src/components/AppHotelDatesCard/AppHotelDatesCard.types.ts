import type {
  AppHotelGalleryLabels,
  AppHotelGalleryPhoto,
} from '../AppHotelGallery/AppHotelGallery.types'

export type HotelRoomOffer = {
  /** E.g. «03-05 квітня». */
  dates: string
  /** E.g. «Без сніданку». */
  board: string
  /** E.g. «від 2 000 ₴». */
  priceLabel: string
  /** E.g. «за 2 ночі». */
  nightsLabel: string
}

export type AppHotelDatesCardProps = {
  name: string
  stars: number
  /** Rendered under the name when supplied; the row is skipped otherwise. */
  distanceLabel?: string
  monobank?: boolean
  discount?: string
  photos: AppHotelGalleryPhoto[]
  offers: HotelRoomOffer[]
  onSelect?: (offer: HotelRoomOffer) => void
  selectLabel: string
  /** Caption next to the monobank mark — read only when `monobank` is set. */
  installmentsLabel?: string
  /** «N з 5» star rating, read by assistive tech. */
  starsLabel: string
  galleryLabels: AppHotelGalleryLabels
  className?: string
}
