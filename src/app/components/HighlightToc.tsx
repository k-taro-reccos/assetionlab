"use client"

import { FC, useEffect, useRef, useState } from "react"
import { TocH2 } from "types"

type Props = {
  toc: TocH2[]
}

export const HighlightToc: FC<Props> = ({ toc }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const observerRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id)
        }
      })
    }

    const target = document.querySelectorAll("h2")

    const watchScroll = () => {
      const basePosition = target[0].offsetTop - 1000
      const scrollPosition = window.scrollY
      setShowScrollToTop(basePosition <= scrollPosition)
    }

    window.addEventListener("scroll", watchScroll)

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }
    const obs = new IntersectionObserver(callback, options)
    if (target) {
      target.forEach((content) => {
        obs.observe(content)
      })
    }

    return () => {
      if (observerRef.current) {
        obs.unobserve(observerRef.current)
      }
      window.removeEventListener("scroll", watchScroll)
    }
  }, [])

  return (
    <div
      className={`transition md:sticky md:top-16 ${
        showScrollToTop
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <ol className="list-inside list-decimal space-y-3 px-6 py-4 font-semibold text-gray-700 marker:text-lg">
        {toc.map((h2, index) => (
          <li
            key={index}
            ref={activeItem === h2.id ? observerRef : null}
            className={
              activeItem === h2.id
                ? "text-primary-color opacity-100"
                : "opacity-40"
            }
          >
            <a
              href={`#${h2.id}`}
              className="cursor-pointer text-lg tracking-wider hover:opacity-70"
            >
              {h2.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
