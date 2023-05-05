import { FC } from "react"

export const Loading: FC = () => {
  return (
    <div className="flex justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
    </div>
  )
}
