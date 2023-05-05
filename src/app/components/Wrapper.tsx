"use client"

import { useScrollIntoView } from "@mantine/hooks"
import { FC, ReactNode, useEffect, useState } from "react"
import { HiChevronUp } from "react-icons/hi"

type Props = {
  children: ReactNode
}

export const Wrapper: FC<Props> = ({ children }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 500,
  })

  const watchScroll = () => {
    const basePosition = 300
    const scrollPosition = window.scrollY
    setShowScrollToTop(basePosition <= scrollPosition)
  }

  useEffect(() => {
    window.addEventListener("scroll", watchScroll)
    return () => {
      window.removeEventListener("scroll", watchScroll)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-100" ref={targetRef}>
      {children}
      {showScrollToTop && (
        <button
          type="button"
          onClick={() => scrollIntoView()}
          className="fixed bottom-3 right-3 z-50 sm:bottom-5 sm:right-5"
        >
          <HiChevronUp className="h-10 w-10 cursor-pointer rounded-full bg-gray-500 text-white shadow hover:opacity-70" />
        </button>
      )}
    </div>
  )
}
