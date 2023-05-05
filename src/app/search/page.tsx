import { Metadata } from "next"
import Link from "next/link"
import { HiChevronRight, HiHome } from "react-icons/hi"
import { Aside } from "../components/Aside"
import { SearchResults } from "../components/SearchResults"
import { Suspense } from "react"
import { WindowProvider } from "../components/WindowProvider"
import { Loading } from "../components/Loading"

type Props = {
  searchParams: {
    q: string
  }
}

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  return {
    title: `「${searchParams.q}」の検索結果`,
  }
}

const SearchPage = async ({ searchParams }: Props) => {
  return (
    <WindowProvider>
      <ul className="flex items-center space-x-1 py-3 text-sm tracking-wider text-gray-500">
        <li>
          <Link
            href="/"
            as="/"
            className="flex items-center space-x-1 hover:underline"
            prefetch={false}
          >
            <HiHome className="h-4 w-4" />
            <span>ホーム</span>
          </Link>
        </li>
        <li className="flex items-center space-x-1">
          <HiChevronRight className="h-5 w-5" />
          <span>「{searchParams.q}」の検索結果</span>
        </li>
      </ul>
      <div className="mt-6 md:flex">
        <div className="md:flex-1">
          <h1 className="text-center text-2xl font-bold tracking-wider">
            「{searchParams.q}」の検索結果
          </h1>
          <hr className="mt-1 h-[2px] bg-gray-400" />
          <div className="mt-6">
            {/* <Loading */}
            <Suspense fallback={<Loading />}>
              {/* @ts-expect-error Server Component */}
              <SearchResults searchParams={searchParams.q} />
            </Suspense>
          </div>
        </div>
        <aside className="mt-12 md:ml-8 md:mt-0 md:w-[25%]">
          {/* @ts-expect-error Server Component */}
          <Aside />
        </aside>
      </div>
    </WindowProvider>
  )
}

export default SearchPage
