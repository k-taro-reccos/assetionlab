import { Aside } from "@/app/components/Aside"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HiChevronRight, HiHome } from "react-icons/hi"
import { Category, Post } from "../../../../types"
import Image from "next/image"
import { MdQueryBuilder } from "react-icons/md"
import dayjs from "dayjs"

type PostData = {
  contents: Post[]
}

const getPosts = async (id: string) => {
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/blogs?filters=category[equals]${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }
  const { contents: post }: PostData = await res.json()

  return post
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
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/categories/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  const data: Category = await res.json()

  return {
    title: data.name,
  }
}

type Data = {
  contents: Category[]
}

export const generateStaticParams = async () => {
  const res = await fetch(
    "https://finance-blog.microcms.io/api/v1/categories",
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }
  const { contents: categories }: Data = await res.json()

  const paths = categories.map((category) => {
    return {
      id: category.id.toString(),
    }
  })
  return [...paths]
}

const CategoryPage = async ({ params }: Props) => {
  const id = params.id
  const posts = await getPosts(id)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <>
      <ul className="flex items-center space-x-1 py-3 text-sm tracking-wider text-gray-500">
        <li>
          <Link
            href="/"
            as="/"
            className="flex items-center space-x-1 hover:underline"
            prefetch={false}
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
          <h1 className="text-center text-2xl font-bold tracking-wider">
            {posts[0].category.name}
          </h1>
          <hr className="mt-1 h-[2px] bg-gray-400" />
          <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2">
            {posts.map((post) => (
              <article className="relative" key={post.id}>
                <Link
                  href={`/${post.id}`}
                  as={`/${post.id}`}
                  className="flex h-full flex-col overflow-hidden rounded-lg border shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                  prefetch={false}
                >
                  {post.eyecatch?.url ? (
                    <div className="relative aspect-[2/1]">
                      <span className="absolute left-2 top-2 z-10 rounded-full bg-primary-color px-2 py-[2px] text-sm text-white">
                        {post.category.name}
                      </span>
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
