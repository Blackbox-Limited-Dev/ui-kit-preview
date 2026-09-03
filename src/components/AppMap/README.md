# AppMap

Fullscreen Storybook maps. Both stories hide Mapbox basemap POI layers. **WinterSki** uses Mapbox Outdoors Winter plus local ski GeoJSON (runs, lifts, run-code labels). The lifts list drawer starts open. Close (X) hides every map drawer; after the close animation the panel resets to the lifts list. A right-edge tab reopens that list. Back and empty-map click return to the list without hiding the drawer. An active ski run or lift shows marching direction arrows.

**SummerPins** uses Outdoors v12 plus pin GeoJSON ported from the RN map. Pins use the same greedy 60px clusterer; a cluster tap zooms until members split, or spiderfies when they are co-located. A list row zooms first, then spiderfies on settle if members are still stacked. The fan closes on zoom-out or when its center leaves the viewport. Pin tap / list row opens the detail drawer (mocked hours and contacts; name and subcategory are real). Close (X) hides every map drawer; a right-edge tab reopens the list. Camera moves pad for the open drawer. The filter control switches summer layers; Dining is the default so clusters show at zoom 13. Bus routes, hotel sheets, and webcam story viewers are out of scope.

Needs `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`. Mapbox GL JS is a heavy client bundle (~the Mapbox runtime); this screen is Storybook-only and should stay dynamically imported if it ever lands on a Next route.

## Props

None — each story owns camera, selection, and preview state.

## Usage

```tsx
<AppMap />
<AppMapSummer />
```
