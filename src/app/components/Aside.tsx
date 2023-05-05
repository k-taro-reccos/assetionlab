import Link from "next/link"
import { HiFolder } from "react-icons/hi"
import { Category } from "types"
import { Search } from "./Search"

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
  const data: Data = await res.json()
  return data.contents
}

export const Aside = async () => {
  const categories = await getCategories()

  return (
    <div className="flex flex-col gap-6 md:h-full">
      <div className="order-2 space-y-2 rounded bg-white p-4 md:order-1">
        {/* <Avatar
          size={80}
          radius={999}
          classNames={{
            root: "mx-auto",
          }}
        /> */}
        <div className="text-center">タロー</div>
        <div>
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </div>
      </div>
      <div className="contents md:sticky md:top-[72px] md:order-2 md:flex md:flex-col md:gap-6">
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
                  as={`/category/${category.id}`}
                  className="flex items-center space-x-2 py-4 pl-4"
                  prefetch={false}
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
