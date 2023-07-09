import { Search } from "./Search"
import Link from "next/link"
import { HiFolder } from "react-icons/hi"
import { ReactNode } from "react"
import { getCategoryList } from "libs/client"

export const PostAside = async ({ children }: { children: ReactNode }) => {
  const { contents: categories } = await getCategoryList()

  return (
    <>
      <div className="flex flex-col gap-6">
        <Search />
        <div className="rounded bg-white p-4 dark:border dark:border-gray-600 dark:bg-gray-700">
          <h3 className="border-b-2 border-primary-color py-2 text-xl font-medium dark:border-blue-700 dark:text-white">
            カテゴリー
          </h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="cursor-pointer border-b transition hover:bg-blue-50 hover:text-primary-color dark:border-gray-600 dark:text-white dark:hover:bg-blue-600"
              >
                <Link
                  href={`/category/${category.id}`}
                  className="flex items-center space-x-2 py-4 pl-4 tracking-wider"
                >
                  <HiFolder className="h-5 w-5" />
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </>
  )
}
