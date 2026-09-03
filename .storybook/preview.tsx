import React from 'react'
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl'
import type { Decorator, Preview } from '@storybook/nextjs-vite'

import 'modern-normalize/modern-normalize.css'
import '../src/styles/tokens.css'
import '../src/styles/app.scss'

// Mirrors src/app/layout.tsx — without it stories miss --font-body and every
// color token, and fall back to the browser defaults.
const bodyFont = localFont({
  src: [
    { path: '../src/assets/fonts/Bukovel-Regular.woff2', weight: '400' },
    { path: '../src/assets/fonts/Bukovel-Medium.woff2', weight: '500' },
    { path: '../src/assets/fonts/Bukovel-Semibold.woff2', weight: '600' },
  ],
  display: 'swap',
  variable: '--font-body',
})

const themes = ['summer', 'winter'] as const
type Theme = (typeof themes)[number]

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as Theme) ?? 'summer'
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme
    document.body.classList.add(bodyFont.variable)
  }
  return (
    <NextIntlClientProvider locale="en" messages={{}}>
      <Story />
    </NextIntlClientProvider>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Active design-system theme',
      defaultValue: 'summer',
      toolbar: {
        icon: 'paintbrush',
        items: themes.map((theme) => ({ value: theme, title: theme })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
}

export default preview
