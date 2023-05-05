import { Article } from "@/app/components/Article"
import { Aside } from "@/app/components/Aside"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HiChevronRight, HiHome } from "react-icons/hi"
import { Category, Post } from "../../../../types"

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
          <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2">
            {posts.map((post) => (
              <Article key={post.id} post={post} />
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
