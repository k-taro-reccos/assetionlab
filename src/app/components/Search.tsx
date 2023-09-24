"use client"

import { useRouter } from "next/navigation"
import { ComponentProps, FC, useState } from "react"
import { HiSearch } from "react-icons/hi"
import * as Dialog from "@radix-ui/react-dialog"

type Props = {
  header?: boolean
}

export const Search: FC<Props> = ({ header }) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [searchHeaderText, setSearchHeaderText] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURI(searchText || searchHeaderText)}`)
    if (header) {
      setOpen(false)
      setSearchHeaderText("")
    } else {
      setSearchText("")
    }
  }

  return (
    <>
      {header ? (
        <>
          <Dialog.Root open={open} onOpenChange={() => setOpen(true)}>
            <Dialog.Trigger asChild>
              <div className="flex h-full cursor-pointer items-center focus:outline-none">
                <HiSearch className="text-2xl text-gray-800 dark:text-white" />
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay
                className="fixed inset-0 z-40 bg-black opacity-40 data-[state=open]:animate-overlayShow"
                onClick={() => setOpen(false)}
              />
              <Dialog.Content
                className="fixed left-[50%] top-[50%] z-50 w-[90vw]
              max-w-[70%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-1 focus:outline-none data-[state=open]:animate-contentShow"
              >
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    className="w-full rounded p-4 focus:outline-none"
                    placeholder="検索"
                    value={searchHeaderText}
                    onChange={(e) => setSearchHeaderText(e.target.value)}
                  />
                  <button type="submit">
                    <HiSearch className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer" />
                  </button>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      ) : (
        <div className="relative z-10 rounded">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full rounded p-4 focus:outline-none dark:border dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
              placeholder="検索"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">
              <HiSearch className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl dark:text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
