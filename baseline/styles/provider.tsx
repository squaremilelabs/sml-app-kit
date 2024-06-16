"use client"

import "./global.css"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { useRouter } from "next/navigation"
import React from "react"

export default function StyleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemeProvider attribute="class">
        <div className="flex h-screen w-screen flex-col">{children}</div>
      </NextThemeProvider>
    </NextUIProvider>
  )
}
