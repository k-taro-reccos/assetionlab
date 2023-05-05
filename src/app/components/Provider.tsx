'use client'

import { MantineProvider } from "@mantine/core"
import { ReactNode } from "react"

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider withCSSVariables withNormalizeCSS>
      {children}
    </MantineProvider>
  )
}
