import { FC } from "react"
import { TocH2 } from "types"

type Props = {
  toc: TocH2[]
}

export const TableOfContents: FC<Props> = ({ toc }) => {
  return (
    <ol className="list-inside list-decimal space-y-3 px-6 py-4 font-semibold text-gray-700 marker:text-lg">
      {toc.map((h2, index) => (
        <li key={index}>
          <a
            href={`#${h2.id}`}
            className="cursor-pointer text-lg tracking-wider hover:opacity-70"
          >
            {h2.text}
          </a>
          <ul className="mt-3 list-inside list-disc space-y-3 pl-6 font-medium marker:text-sm">
            {h2.h3.map((h3, index) => (
              <li key={index}>
                <a
                  href={`#${h3.id}`}
                  className="cursor-pointer tracking-wider
                  hover:opacity-70"
                >
                  {h3.text}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
