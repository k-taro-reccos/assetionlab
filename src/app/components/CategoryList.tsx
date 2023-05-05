import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { Category } from "types"

type Props = {
  category: Category
}

export const CategoryList: FC<Props> = ({ category }) => {
  return (
    <li className="relative" key={category.id}>
      <Link
        href={`/category/${category.id}`}
        as={`/category/${category.id}`}
        prefetch={false}
        className="block shadow-md transition hover:-translate-y-1 hover:shadow-lg"
      >
        <span className="absolute left-2 top-2 z-10 rounded bg-white px-2 text-sm sm:text-xs md:text-sm">
          {category.name}
        </span>
        <div className="relative aspect-[2/1] sm:aspect-[5/3]">
          <Image
            src="https://source.unsplash.com/M_UOjtOZ-C4"
            alt={category.name}
            fill
            priority
            sizes="(max-width: 767px) 50vw, 25vw"
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      </Link>
    </li>
  )
}
