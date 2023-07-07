// import { client } from "libs/client"
import Link from "next/link"
import Image from "next/image"
import { MdQueryBuilder } from "react-icons/md"
import dayjs from "dayjs"
import { getPostList } from "libs/client"

const getRelatedArticle = async (categoryId: string) => {
  const { contents: posts } = await getPostList({
    limit: 6,
    filters: `category[equals]${categoryId}`,
  })

  return posts
}

type Props = {
  categoryId: string
  postId: string
}

export const RelatedArticle = async ({ categoryId, postId }: Props) => {
  const data = await getRelatedArticle(categoryId)
  const posts = data.filter((post) => post.id !== postId)

  return (
    <>
      {posts.length > 0 && (
        <div className="rounded bg-white px-4 py-6 sm:px-6 sm:py-8">
          <div className="text-center">
            <span className="section-title">関連記事</span>
          </div>
          <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-2 gap-4 xs:grid-cols-3">
              {posts.map((post) => (
                <article className="relative" key={post.id}>
                  <Link
                    href={`/${post.id}`}
                    className="flex h-full flex-col overflow-hidden rounded-lg border shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Image
                      src={post.eyecatch?.url || "/no_image.jpg"}
                      width={post.eyecatch.width}
                      height={post.eyecatch.height}
                      alt={post.title}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 575px) 100vw,
              (max-width: 991px) 50vw,
          40vw"
                    />
                    <div className="flex flex-1 flex-col bg-white p-2">
                      <h2 className="line-clamp-3 flex-1 leading-6 tracking-widest">
                        {post.title}
                      </h2>
                      <div className="flex items-center justify-end pt-3">
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
          </div>
        </div>
      )}
    </>
  )
}
