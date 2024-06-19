/**
 * 1. Input COLOR_SCALE from https://uicolors.app
 * 2. Run `npx tsx ~sml-app-kit/smui/-dev/scripts/logFlippedColorScale`
 */

const COLOR_SCALE = {
  "50": "#fef2f2",
  "100": "#fee2e2",
  "200": "#fecaca",
  "300": "#fca5a5",
  "400": "#f87171",
  "500": "#ef4444",
  "600": "#dc2626",
  "700": "#b91c1c",
  "800": "#991b1b",
  "900": "#7f1d1d",
  "950": "#450a0a",
}

const flippedValues = Object.values(COLOR_SCALE).reverse()
const flippedScale = Object.entries(COLOR_SCALE).reduce((final, [key], index) => {
  return {
    ...final,
    [key]: flippedValues[index],
  }
}, {})

console.log(JSON.stringify(flippedScale, null, 2))
