'use client'

import { ReactNode, useEffect } from "react"

export const WindowTop = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return <>{children}</>
}