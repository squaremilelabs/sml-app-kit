import { NextUIPluginConfig } from "@nextui-org/react"

const baseNextUiConfig: NextUIPluginConfig = {
  addCommonColors: true,
  layout: {
    radius: {
      small: "4px",
      medium: "4px",
      large: "4px",
    },
    borderWidth: {
      small: "1px",
      medium: "1px",
      large: "1px",
    },
  },
  themes: {
    light: {
      extend: "light",
      colors: {
        focus: "#27ABE8",
        primary: {
          "50": "#FDFAE1",
          "100": "#FCF7D7",
          "200": "#FAEEB0",
          "300": "#F2DE86",
          "400": "#E5CA65",
          "500": "#D4AF37",
          "600": "#B69128",
          "700": "#98751B",
          "800": "#7A5A11",
          "900": "#65470A",
          "DEFAULT": "#D4AF37",
        },
        secondary: {
          "50": "#DEFEFD",
          "100": "#D3FBFD",
          "200": "#A8F2FC",
          "300": "#7CE1F8",
          "400": "#5ACBF1",
          "500": "#27ABE8",
          "600": "#1C86C7",
          "700": "#1365A7",
          "800": "#0C4786",
          "900": "#07336F",
          "DEFAULT": "#27ABE8",
        },
      },
    },
    dark: {
      extend: "dark",
      colors: {
        focus: "#27ABE8",
        primary: {
          "50": "#573A07",
          "100": "#65470A",
          "200": "#7A5A11",
          "300": "#98751B",
          "400": "#B69128",
          "500": "#D4AF37",
          "600": "#E5CA65",
          "700": "#F2DE86",
          "800": "#FAEEB0",
          "900": "#FCF7D7",
          "DEFAULT": "#D4AF37",
        },
        secondary: {
          "50": "#082453",
          "100": "#07336F",
          "200": "#0C4786",
          "300": "#1365A7",
          "400": "#1C86C7",
          "500": "#27ABE8",
          "600": "#5ACBF1",
          "700": "#7CE1F8",
          "800": "#A8F2FC",
          "900": "#D3FBFD",
          "DEFAULT": "#27ABE8",
        },
      },
    },
  },
}

export default baseNextUiConfig
