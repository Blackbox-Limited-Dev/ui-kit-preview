export type MapSeasonMode = 'summer' | 'winter'

export type MapLayerKey =
  | 'skiing'
  | 'cycling'
  | 'dining'
  | 'entertainment'
  | 'wellness-spa'
  | 'shops'
  | 'tourism'
  | 'transport'
  | 'parking'
  | 'accommodation'
  | 'infrastructure'
  | 'information'
  | 'with-children'
  | 'safety'
  | 'cameras'

export type MapLayerAvailability = 'all' | 'winter' | 'summer'

export type MapLayerDefinition = {
  key: MapLayerKey
  label: string
  availability: MapLayerAvailability
  showSkiOverlay?: boolean
}
