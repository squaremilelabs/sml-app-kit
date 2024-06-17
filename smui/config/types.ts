import { NextUIPluginConfig as NextUIConfig } from "@nextui-org/react"
import { Config as TailwindConfig } from "tailwindcss"

export type SMUIConfig = {
  tailwind?: TailwindConfig
  nextui?: NextUIConfig
}
