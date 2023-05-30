import Link from "next/link"
import dayjs from "dayjs"
import Image from "next/image"
import parse from "html-react-parser"
import { MdQueryBuilder, MdRestore } from "react-icons/md"
import { HiChevronRight, HiHome } from "react-icons/hi"
import { Post, TocH2, TocH3 } from "../../../types"
import { load } from "cheerio"
import { TableOfContents } from "../components/TableOfContents"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { RelatedArticle } from "../components/RelatedArticle"
import { useTextLimit } from "@/hooks/useTextLimit"
import { draftMode } from "next/headers"
import { HighlightToc } from "../components/HighlightToc"

export const dynamicParams = false

const getDetailPost = async (contentId: string) => {
  const { isEnabled } = draftMode()
  const url = isEnabled
    ? `http://localhost:3000/api/preview?postId=${contentId}&draftKey=${contentId}`
    : `https://finance-blog.microcms.io/api/v1/blogs/${contentId}`

  // const isDraft = (arg: any): arg is Draft => {
  //   if (!arg?.draftKey) {
  //     return false
  //   }
  //   return typeof arg.draftKey === "string"
  // }
  // const draftKey = isDraft(preview)
  //   ? { draftKey: preview.draftKey }
  //   : {}

  // const post = await client.getListDetail<Post>({
  //   endpoint: "blogs",
  //   contentId,
  //   // queries: draftKey,
  // })
  const res = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
    },
    // next: { tags: ["posts"] },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }
  const post: Post = await res.json()

  let toc = Array<TocH2>() // 目次
  let h2Index = -1 // 見出し２インデックス

  for (let i = 0; i < post.body.length; i++) {
    const body = post.body[i]

    // fieldIdの種類によって処理を分ける
    if (body.fieldId == "section") {
      // Rich Editorの場合は、見出しを抽出
      const $ = load(body.content)

      // リッチエディタのテキストからh2, h3の要素を抽出
      $("h2, h3").each((_, elm) => {
        if ($(elm).prop("tagName") === "H2") {
          // h2の要素からid, textを取得し、配列に設定
          h2Index += 1
          const tocH2: TocH2 = {
            id: String($(elm).attr("id")),
            text: $(elm).text(),
            h3: Array<TocH3>(),
          }
          toc[h2Index] = tocH2
        }

        if ($(elm).prop("tagName") === "H3" && h2Index !== -1) {
          // h3の要素からid, textを取得し、配列に設定
          // h3の前に最初のh2がない場合は処理をスキップする
          const tocH3: TocH3 = {
            id: String($(elm).attr("id")),
            text: $(elm).text(),
          }
          toc[h2Index].h3.push(tocH3)
        }
      })
    }
  }

  return { post, toc }
}

type Data = {
  contents: Post[]
}

export const generateStaticParams = async () => {
  const res = await fetch("https://finance-blog.microcms.io/api/v1/blogs", {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const { contents: posts }: Data = await res.json()

  const paths = posts.map((post) => {
    return {
      postId: post.id,
    }
  })

  return [...paths]
}

type Props = {
  params: {
    postId: string
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = params.postId
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/blogs/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )

  const data: Post = await res.json()

  return {
    title: data.title,
  }
}

const PostPage = async ({ params }: Props) => {
  const id = params.postId
  const { post, toc } = await getDetailPost(id)

  if (!post.id) {
    notFound()
  }

  const limitTitle = useTextLimit(post.title, 10)

  return (
    <>
      <div>
        {/* {draft.isEnabled && <div className="text-2xl">プレビューモード</div>} */}
        <ul className="flex items-center space-x-1 py-4 text-sm tracking-wider text-gray-500">
          <li>
            <Link
              href="/"
              as="/"
              className="flex items-center space-x-1 hover:underline"
              prefetch={false}
            >
              <HiHome className="h-4 w-4" />
              <span>ホーム</span>
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <HiChevronRight className="h-5 w-5" />
            <Link
              href={`/category/${post.category.id}`}
              as={`/category/${post.category.id}`}
              className="hover:underline"
              prefetch={false}
            >
              {post.category.name}
            </Link>
          </li>
          <li className="flex items-center">
            <HiChevronRight className="h-5 w-5" />
            <span>{limitTitle}</span>
          </li>
        </ul>
        <div className="grid gap-y-12 md:grid-cols-4">
          <div className="md:col-span-3">
            <div className="rounded bg-white p-4 sm:p-6">
              <h1 className="text-3xl font-bold tracking-wider">
                {post.title}
              </h1>
              <div className="mt-3 flex items-center space-x-2">
                <span className="flex items-center">
                  <MdQueryBuilder className="mt-[2px] text-gray-400" />
                  <time className="ml-[2px] text-sm tracking-wider text-gray-400">
                    {dayjs(post.publishedAt).format("YYYY/MM/DD")}
                  </time>
                </span>
                <span className="flex items-center">
                  <MdRestore className="mt-[2px] text-lg text-gray-400" />
                  <time className="ml-[2px] text-sm tracking-wider text-gray-400">
                    {dayjs(post.updatedAt).format("YYYY/MM/DD")}
                  </time>
                </span>
              </div>
              <div className="relative mt-6 aspect-video w-full">
                <Image
                  src={post.eyecatch.url}
                  alt={post.title}
                  fill
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 991px) 100vw, 75vw"
                />
              </div>
              <div className="mt-8">
                <TableOfContents toc={toc} />
                {post.body?.map((sec, index) =>
                  sec.fieldId === "section" ? (
                    <section key={index}>
                      <div className="rich-editor mt-4">
                        {parse(sec.content)}
                      </div>
                    </section>
                  ) : sec.fieldId === "balloon" ? (
                    <div
                      key={index}
                      className={`my-8 flex ${
                        sec.isLeft ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div className="w-[15%] min-w-[60px] max-w-[80px] text-center">
                        <div className="relative aspect-square rounded-full border">
                          <Image
                            src={sec.image?.url}
                            alt={sec.name}
                            fill
                            priority
                            className="h-auto w-full rounded-full object-cover"
                            sizes="20vw"
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {sec.name}
                        </span>
                      </div>
                      <div
                        className={`${
                          sec.isLeft
                            ? "balloon-left ml-6"
                            : "balloon-right mr-6"
                        }  h-full max-w-[65%]`}
                      >
                        <p className="leading-6 tracking-wider">{sec.text}</p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:ml-8 md:block">
            <HighlightToc toc={toc} />
          </div>
          <div className="md:col-span-3">
            {/* @ts-expect-error Server Component */}
            <RelatedArticle categoryId={post.category.id} postId={post.id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostPage
