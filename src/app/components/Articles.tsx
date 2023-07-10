import dayjs from "dayjs"
import { getPostList } from "libs/client"
import Image from "next/image"
import Link from "next/link"
import { MdQueryBuilder } from "react-icons/md"

export const Articles = async () => {
  const { contents: posts } = await getPostList(
    { limit: 999, orders: "-publishedAt" },
    { next: { revalidate: 60 } }
  )

  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2">
      {posts.map((post) => (
        <article className="relative" key={post.id}>
          <Link
            href={`/${post.id}`}
            className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-600 dark:bg-gray-700"
          >
            <div className="relative">
              <span className="absolute left-2 top-2 z-10 rounded-full bg-blue-600 px-3 py-[2px] text-sm tracking-wider text-white dark:bg-gray-700">
                {post.category.name}
              </span>
              <Image
                src={post.eyecatch?.url || "/no_image.jpg"}
                width={post.eyecatch?.width}
                height={post.eyecatch?.height}
                alt={post.title}
                className="h-auto w-full object-cover"
                sizes="(max-width: 575px) 100vw,
              (max-width: 991px) 50vw,
          40vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-2">
              <h2 className="line-clamp-2 flex-1 leading-6 tracking-widest dark:text-white">
                {post.title}
              </h2>
              <div className="flex items-center justify-end pt-3">
                <MdQueryBuilder className="mt-[2px] text-gray-400 dark:text-white" />
                <time className="ml-[2px] text-sm tracking-wider text-gray-400 dark:text-white">
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
