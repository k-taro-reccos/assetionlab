import Link from "next/link"
import { Search } from "./Search"
import { CategoryList } from "./CategoryList"
import { FC } from "react"

export const Header: FC = () => {
  return (
    <>
      <header className="fixed left-0 top-0 z-30 h-12 w-full bg-white md:static md:h-14">
        <div className="mx-auto h-full max-w-7xl">
          <div className="flex h-full items-center justify-between sm:mx-3 md:justify-center">
            <Link
              href="/"
              className="flex h-full items-center px-3 text-2xl font-bold tracking-wider text-gray-800 drop-shadow-[3px_3px_2px_rgba(96,165,250,1)] sm:px-5 md:text-3xl"
            >
              資産形成ラボ
            </Link>
            <div className="md:hidden">
              <Search header />
            </div>
          </div>
        </div>
      </header>
       {/* @ts-expect-error Server Component */}
      <CategoryList />
    </>
  )
}
