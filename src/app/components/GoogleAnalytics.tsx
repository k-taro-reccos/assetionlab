"use client"

import { GA_MEASUREMENT_ID, pageview } from "libs/gtag"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { Suspense, useEffect } from "react"

const GoogleAnalytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!searchParams) return
    const url = pathname + searchParams.toString()
    pageview(url)
  }, [pathname, searchParams])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
    </>
  )
}

export const Analytics = () => {
  return (
    <>
      {GA_MEASUREMENT_ID && (
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
      )}
    </>
  )
}
