"use client"

import "./smui.css"
import React from "react"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ClassNameValue, twMerge } from "tailwind-merge"
import { useRouter } from "next/navigation"

export default function SMUIProvider({
  children,
  additionalClassNames,
}: {
  children: React.ReactNode
  additionalClassNames?: ClassNameValue
}) {
  const router = useRouter()
  return (
    <NextUIProvider
      navigate={router.push}
      className={twMerge("flex h-screen w-screen flex-col font-sans", additionalClassNames)}
    >
      <NextThemeProvider attribute="class">{children}</NextThemeProvider>
    </NextUIProvider>
  )
}
