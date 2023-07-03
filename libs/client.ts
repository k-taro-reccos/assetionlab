import { MicroCMSQueries, createClient } from "microcms-js-sdk"
import { notFound } from "next/navigation";
import { Post } from "types";

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
export const getPostList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Post>({
      endpoint: 'blogs',
      queries,
    })
    .catch(notFound);
  return listData;
};

// 記事詳細を取得
export const getPostDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Post>({
      endpoint: 'blogs',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};