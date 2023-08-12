import { getCategoryList } from "libs/client"
import Link from "next/link"

export const CategoryList = async () => {
  const { contents: categories } = await getCategoryList({ limit: 4 })

  return (
    <nav className="mt-12 md:mt-0">
      <ul className="flex items-center justify-center bg-gradient-to-r from-cyan-400 to-primary-color dark:from-cyan-700 dark:to-blue-900">
        {categories.map((category) => (
          <li
            className="h-10 w-32 border-l-[1px] border-white last-of-type:border-r-[1px]"
            key={category.id}
          >
            <Link
              href={`/category/${category.id}`}
              className="flex h-full items-center justify-center tracking-wider text-white transition hover:bg-blue-600/20"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
