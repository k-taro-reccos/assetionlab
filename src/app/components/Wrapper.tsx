"use client"

import { FC, ReactNode, useEffect, useState } from "react"
import { HiChevronUp } from "react-icons/hi"

type Props = {
  children: ReactNode
}

export const Wrapper: FC<Props> = ({ children }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const watchScroll = () => {
    const basePosition = 300
    const scrollPosition = window.scrollY
    setShowScrollToTop(basePosition <= scrollPosition)
  }

  // const handleKeyPress = (e: KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault()
  //     // 他の処理を実行する
  //   }
  // }

  useEffect(() => {
    window.addEventListener("scroll", watchScroll)
    // window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("scroll", watchScroll)
      // window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyPress)
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress)
  //   }
  // }, [])

  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {children}
      <button
        type="button"
        onClick={onScrollTop}
        className={`pointer-events-none fixed bottom-5 right-3 z-50 opacity-0 transition duration-500 sm:bottom-6 sm:right-5 ${
          showScrollToTop && "pointer-events-auto opacity-100"
        }`}
      >
        <HiChevronUp className="h-10 w-10 cursor-pointer rounded-full bg-gray-500 text-white shadow transition hover:opacity-70" />
      </button>
    </div>
  )
}
