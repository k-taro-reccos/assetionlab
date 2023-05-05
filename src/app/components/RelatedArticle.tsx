import { client } from "libs/client"
import { Post } from "types"
import { Article } from "./Article"

const getRelatedArticle = async (categoryId: string) => {
  const data = await client.getList<Post>({
    endpoint: "blogs",
    queries: {
      filters: `category[equals]${categoryId}`,
    },
  })
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
