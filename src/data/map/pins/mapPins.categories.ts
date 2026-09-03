import type { AppIconComponent } from '~components/AppIcon/AppIcon.types'
import BalloonIcon from '~icons/balloon.svg'
import BusIcon from '~icons/bus.svg'
import CameraIcon from '~icons/camera.svg'
import ConfettiIcon from '~icons/confetti.svg'
import CutleryIcon from '~icons/cutlery.svg'
import FirstAidIcon from '~icons/first-aid-kit.svg'
import FlowerLotusIcon from '~icons/flower-lotus.svg'
import HouseIcon from '~icons/house.svg'
import InfoIcon from '~icons/info.svg'
import ParkingIcon from '~icons/parking.svg'
import BikeIcon from '~icons/person-simple-bike.svg'
import HikeIcon from '~icons/person-simple-hike.svg'
import SkiIcon from '~icons/person-simple-ski.svg'
import ShopIcon from '~icons/shop-four-tiles.svg'

import type { MapLayerKey } from '../layers/mapLayers.types'

export type MapCategoryPinStyle = {
  color: string
  icon: AppIconComponent
}

export const MAP_CATEGORY_ICON_COLOR = '#fff'

export const MAP_CATEGORY_PIN_STYLES: Record<MapLayerKey, MapCategoryPinStyle> =
  {
    skiing: { color: '#0E7AC4', icon: SkiIcon },
    cycling: { color: '#E8731A', icon: BikeIcon },
    dining: { color: '#09A022', icon: CutleryIcon },
    entertainment: { color: '#E0457B', icon: ConfettiIcon },
    'wellness-spa': { color: '#11998A', icon: FlowerLotusIcon },
    shops: { color: '#A6850E', icon: ShopIcon },
    tourism: { color: '#3F7A2E', icon: HikeIcon },
    transport: { color: '#4C586D', icon: BusIcon },
    accommodation: { color: '#2C7A7B', icon: HouseIcon },
    infrastructure: { color: '#7355C1', icon: ParkingIcon },
    information: { color: '#4F46E5', icon: InfoIcon },
    'with-children': { color: '#A855F7', icon: BalloonIcon },
    safety: { color: '#FF4238', icon: FirstAidIcon },
    cameras: { color: '#396FE3', icon: CameraIcon },
    parking: { color: '#2563EB', icon: ParkingIcon },
  }

export function getMapCategoryPinStyle(key: MapLayerKey): MapCategoryPinStyle {
  return MAP_CATEGORY_PIN_STYLES[key]
}
