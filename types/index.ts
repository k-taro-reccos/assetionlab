import { MicroCMSImage } from "microcms-js-sdk"

export type Post = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  description: string
  eyecatch: MicroCMSImage
  category: {
    id: string
    createAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    name: string
  }
  intro: (Intro | Balloon)[]
  body: (Section | Balloon | Memo | Warning)[]
}

export type Category = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

// 見出し３
export type TocH3 = {
  id: string
  text: string // 見出しテキストs
}

// 見出し２
export type TocH2 = {
  id: string
  text: string // 見出しテキスト
  h3: TocH3[] // 見出し３の配列
}

type Balloon = {
  fieldId: "balloon"
  name: string
  image: MicroCMSImage
  isLeft: boolean
  text: string
}

type Intro = {
  fieldId: "intro"
  intro: string
}

type Section = {
  fieldId: "section"
  content: string
  title: string
}

type Memo = {
  fieldId: "memo"
  memo: string
}

type Warning = {
  fieldId: "warning"
  warning: string
}