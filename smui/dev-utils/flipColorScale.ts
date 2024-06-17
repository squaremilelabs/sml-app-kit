// npx tsx ~sml-app-kit/smui/dev-utils/flipColorScale

// INPUT HERE
const colorScale = {
  "50": "#f3f7fc",
  "100": "#e7f0f7",
  "200": "#c9dfee",
  "300": "#9ac5df",
  "400": "#64a6cc",
  "500": "#418bb6",
  "600": "#2f6f9a",
  "700": "#27597d",
  "800": "#244c68",
  "900": "#234157",
  "950": "#172a3a",
}

const flippedValues = Object.values(colorScale).reverse()
const flippedScale = Object.entries(colorScale).reduce((final, [key], index) => {
  return {
    ...final,
    [key]: flippedValues[index],
  }
}, {})

console.log(JSON.stringify(flippedScale, null, 2))
