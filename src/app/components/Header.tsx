import Link from "next/link"
import { FC } from "react"
import { Search } from "./Search"

export const Header: FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 h-12 w-full bg-primary-color shadow-md">
      <div className="mx-auto h-full max-w-7xl">
        <div className="flex h-full items-center justify-between sm:mx-3">
          <Link
            href="/"
            as="/"
            className="flex h-full items-center px-3 sm:px-5"
            prefetch={false}
          >
            画像
          </Link>
          <Search header />
        </div>
      </div>
    </header>
  )
}
