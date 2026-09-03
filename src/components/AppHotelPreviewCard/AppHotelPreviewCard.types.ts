import type { AppHotelGalleryPhoto } from '../AppHotelGallery/AppHotelGallery.types'
import type { HotelLabel } from '../AppHotelCard/AppHotelCard.types'

export type AppHotelPreviewCardProps = {
  name: string
  stars: number
  /** E.g. «17-19 лютого». */
  datesLabel: string
  price: number
  /** E.g. «2 ночі». */
  nightsLabel: string
  oldPrice?: number
  /** Discount pill on the photo, e.g. «-20%». */
  discount?: string
  labels?: HotelLabel[]
  photo: AppHotelGalleryPhoto
  /** «N з 5» star rating, read by assistive tech. */
  starsLabel: string
  /** Favourite-toggle aria-label. */
  favouriteLabel: string
  className?: string
}
