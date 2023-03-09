import { client } from "@/libs/client"
import { MicroCMSImage } from "microcms-js-sdk"

type Post = {
  id: string
  title: string
  content: string
  eyecatch?: MicroCMSImage
  category?: string[]
}

const getPosts = async () => {
  const data = await client.getList<Post>({
    endpoint: "blogs",
  })
  return data
}

const Home = async () => {
  const data = await getPosts()
  console.log(data);
  
  return (
    <div>
      <h1 className="text-xl">hello</h1>
      <p>こんにちは</p>
    </div>
  )
}


export default Home
