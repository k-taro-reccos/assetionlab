import { Aside } from "@/app/components/Aside"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HiChevronRight, HiHome } from "react-icons/hi"
import Image from "next/image"
import { MdQueryBuilder } from "react-icons/md"
import dayjs from "dayjs"
import { getCategoryDetail, getCategoryList, getPostList } from "libs/client"

export const revalidate = 60

const getPosts = async (id: string) => {
  const posts = await getPostList({
    limit: 999,
    filters: `category[equals]${id}`,
  })

  return posts
}

type Props = {
  params: {
    id: string
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = params.id
  const category = await getCategoryDetail(id)

  return {
    title: category.name,
    description: category.name,
  }
}

export const generateStaticParams = async () => {
  const { contents: categories } = await getCategoryList()

  const paths = categories.map((category) => {
    return {
      id: category.id,
    }
  })
  return [...paths]
}

const CategoryPage = async ({ params }: Props) => {
  const id = params.id
  const { contents: posts } = await getPosts(id)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <>
      <ul className="flex items-center space-x-1 py-4 text-sm tracking-wider text-gray-500 dark:text-white">
        <li>
          <Link
            href="/"
            className="flex items-center space-x-1 hover:underline"
          >
            <HiHome className="h-4 w-4" />
            <span>ホーム</span>
          </Link>
        </li>
        <li className="flex items-center space-x-1">
          <HiChevronRight className="h-5 w-5" />
          <span>{posts[0].category.name}</span>
        </li>
      </ul>
      <div className="mt-6 md:flex">
        <div className="md:flex-1">
          <h1 className="text-center text-2xl font-bold tracking-wider dark:text-white">
            {posts[0].category.name}
          </h1>
          <hr className="mt-3 h-[2px] bg-gray-400 dark:bg-gray-600" />
          <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id}>
                <Link
                  href={`/${post.id}`}
                  className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-600 dark:bg-gray-700"
                >
                  <div className="relative">
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-blue-600 px-3 py-[2px] text-sm text-white dark:bg-gray-700">
                      {post.category.name}
                    </span>
                    <Image
                      src={post.eyecatch?.url || "/no_image.jpg"}
                      width={post.eyecatch?.width}
                      height={post.eyecatch?.height}
                      alt={post.title}
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
        </div>
        <aside className="mt-12 md:ml-8 md:mt-0 md:w-[25%]">
          {/* @ts-expect-error Server Component */}
          <Aside />
        </aside>
      </div>
    </>
  )
}

export default CategoryPage
