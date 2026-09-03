import React from 'react'
import localFont from 'next/font/local'

import 'modern-normalize/modern-normalize.css'
import '../styles/tokens.css'
import '../styles/app.scss'

const bodyFont = localFont({
  src: [
    {
      path: '../assets/fonts/Bukovel-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Bukovel-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Bukovel-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-body',
})

export const metadata = {
  title: {
    template: '%s | Design System',
    default: 'Design System',
  },
  description: 'Component library. Run npm run storybook.',
}

export const viewport = {
  themeColor: '#000000',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" data-theme="summer" suppressHydrationWarning>
    <body className={bodyFont.variable}>{children}</body>
  </html>
)

export default RootLayout
