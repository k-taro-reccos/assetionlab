"use client"

import { useEffect, useState } from "react"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi"

export const ToggleDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleChangeDarkMode = () => {
    if (darkMode) {
      localStorage.theme = "light"
      setDarkMode(false)
    } else {
      localStorage.theme = "dark"
      setDarkMode(true)
    }
  }

  return (
    <>
      {darkMode ? (
        <button
          type="button"
          onClick={handleChangeDarkMode}
        >
          <HiOutlineSun className="text-2xl text-white md:text-3xl" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleChangeDarkMode}
        >
          <HiOutlineMoon className="text-2xl md:text-3xl" />
        </button>
      )}
    </>
  )
}
