# AppLike

Favourite toggle — a 52px white circle with a heart, ported from the React Native `AppLike`. Unliked shows the outline heart in `--color-icon-on-card`; liked swaps to the solid heart in `--color-icon-interactive`. Liking plays a shrink → overshoot → settle pop plus a ring of eight heart particles; unliking plays a short bounce. Both animations respect `prefers-reduced-motion`.

The component is controlled: the caller owns `isLiked` and flips it in `onChange`.

## Props

| Prop        | Type                      | Default | Description                             |
| ----------- | ------------------------- | ------- | --------------------------------------- |
| `isLiked`   | `boolean`                 | —       | Liked state                             |
| `onChange`  | `(next: boolean) => void` | —       | Fires with the next value on toggle     |
| `disabled`  | `boolean`                 | `false` | Blocks toggling, dims the button        |
| `label`     | `string`                  | —       | Accessible name, e.g. «Додати в обране» |
| `className` | `string`                  | —       | Applied to the button                   |

State is exposed via `aria-pressed`, so the single `label` stays constant across both states.

## Usage

```tsx
const [liked, setLiked] = useState(false)

<AppLike isLiked={liked} onChange={setLiked} label={t('favourite')} />
```

Used on the product purchase card, overlaid on the thumbnail's top-right corner.
