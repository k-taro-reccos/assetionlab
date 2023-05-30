import { FC } from "react"
import { TocH2 } from "types"

type Props = {
  toc: TocH2[]
}

export const TableOfContents: FC<Props> = ({ toc }) => {
  return (
    <div className="rounded border-2 border-primary-color bg-gray-100">
      <div className="flex items-center justify-center bg-primary-color py-2">
        <span className="text-lg font-semibold tracking-widest text-white">
          目次
        </span>
      </div>
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
    </div>
  )
}
