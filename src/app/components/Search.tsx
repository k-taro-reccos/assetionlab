"use client"

import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/navigation"
import { ComponentProps, FC, useState } from "react"
import { HiSearch } from "react-icons/hi"

type Props = {
  header?: boolean
}

export const Search: FC<Props> = ({ header }) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [searchHeaderText, setSearchHeaderText] = useState("")
  const [opened, { open, close }] = useDisclosure(false)

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault()
    if (header) {
      close()
      setSearchHeaderText("")
    } else {
      setSearchText("")
    }
    router.push(`/search?q=${encodeURI(searchText || searchHeaderText)}`)
  }

  return (
    <>
      {header ? (
        <>
          <div
            onClick={open}
            className="flex h-full cursor-pointer items-center px-3 focus:outline-none sm:px-5"
          >
            <HiSearch className="h-7 w-7 text-white" />
          </div>
          <Modal
            opened={opened}
            onClose={close}
            withCloseButton={false}
            size="80%"
            centered
            padding={0}
            radius="md"
          >
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                className="w-full rounded p-4 focus:outline-none"
                autoFocus
                placeholder="検索"
                value={searchHeaderText}
                onChange={(e) => setSearchHeaderText(e.target.value)}
              />
              <button type="submit">
                <HiSearch className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer" />
              </button>
            </form>
          </Modal>
        </>
      ) : (
        <div className="relative z-30 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full rounded p-4 focus:outline-none"
              placeholder="検索"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">
              <HiSearch className="absolute right-2 top-1/2 z-20 h-7 w-7 -translate-y-1/2 cursor-pointer" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
