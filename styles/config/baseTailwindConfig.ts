import { Config } from "tailwindcss"
import tailwindContainerQueryPlugin from "@tailwindcss/container-queries"

const baseTailwindConfig: Config = {
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
  plugins: [tailwindContainerQueryPlugin],
}

export default baseTailwindConfig
