// "use client"

// import { Center, Loader } from "@mantine/core"
// import { useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"
import { Post } from "types"
import { Article } from "./Article"

type Data = {
  contents: Post[]
  totalCount: number
  offset: number
  limit: number
}

const search = async (params: string) => {
  const res = await fetch(
    `https://finance-blog.microcms.io/api/v1/blogs?q=${params}&orders=-publishedAt`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY as string,
      },
    }
  )
  const data: Data = await res.json()
  return data
}

type Props = {
  searchParams: string
}

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SearchResults = async ({ searchParams }: Props) => {
  // const [loading, setLoading] = useState(false)
  // const [searchResults, setSearchResults] = useState<Data>()
  // const searchParams = useSearchParams()
  // const q = searchParams?.get("q")
  const searchResults = await search(searchParams)
  // await sleep(2000)

  // useEffect(() => {
  // window.scrollTo(0, 0)
  //   const getData = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await fetch("/api/search", {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({ q }),
  //       })
  //       const data = await res.json()
  //       setSearchResults(data)
  //     } catch (err: any) {
  //       console.log(err.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   getData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // if (loading) {
  //   return (
  //     <Center>
  //       <Loader size={30} />
  //     </Center>
  //   )
  // }

  if (searchResults?.totalCount === 0) {
    return (
      <p className="text-center text-xl font-bold tracking-wider">
        記事が見つかりませんでした。
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
      {searchResults?.contents.map((content) => (
        <Article key={content.id} post={content} />
      ))}
    </div>
  )
}
