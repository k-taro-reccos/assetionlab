import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
// import { Post } from "types"

export const runtime = "edge"

// type Data = {
//   contents: Post[]
// }

export async function POST(request: Request) {
  console.log(request)

  // const res = await fetch(
  //   "https://finance-blog.microcms.io/api/v1/blogs?limit=999",
  //   {
  //     headers: {
  //       "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
  //     },
  //   }
  // )
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data")
  // }
  // const data: Data = await res.json()
  revalidateTag("posts")
  return NextResponse.json({ revalidated: true })
}
