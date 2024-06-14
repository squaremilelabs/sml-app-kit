import React from "react"
import { fontsClassName } from "../styles/fonts"
import StyleProvider from "../styles/provider"

export default function RootLayout({
  htmlProps,
  bodyProps,
  children,
}: {
  htmlProps?: Omit<
    React.HTMLProps<HTMLHtmlElement>,
    "className" | "lang" | "suppressHydrationWarning"
  >
  bodyProps?: React.HTMLProps<HTMLBodyElement>
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontsClassName} {...htmlProps}>
      <body {...bodyProps}>
        <StyleProvider>{children}</StyleProvider>
      </body>
    </html>
  )
}
