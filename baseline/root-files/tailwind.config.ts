import { merge } from "ts-deepmerge"
import { nextui } from "@nextui-org/react"
import { Config } from "tailwindcss"
import baseTailwindConfig from "../styles/baseTailwindConfig"
import baseNextUiConfig from "../styles/baseNextUIConfig"

export default merge(baseTailwindConfig, {
  /**
   * Add custom Tailwind config here
   */
  plugins: [
    /**
     * Add custom Tailwind plugins here
     */
    nextui(
      merge(baseNextUiConfig, {
        /**
         * Add custom NextUI config here
         */
      })
    ),
  ],
}) as Config
