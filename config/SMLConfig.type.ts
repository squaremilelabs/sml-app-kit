import { NextUIPluginConfig as NextUIConfig } from "@nextui-org/react"
import { NextAuthConfig } from "next-auth"
import { Config as TailwindConfig } from "tailwindcss"

type SMLConfig = {
  auth?: {
    providers?: NextAuthConfig["providers"]
  }
  database?: unknown
  ui?: {
    tailwind?: TailwindConfig
    nextui?: NextUIConfig
  }
}

export default SMLConfig
