import "./globals.css"
import { Noto_Sans_JP } from "next/font/google"
import { ReactNode } from "react"
import { Metadata } from "next"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Wrapper } from "./components/Wrapper"
import { Analytics } from "./components/GoogleAnalytics"

const font = Noto_Sans_JP({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | 資産形成ラボ",
    default: "資産形成ラボ",
  },
  description:
    "お金についての情報を発信中。NISAやiDeCo、税金などむずかしい言葉が多くなかなか勉強、行動する気にならないという方に向けてわかりやすく解説しています。",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={font.className}>
      <head>
        <Analytics />
      </head>
      <body>
        <Wrapper>
          <Header />
          <main className="container mx-auto mt-12 w-full max-w-7xl flex-1 px-3 sm:px-6 md:mt-14 md:px-8">
            {children}
          </main>
          <Footer />
        </Wrapper>
      </body>
    </html>
  )
}
