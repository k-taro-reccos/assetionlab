import { Metadata } from "next"
import { ReactNode } from "react"
import { Noto_Sans_JP } from "next/font/google"
import "../style/globals.css"

const font = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "金融ブログ",
  description: "お金について学ぶ",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${font.className} min-h-screen w-full bg-gray-100`}>
        {children}
      </body>
    </html>
  )
}
