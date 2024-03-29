import Link from "next/link"
import dayjs from "dayjs"
import Image from "next/image"
import parse from "html-react-parser"
import { MdQueryBuilder, MdRestore } from "react-icons/md"
import { HiChevronRight, HiHome } from "react-icons/hi"
import { TocH2, TocH3 } from "../../../types"
import { load } from "cheerio"
import { TableOfContents } from "../components/TableOfContents"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { RelatedArticle } from "../components/RelatedArticle"
import { useTextLimit } from "@/hooks/useTextLimit"
import { HighlightToc } from "../components/HighlightToc"
import { PostAside } from "../components/PostAside"
import { Aside } from "../components/Aside"
import { getPostDetail, getPostList } from "libs/client"

import { HiPencilSquare } from "react-icons/hi2"
import { BsExclamationLg } from "react-icons/bs"

export const revalidate = 86400

const getToc = async (contentId: string) => {
  const post = await getPostDetail(contentId, { next: { tags: ["post"] } })

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

  return toc
}

export const generateStaticParams = async () => {
  const posts = await getPostList({ limit: 999 })

  const paths = posts.contents.map((post) => {
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
  const data = await getPostDetail(id)

  return {
    title: data.title,
    description: data.description,
  }
}

const PostPage = async ({ params }: Props) => {
  const id = params.postId
  const toc = await getToc(id)
  const post = await getPostDetail(id)

  if (!post) {
    notFound()
  }

  const limitTitle = useTextLimit(post.title, 10)

  const post_intro = post.intro?.map((intro, index) => {
    if (intro.fieldId === "intro") {
      return (
        <div key={index} className="intro">
          {parse(intro.intro)}
        </div>
      )
    } else if (intro.fieldId === "balloon") {
      return (
        <div
          key={index}
          className={`my-8 flex ${
            intro.isLeft ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div className="w-[15%] min-w-[60px] max-w-[80px] text-center">
            <div className="aspect-square overflow-hidden rounded-full border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={intro.image?.url}
                alt={intro.name}
                width={100}
                height={100}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              {intro.name}
            </span>
          </div>
          <div
            className={`${
              intro.isLeft ? "balloon-left ml-6" : "balloon-right mr-6"
            }  h-full max-w-[65%]`}
          >
            <div className="prose tracking-wider dark:prose-p:text-white dark:prose-strong:text-white">
              {parse(intro.text)}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  })

  const post_body = post.body?.map((sec, index) => {
    if (sec.fieldId === "section") {
      return (
        <div key={index}>
          {parse(sec.content)}
        </div>
      )
    } else if (sec.fieldId === "balloon") {
      return (
        <div
          key={index}
          className={`my-8 flex ${
            sec.isLeft ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <div className="w-[15%] min-w-[60px] max-w-[80px] text-center">
            <div className="aspect-square overflow-hidden rounded-full border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sec.image?.url}
                alt={sec.name}
                width={100}
                height={100}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-white">
              {sec.name}
            </span>
          </div>
          <div
            className={`${
              sec.isLeft ? "balloon-left ml-6" : "balloon-right mr-6"
            }  h-full max-w-[65%]`}
          >
            <div className="prose tracking-wider dark:prose-p:text-white dark:prose-strong:text-white">
              {parse(sec.text)}
            </div>
          </div>
        </div>
      )
    } else if (sec.fieldId === "memo") {
      return (
        <div
          key={index}
          className="point my-8 rounded bg-orange-100 p-4 dark:bg-orange-600"
        >
          <div className="flex items-center space-x-2">
            <HiPencilSquare className="h-8 w-8 rounded-full bg-orange-400 p-1 text-white dark:bg-white dark:text-orange-600" />
            <span className="text-xl font-bold tracking-wider text-orange-400 dark:text-white">
              メモ
            </span>
          </div>
          {parse(sec.memo)}
        </div>
      )
    } else if (sec.fieldId === "warning") {
      return (
        <div
          key={index}
          className="point my-8 rounded bg-red-100 p-4 dark:bg-red-600"
        >
          <div className="flex items-center space-x-2">
            <BsExclamationLg className="h-8 w-8 rounded-full bg-red-400 p-1 text-white dark:bg-white dark:text-red-600" />
            <span className="text-xl font-bold tracking-wider text-red-400 dark:text-white">
              注意
            </span>
          </div>
          {parse(sec.warning)}
        </div>
      )
    } else {
      return null
    }
  })

  return (
    <>
      <div>
        <ul className="flex items-center space-x-1 py-4 text-sm tracking-wider text-gray-500 dark:text-white">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-1 hover:underline"
            >
              <HiHome className="h-4 w-4" />
              <span>ホーム</span>
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <HiChevronRight className="h-5 w-5" />
            <Link
              href={`/category/${post.category.id}`}
              className="hover:underline"
            >
              {post.category.name}
            </Link>
          </li>
          <li className="flex items-center">
            <HiChevronRight className="h-5 w-5" />
            <span>{limitTitle}</span>
          </li>
        </ul>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-4 md:gap-x-8">
          <div className="md:col-span-3">
            <div className="rounded bg-white p-4 dark:border dark:border-gray-600 dark:bg-gray-700 sm:p-6 md:p-8">
              <h1 className="text-3xl font-bold tracking-wider dark:text-white">
                {post.title}
              </h1>
              <div className="mt-3 flex items-center space-x-2">
                <span className="flex items-center">
                  <MdQueryBuilder className="mt-[2px] text-gray-400 dark:text-white" />
                  <time className="ml-[2px] text-sm tracking-wider text-gray-400 dark:text-white">
                    {dayjs(post.publishedAt).format("YYYY/MM/DD")}
                  </time>
                </span>
                <span className="flex items-center">
                  <MdRestore className="mt-[2px] text-lg text-gray-400 dark:text-white" />
                  <time className="ml-[2px] text-sm tracking-wider text-gray-400 dark:text-white">
                    {dayjs(post.revisedAt).format("YYYY/MM/DD")}
                  </time>
                </span>
              </div>
              <div className="my-8">
                <Image
                  src={post.eyecatch?.url || "/no_image.webp"}
                  alt={post.title}
                  width={post.eyecatch?.width || 1200}
                  height={post.eyecatch?.height || 630}
                  sizes="(max-width: 991px) 100vw, 75vw"
                />
              </div>
              {post_intro.length > 0 && (
                <div className="my-10">{post_intro}</div>
              )}
              <div className="my-10">
                <TableOfContents toc={toc} />
              </div>
              <div className="rich-editor">{post_body}</div>
            </div>
          </div>
          <div className="md:order-3 md:col-span-3">
            {/* @ts-expect-error Server Component */}
            <RelatedArticle categoryId={post.category.id} postId={post.id} />
          </div>
          <aside className="md:order-2">
            {/* @ts-expect-error Server Component */}
            <PostAside>
              <div className="hidden md:sticky md:top-10 md:mt-6 md:block">
                <HighlightToc toc={toc} />
              </div>
            </PostAside>
          </aside>
          <div className="hidden md:order-4 md:col-span-3 md:block">
            {/* @ts-expect-error Server Component */}
            <Aside />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostPage
