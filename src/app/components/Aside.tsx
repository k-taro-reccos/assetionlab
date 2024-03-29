import Link from "next/link"
import { HiFolder } from "react-icons/hi"
import { Search } from "./Search"
import Image from "next/image"
import { getCategoryList } from "libs/client"

type Props = {
  topPage: boolean
}

export const Aside = async ({ topPage }: Props) => {
  const { contents: categories } = await getCategoryList()

  return (
    <div className="flex flex-col gap-6 md:h-full">
      {topPage && (
        <div className="order-2 space-y-2 rounded bg-white p-4 dark:border dark:border-gray-600 dark:bg-gray-700 dark:text-white md:order-1">
          <Image
            src="/kotaro.webp"
            width={100}
            height={100}
            alt="コータロー"
            className="mx-auto rounded-full"
          />
          <div className="text-center">コータロー</div>
          <p className="pt-2 leading-7">
            お金についての情報を発信中。
            <br />
            NISAやiDeCo、税金などむずかしい言葉が多くなかなか勉強、行動する気にならないという方に向けてわかりやすく解説しています。
          </p>
        </div>
      )}
      <div className="contents md:sticky md:top-8 md:order-2 md:flex md:flex-col md:gap-6">
        <div className="order-1">
          <Search />
        </div>
        <div className="order-3 rounded bg-white p-4 dark:border dark:border-gray-600 dark:bg-gray-700">
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
    </div>
  )
}
