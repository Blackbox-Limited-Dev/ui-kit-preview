import path from 'node:path'

import * as sass from 'sass'
import { loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      // SVGs are SVGR React components here, not next/image assets. Without
      // this the builder resolves them to a virtual next-image module whose
      // default export is `{ src, width, height }` — an object React refuses
      // to render ("Element type is invalid").
      image: { excludeFiles: ['**/*.svg'] },
    },
  },
  staticDirs: ['../public'],
  // Vite ignores next.config.js sassOptions.loadPaths — mirror it so bare
  // @use 'mixins' resolves (keep in sync with next.config.js).
  viteFinal: async (config) => {
    const env = loadEnv('', path.join(import.meta.dirname, '..'), [
      'NEXT_PUBLIC_',
      'VITE_',
    ])
    config.define = {
      ...config.define,
      'process.env.NEXT_PUBLIC_MAPBOX_TOKEN': JSON.stringify(
        env.NEXT_PUBLIC_MAPBOX_TOKEN ??
          process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
          ''
      ),
    }
    // Mirrors next.config.js turbopack.rules['*.svg']: a bare import compiles
    // to a React component, `?url` stays a static asset URL.
    // Vite appends `?import` to asset imports in dev, so the patterns match on
    // the query rather than the bare extension.
    config.plugins = [
      ...(config.plugins ?? []),
      svgr({
        include: /\.svg(\?|$)/,
        exclude: /\.svg\?(?:[^#]*&)?url(?:&|$)/,
        svgrOptions: { icon: true },
      }),
    ]
    config.css = {
      ...config.css,
      preprocessorOptions: {
        ...config.css?.preprocessorOptions,
        scss: {
          ...config.css?.preprocessorOptions?.scss,
          loadPaths: [path.join(import.meta.dirname, '../src/styles')],
          // sass-embedded's Dart compiler EPIPE-dies in the 1GB storybook
          // Docker heap; in-process `sass` stays inside Node.
          api: 'modern',
          implementation: sass,
        },
      },
    }
    const envPrefix = config.envPrefix
    config.envPrefix = [
      ...(Array.isArray(envPrefix)
        ? envPrefix
        : envPrefix
          ? [envPrefix]
          : ['VITE_']),
      'NEXT_PUBLIC_',
    ]
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        'mapbox-gl',
        'react-map-gl/mapbox',
      ],
    }
    return config
  },
}

export default config
