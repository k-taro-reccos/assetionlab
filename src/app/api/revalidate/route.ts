import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  
  if (!tag)
    return NextResponse.json({ message: "No tag provided" }, { status: 400 })

  revalidateTag(tag)
  return NextResponse.json({ revalidated: true })
}
