import Link from "next/link"
import Image from "next/image"
import { MdQueryBuilder } from "react-icons/md"
import dayjs from "dayjs"
import { getPostList } from "libs/client"

const search = async (params: string) => {
  const data = await getPostList({
    limit: 999,
    q: params,
    orders: "-publishedAt",
  })
  return data
}

type Props = {
  searchParams: string
}

export const SearchResults = async ({ searchParams }: Props) => {
  const searchResults = await search(searchParams)

  if (searchResults?.totalCount === 0) {
    return (
      <p className="text-center text-xl font-bold tracking-wider">
        記事が見つかりませんでした。
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
      {searchResults.contents.map((post) => (
        <article className="relative" key={post.id}>
          <Link
            href={`/${post.id}`}
            className="flex h-full flex-col overflow-hidden rounded-lg border shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[2/1]">
              <span className="absolute left-2 top-2 z-10 rounded-full bg-primary-color px-2 py-[2px] text-sm text-white">
                {post.category.name}
              </span>
              <Image
                src={post.eyecatch?.url || "/no_image.jpg"}
                fill
                alt={post.title}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 575px) 100vw,
              (max-width: 991px) 50vw,
          40vw"
              />
            </div>
            <div className="flex-1 bg-white p-2 pb-10">
              <h2 className="line-clamp-3 leading-6 tracking-widest">
                {post.title}
              </h2>
              <div className="absolute bottom-2 right-2 flex items-center">
                <MdQueryBuilder className="mt-[2px] text-gray-400" />
                <time className="ml-[2px] text-sm tracking-wider text-gray-400">
                  {dayjs(post.publishedAt).format("YYYY/MM/DD")}
                </time>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
