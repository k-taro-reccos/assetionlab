import { getCategoryList } from "libs/client"
// import Image from "next/image"
import Link from "next/link"

export const CategoryList = async () => {
  const { contents: categories } = await getCategoryList({ limit: 4 })

  return (
    // <nav>
    //   <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    //     {categories.map((category) => (
    //       <li className="relative" key={category.id}>
    //         <Link
    //           href={`/category/${category.id}`}
    //           className="block overflow-hidden rounded-lg shadow-md transition hover:-translate-y-1 hover:shadow-lg"
    //         >
    //           {/* <span className="absolute left-2 top-2 z-10 rounded bg-white px-2 text-sm sm:text-xs md:text-sm">
    //             {category.name}
    //           </span> */}
    //           <Image
    //             src={category.image?.url}
    //             alt={category.name}
    //             width={category.image?.width}
    //             height={category.image?.height}
    //             sizes="(max-width: 767px) 50vw, 25vw"
    //             className="h-auto w-full object-cover"
    //           />
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
    <nav className="mt-12 md:mt-0">
      <ul className="flex items-center justify-center bg-gradient-to-r from-cyan-400 to-primary-color">
        {categories.map((category) => (
          <li
            className="h-10 w-32 border-l-[1px] border-white last-of-type:border-r-[1px]"
            key={category.id}
          >
            <Link
              href={`/category/${category.id}`}
              className="flex h-full items-center justify-center text-white hover:bg-blue-600/20"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
