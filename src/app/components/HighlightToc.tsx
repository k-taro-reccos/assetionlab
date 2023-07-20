"use client"

import { FC, useEffect, useRef, useState } from "react"
import { TocH2 } from "types"

type Props = {
  toc: TocH2[]
}

export const HighlightToc: FC<Props> = ({ toc }) => {
  // const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const observerRef = useRef<HTMLLIElement | null>(null)
  const observerRefValue = observerRef.current

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id)
        }
      })
    }

    const target = document.querySelectorAll("h2")
    const target3 = document.querySelectorAll("h3")

    // const watchScroll = () => {
    //   const basePosition = target[0].offsetTop - 1000
    //   const scrollPosition = window.scrollY
    //   setShowScrollToTop(basePosition <= scrollPosition)
    // }

    // window.addEventListener("scroll", watchScroll)

    const options = {
      root: null,
      rootMargin: "0% 0px -99% 0px",
      threshold: 0,
    }
    const obs = new IntersectionObserver(callback, options)
    if (target) {
      target.forEach((content) => {
        obs.observe(content)
      })
    }
    if (target3) {
      target3.forEach((content) => {
        obs.observe(content)
      })
    }

    return () => {
      if (observerRefValue) {
        obs.unobserve(observerRefValue)
      }
      // window.removeEventListener("scroll", watchScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded bg-white p-4 dark:border dark:border-gray-600 dark:bg-gray-700">
      <span className="text-lg font-bold tracking-wider dark:text-white">
        目次
      </span>
      <ol className="mt-2 list-decimal space-y-2 pl-8 font-semibold text-gray-400 dark:text-white">
        {toc.map((h2, index) => (
          <li
            key={index}
            ref={activeItem === h2.id ? observerRef : null}
            className={
              activeItem === h2.id
                ? "text-primary-color opacity-100 dark:text-blue-600"
                : ""
            }
          >
            <a
              href={`#${h2.id}`}
              className="cursor-pointer tracking-wider hover:text-gray-600 dark:hover:text-gray-400"
            >
              {h2.text}
            </a>
            {h2.h3.length > 0 && (
              <ul className="mt-2 space-y-2 pl-6 font-semibold text-gray-400 dark:text-white">
                {h2.h3.map((h3, index) => (
                  <li
                    key={index}
                    ref={activeItem === h3.id ? observerRef : null}
                    className={`relative before:absolute before:-left-4 before:content-["・"] ${
                      activeItem === h3.id
                        ? "text-primary-color opacity-100 dark:text-blue-600"
                        : ""
                    }
                    `}
                  >
                    <a
                      href={`#${h3.id}`}
                      className="cursor-pointer tracking-wider hover:text-gray-600 dark:hover:text-gray-400"
                    >
                      {h3.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
