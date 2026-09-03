# AppText

Typography component — renders text in one of the 24 Figma text styles, on any element.

Styling lives in `src/styles/text-styles.scss` as one mixin per style; this component only maps a `variant` name to its mixin class. Components that need a text style inside their own SCSS should `@use 'text-styles' as *` and include the mixin directly instead of nesting an `AppText`.

## Variants

| Variant                | Figma style               | Size | Weight | Line height | Letter spacing |
| ---------------------- | ------------------------- | ---- | ------ | ----------- | -------------- |
| `hero`                 | Headers/Hero              | 80px | 600    | 1.1         | -0.02em        |
| `display-1`            | Headers/Display 1         | 48px | 600    | 1.1         | -0.02em        |
| `display-2`            | Headers/Display 2         | 40px | 600    | 1.1         | -0.02em        |
| `display-3`            | Headers/Display 3         | 36px | 600    | 1.1         | -0.02em        |
| `title-1`              | Headers/Title 1           | 28px | 600    | 1.2         | -0.01em        |
| `title-2`              | Headers/Title 2           | 24px | 600    | 1.2         | -0.01em        |
| `title-3`              | Headers/Title 3           | 20px | 600    | 1.2         | -0.01em        |
| `body-xlarge-regular`  | Body/body-xlarge/Regular  | 20px | 400    | 1.5         | —              |
| `body-xlarge-medium`   | Body/body-xlarge/Medium   | 20px | 500    | 1.5         | —              |
| `body-xlarge-semibold` | Body/body-xlarge/Semibold | 20px | 600    | 1.5         | —              |
| `body-large-regular`   | Body/body-large/Regular   | 18px | 400    | 1.5         | —              |
| `body-large-medium`    | Body/body-large/Medium    | 18px | 500    | 1.5         | —              |
| `body-large-semibold`  | Body/body-large/Semibold  | 18px | 600    | 1.5         | —              |
| `body-1-regular`       | Body/body-1/Regular       | 16px | 400    | 1.5         | —              |
| `body-1-medium`        | Body/body-1/Medium        | 16px | 500    | 1.5         | —              |
| `body-1-semibold`      | Body/body-1/Semibold      | 16px | 600    | 1.5         | —              |
| `body-2-regular`       | Body/body-2/Regular       | 14px | 400    | 1.4         | —              |
| `body-2-medium`        | Body/body-2/Medium        | 14px | 500    | 1.4         | —              |
| `body-2-semibold`      | Body/body-2/Semibold      | 14px | 600    | 1.4         | —              |
| `caption-regular`      | Body/Caption/Regular      | 12px | 400    | 1.4         | —              |
| `caption-medium`       | Body/Caption/Medium       | 12px | 500    | 1.4         | —              |
| `caption-semibold`     | Body/Caption/Semibold     | 12px | 600    | 1.4         | —              |
| `overline`             | Utility/Overline          | 11px | 600    | 1.4         | 0.02em, upper  |
| `date-number`          | Utility/Date Number       | 64px | 600    | 1           | —              |

## Props

| Prop        | Type             | Default            | Notes                                                       |
| ----------- | ---------------- | ------------------ | ----------------------------------------------------------- |
| `variant`   | `AppTextVariant` | `'body-1-regular'` | Text style from the table above                             |
| `as`        | `ElementType`    | `'p'`              | Rendered element — pick it for semantics, not for the style |
| `children`  | `ReactNode`      | —                  | Content                                                     |
| `className` | `string`         | —                  | Composed with the variant class                             |

Any other `HTMLAttributes<HTMLElement>` prop is forwarded to the rendered element.

## States

Text has no interactive states. Color is inherited — set it on an ancestor or via `className`, never on the variant.

## Usage

```tsx
import { AppText } from '~components'

// Default — body-1-regular in a <p>
<AppText>Book your stay</AppText>

// Heading: variant sets the style, `as` sets the semantics
<AppText as="h1" variant="display-1">Bukovel Resort</AppText>

// Inline label
<AppText as="span" variant="overline">Open now</AppText>
```
