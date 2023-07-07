export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (!GA_MEASUREMENT_ID) return // GA_TRACKING_ID が設定されていない場合は、処理しない
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
