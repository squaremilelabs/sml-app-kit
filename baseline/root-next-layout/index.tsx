"use client"

import React from "react"
import { fontsClassName } from "../styles/fonts"
import StyleProvider from "../styles/provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

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
        <StyleProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </StyleProvider>
      </body>
    </html>
  )
}
