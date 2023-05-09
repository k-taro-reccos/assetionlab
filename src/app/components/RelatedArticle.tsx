// import { client } from "libs/client"
import { Post } from "types"
import { Article } from "./Article"

type PostData = {
  contents: Post[]
}

const getRelatedArticle = async (categoryId: string) => {
  // const data = await client.getList<Post>({
  //   endpoint: "blogs",
  //   queries: {
  //     filters: `category[equals]${categoryId}`,
  //   },
  // })
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/blogs?filters=category[equals]${categoryId}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }
  const data: PostData = await res.json()

  return data.contents
}

type Props = {
  categoryId: string
  postId: string
}

export const RelatedArticle = async ({ categoryId, postId }: Props) => {
  const data = await getRelatedArticle(categoryId)
  const posts = data.filter((post) => post.id !== postId)

  return (
    <div className="grid grid-cols-2 gap-4 xs:grid-cols-3">
      {posts.map((post) => (
        <Article key={post.id} post={post} related />
      ))}
    </div>
  )
}
