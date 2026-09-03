# AppDrawer

Slide-in panel — wraps `vaul` (drag-to-close over Radix Dialog). Desktop (≥1024px): a 550px panel sliding from the right with a 24px margin and 32px radius. Mobile: a full-height (100dvh) bottom sheet with 32px top corners. Backdrop uses the modal token; Esc, backdrop click, and drag all close it; body scroll is locked while open.

`direction="right"` keeps the side panel on any viewport (map Storybook). `offset="screen"` uses 32px inset. `showOverlay={false}` skips the overlay and runs non-modal so the page behind (e.g. a map) stays clickable. `dismissible={false}` stops outside pointer-down from closing it. Vaul also swallows `Drawer.Close` in that mode — pass `onClose` on `Header` so the X can still hide the panel.

Compound sections: `AppDrawer.Header` (title + 40px outlined close button), `AppDrawer.Body` (scrollable), `AppDrawer.Footer` (actions row with a top shadow).

## Props

| Prop           | Type                      | Default   | Description                               |
| -------------- | ------------------------- | --------- | ----------------------------------------- |
| `open`         | `boolean`                 | —         | Controlled open state                     |
| `onOpenChange` | `(open: boolean) => void` | —         | Open-state callback                       |
| `trigger`      | `ReactNode`               | —         | Optional trigger (rendered via `asChild`) |
| `children`     | `ReactNode`               | —         | `Header` / `Body` / `Footer` sections     |
| `direction`    | `'right' \| 'bottom'`     | auto      | Override slide side                       |
| `showOverlay`  | `boolean`                 | `true`    | Dimmed backdrop                           |
| `dismissible`  | `boolean`                 | `true`    | Outside pointer-down closes the panel     |
| `offset`       | `'default' \| 'screen'`   | `default` | `screen` = 32px inset on a right panel    |
| `className`    | `string`                  | —         | Extra class on the panel                  |

Section components accept `children` and `className`. `AppDrawer.Header` also takes an optional `closeLabel` — the close-button aria-label, supplied by the host so the component holds no copy of its own. Omit it and the header renders the title alone, without a close button: for drawers dismissed by their own footer action, by drag, or by Esc. `onClose` is an optional host handler; when set, the X calls it instead of vaul `Drawer.Close`.

## Usage

```tsx
<AppDrawer
  open={open}
  onOpenChange={setOpen}
  trigger={<AppButton>Фільтри</AppButton>}
>
  <AppDrawer.Header closeLabel={t('close')}>Фільтри</AppDrawer.Header>
  <AppDrawer.Body>…</AppDrawer.Body>
  <AppDrawer.Footer>
    <AppButton>Показати 12</AppButton>
    <AppButton variant="outlined">Очистити</AppButton>
  </AppDrawer.Footer>
</AppDrawer>
```
