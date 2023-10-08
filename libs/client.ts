import { MicroCMSQueries, createClient } from "microcms-js-sdk"
import { notFound } from "next/navigation"
import { cache } from "react"
import { Category, Post } from "types"

type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload"

type Options = {
  next?: {
    revalidate?: number
    tags?: string[]
  }
  cache?: RequestCache
}

if (!process.env.MICROCMS_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required")
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required")
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

// 記事一覧を取得
export const getPostList = cache(
  async (queries?: MicroCMSQueries, options?: Options) => {
    const listData = await client
      .getList<Post>({
        endpoint: "blogs",
        queries,
        customRequestInit: options,
      })
      .catch(notFound)
    return listData
  }
)

// 記事詳細を取得
export const getPostDetail = cache(
  async (contentId: string, options?: Options, queries?: MicroCMSQueries) => {
    const detailData = await client
      .getListDetail<Post>({
        endpoint: "blogs",
        contentId,
        queries,
        customRequestInit: options,
      })
      .catch(notFound)

    return detailData
  }
)

// プレビューモードの記事詳細を取得
export const getPostDraft = cache(
  async (contentId: string, queries?: MicroCMSQueries) => {
    const detailData = await client
      .getListDetail<Post>({
        endpoint: "blogs",
        contentId,
        queries,
        customRequestInit: { cache: "no-store" },
      })
      .catch(notFound)

    return detailData
  }
)

// カテゴリー一覧を取得
export const getCategoryList = cache(async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Category>({
      endpoint: "categories",
      queries,
      customRequestInit: { next: { tags: ["post"] } },
    })
    .catch(notFound)
  return listData
})

// カテゴリー詳細を取得
export const getCategoryDetail = cache(
  async (contentId: string, queries?: MicroCMSQueries) => {
    const detailData = await client
      .getListDetail<Category>({
        endpoint: "categories",
        contentId,
        queries,
        // customRequestInit: { next: { tags: ["post"] } },
      })
      .catch(notFound)

    return detailData
  }
)
