import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { MdQueryBuilder } from "react-icons/md"
import { Post } from "types"

type Props = {
  post: Post
  related?: boolean
}

export const Article: FC<Props> = ({ post, related }) => {
  return (
    <article className="relative">
      <Link
        href={`/${post.id}`}
        as={`/${post.id}`}
        className="flex h-full flex-col overflow-hidden rounded-lg border shadow-md transition hover:-translate-y-1 hover:shadow-lg"
        prefetch={false}
      >
        {post.eyecatch?.url ? (
          <div className="relative aspect-[2/1]">
            {related ? null : (
              <span className="absolute left-2 top-2 z-10 rounded-full bg-primary-color px-2 py-[2px] text-sm text-white">
                {post.category.name}
              </span>
            )}
            <Image
              src={post.eyecatch?.url}
              fill
              alt={post.title}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 575px) 100vw,
              (max-width: 991px) 50vw,
          40vw"
            />
          </div>
        ) : (
          <Image
            src="/no_image.jpg"
            alt="No Image"
            fill
            priority
            className="mx-auto h-auto w-full"
            sizes="(max-width: 575px) 100vw,
            (max-width: 991px) 50vw,
          40vw"
          />
        )}
        <div className="flex-1 bg-white p-2 pb-8">
          <h2
            className={`line-clamp-3 leading-6 tracking-widest ${
              related || "text-lg"
            }`}
          >
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
  )
}
