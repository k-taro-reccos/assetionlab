import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export const runtime = "edge"

export async function POST() {
  revalidateTag("posts")
  return NextResponse.json({ revalidated: true })
}
