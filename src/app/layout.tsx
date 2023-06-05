import "./globals.css"
import { Noto_Sans_JP } from "next/font/google"
import { ReactNode } from "react"
import { Metadata } from "next"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Wrapper } from "./components/Wrapper"

const font = Noto_Sans_JP()

export const metadata: Metadata = {
  title: "金融ブログ!!!!",
  description: "お金について学ぼう",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={font.className}>
      <body>
        <Wrapper>
          <Header />
          <main className="container mx-auto mt-12 w-full max-w-7xl flex-1 px-3 sm:px-5">
            {children}
          </main>
          <Footer />
        </Wrapper>
      </body>
    </html>
  )
}
