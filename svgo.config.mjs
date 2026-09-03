/** @type {import('svgo').Config} */
const config = {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep color info for social/filled icons
          convertColors: {
            currentColor: false,
          },
        },
      },
    },
    // Remove width and height attributes (keep only viewBox — SVGR sizes via props)
    'removeDimensions',
    // Remove unnecessary attrs
    {
      name: 'removeAttrs',
      params: {
        attrs: ['xmlns:xlink', 'data-name'],
      },
    },
    // Sort attributes for consistency
    'sortAttrs',
    // Remove empty containers
    'removeEmptyContainers',
  ],
}

export default config
