import { Post } from "types"
import { Article } from "./Article"

type Data = {
  contents: Post[]
  totalCount: number
  offset: number
  limit: number
}

const search = async (params: string) => {
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/blogs?q=${params}&orders=-publishedAt`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  const data: Data = await res.json()
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
      {searchResults?.contents.map((content) => (
        <Article key={content.id} post={content} />
      ))}
    </div>
  )
}
