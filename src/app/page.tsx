// import { client } from "libs/client"
import { Post } from "../../types"
import { Article } from "./components/Article"
import { Aside } from "./components/Aside"
import { CategoryList } from "./components/CategoryList"

type Data = {
  contents: Post[]
}

const getPosts = async () => {
  // const data = await client.getList<Post>({
  //   endpoint: "blogs"
  // })
  const res = await fetch("https://finance-blog.microcms.io/api/v1/blogs", {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data: Data = await res.json()

  return data.contents
}

const Home = async () => {
  const posts = await getPosts()

  // if (!posts || posts.length === 0) {
  //   notFound()
  // }

  return (
    <>
      <div className="mt-8">
        {/* @ts-expect-error Server Component */}
        <CategoryList />
      </div>
      <div className="mt-12 md:flex">
        <div className="md:flex-1">
          <div className="text-center">
            <span className="section-title">新着記事</span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2">
            {posts.map((post) => (
              <Article key={post.id} post={post} />
            ))}
          </div>
        </div>
        <aside className="mt-12 md:ml-8 md:mt-0 md:w-1/4">
          {/* @ts-expect-error Server Component */}
          <Aside />
        </aside>
      </div>
    </>
  )
}

export default Home
