import "tsconfig-paths/register"
import { merge } from "ts-deepmerge"
import { NextUIPluginConfig, nextui } from "@nextui-org/react"
import { Config as TailwindConfig } from "tailwindcss"
import tailwindContainerQueryPlugin from "@tailwindcss/container-queries"
import smuiConfig from "smui.config"

const nextUIConfig: NextUIPluginConfig = merge(
  {
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
            "50": "#faf9ec",
            "100": "#f4f0cd",
            "200": "#ebdf9d",
            "300": "#dfc865",
            "400": "#d4af37",
            "500": "#c59b2d",
            "600": "#aa7a24",
            "700": "#885920",
            "800": "#724921",
            "900": "#623e21",
            "DEFAULT": "#c59b2d",
          },
          secondary: {
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
            "DEFAULT": "#c59b2d",
          },
        },
      },
      dark: {
        extend: "dark",
        colors: {
          focus: "#27ABE8",
          primary: {
            "50": "#382010",
            "100": "#623e21",
            "200": "#724921",
            "300": "#885920",
            "400": "#aa7a24",
            "500": "#c59b2d",
            "600": "#d4af37",
            "700": "#dfc865",
            "800": "#ebdf9d",
            "900": "#f4f0cd",
            "DEFAULT": "#c59b2d",
          },
          secondary: {
            "50": "#172a3a",
            "100": "#234157",
            "200": "#244c68",
            "300": "#27597d",
            "400": "#2f6f9a",
            "500": "#418bb6",
            "600": "#64a6cc",
            "700": "#9ac5df",
            "800": "#c9dfee",
            "900": "#e7f0f7",
            "DEFAULT": "#418bb6",
          },
        },
      },
    },
  },
  smuiConfig?.nextui ?? {}
) as NextUIPluginConfig

const tailwindConfig = merge(
  {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./lib/**/*.{js,ts,jsx,tsx,mdx}",
      "./~sml-app-kit/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      {
        pattern:
          /(bg|text|border|divide)-(default|primary|secondary|danger|warning|success|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuschia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)/,
      },
      {
        pattern: /(w|max-w|min-w)-(wxs|wsm|wmd|wlg|wxl)/,
      },
    ],
    theme: {
      screens: {
        wxs: "288px",
        wsm: "576px",
        wmd: "864px",
        wlg: "1152px",
        wxl: "1440px",
      },
      containers: {
        wxs: "288px",
        wsm: "576px",
        wmd: "864px",
        wlg: "1152px",
        wxl: "1440px",
      },
      extend: {
        borderRadius: {
          sm: "4px",
          md: "4px",
          DEFAULT: "4px",
          lg: "8px",
        },
        spacing: {
          wxs: "288px",
          wsm: "576px",
          wmd: "864px",
          wlg: "1152px",
          wxl: "1440px",
        },
        fontFamily: {
          sans: ["var(--font-sans)"],
          mono: ["var(--font-mono)"],
        },
      },
    },
    plugins: [tailwindContainerQueryPlugin, nextui(nextUIConfig)],
  },
  smuiConfig?.tailwind ?? {}
) as TailwindConfig

export default tailwindConfig
