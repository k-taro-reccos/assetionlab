import { Aside } from "@/app/components/Aside"
import { Search } from "@/app/components/Search"
import Link from "next/link"
import React from "react"
import { HiChevronRight, HiHome } from "react-icons/hi"
import { Category } from "types"

type Data = {
  contents: Category[]
}

const getCategories = async () => {
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/categories`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data: Data = await res.json()
  return data.contents
}

const NotFound = async () => {
  const categories = await getCategories()
  
  return (
    <>
      <ul className="flex items-center space-x-1 py-3 text-sm text-gray-500">
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
          <span>ページが見つかりませんでした。</span>
        </li>
      </ul>
      <div className="md:flex">
        <div className="md:flex-1">
          <div>
            <div className="rounded bg-white p-4">
              <h1 className="mt-12 text-center text-3xl font-bold tracking-wider">
                ページが見つかりませんでした。
              </h1>
              <p className="mt-12 text-center">
                以下の方法からもう一度目的のページをお探しください。
              </p>
              <div className="mt-12">
                <h2 className="rounded border-l-4 border-primary-color bg-blue-100 py-3 pl-4 text-xl font-bold">
                  1. 検索して見つける
                </h2>
                <p className="mt-6">
                  以下よりキーワードを入力して検索してください。
                </p>
                <div className="mt-6 border">
                  <Search />
                </div>
                <div className="mt-12">
                  <h2 className="rounded border-l-4 border-primary-color bg-blue-100 py-3 pl-4 text-xl font-bold">
                    2. カテゴリーから見つける
                  </h2>
                  <ul className="mt-6 list-inside list-disc space-y-4 pl-4">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/category/${category.id}`}
                          as={`/category/${category.id}`}
                          className="text-gray-500 hover:underline"
                          prefetch={false}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="mt-12 md:ml-8 md:mt-0 md:w-[25%]">
          {/* @ts-expect-error Server Component */}
          <Aside />
        </aside>
      </div>
    </>
  )
}

export default NotFound
