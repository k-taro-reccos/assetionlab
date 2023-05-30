// import { client } from "libs/client"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import { Post } from "types"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId")
  const draftKey = searchParams.get("draftKey")

  if (typeof draftKey !== "string" || typeof postId !== "string") {
    return NextResponse.json("no data", {
      status: 404,
    })
  }
  // const data = await client.get<Post>({
  //   endpoint: "blogs",
  //   contentId: postId,
  //   queries: {
  //     draftKey,
  //   },
  // })

  const res = await fetch(`https://finance-blog.microcms.io/api/v1/blogs/${postId}?draftKey=${draftKey}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
    },
  })
  const post: Post = await res.json()

  if (!post) {
    return NextResponse.json(
      { message: "Invalid slug" },
      {
        status: 401,
      }
    )
  }

  draftMode().enable()
  redirect(`${post.id}`)

  // return NextResponse.json(
  //   {
  //     postId: data.id,
  //     draftKey,
  //   },
  // )
}
