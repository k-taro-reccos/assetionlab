import Link from "next/link"
import { Search } from "./Search"
import { CategoryList } from "./CategoryList"
import { FC } from "react"
import { ToggleDarkMode } from "./ToggleDarkMode"

export const Header: FC = () => {
  return (
    <>
      <header className="fixed left-0 top-0 z-30 h-12 w-full border-b bg-white dark:border-gray-700 dark:bg-gray-800 md:static md:h-14">
        <div className="mx-auto h-full max-w-7xl px-3 sm:px-6 md:px-8">
          <div className="flex h-full items-center justify-between">
            <Link
              href="/"
              className="flex h-full items-center text-2xl font-bold tracking-widest text-gray-800 drop-shadow-[3px_3px_2px_rgba(96,165,250,1)] dark:text-white dark:drop-shadow-[3px_3px_2px_rgba(37,99,235,1)] md:text-3xl"
            >
              資産形成ラボ
            </Link>
            <div className="flex items-center space-x-3">
              <div className="md:hidden">
                <Search header />
              </div>
              <ToggleDarkMode />
            </div>
          </div>
        </div>
      </header>
      {/* @ts-expect-error Server Component */}
      <CategoryList />
    </>
  )
}
