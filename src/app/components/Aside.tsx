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
        <div className="order-2 space-y-2 rounded bg-white p-4 md:order-1">
          <Image
            src="/kotaro.png"
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
      <div className="contents md:sticky md:top-[88px] md:order-2 md:flex md:flex-col md:gap-6">
        <div className="order-1">
          <Search />
        </div>
        <div className="order-3 rounded bg-white p-4">
          <h3 className="border-b-2 border-primary-color py-2 text-xl font-medium">
            カテゴリー
          </h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="cursor-pointer border-b transition hover:bg-blue-50 hover:text-primary-color"
              >
                <Link
                  href={`/category/${category.id}`}
                  className="flex items-center space-x-2 py-4 pl-4"
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
