import { FC } from "react"
import { TocH2 } from "types"

type Props = {
  toc: TocH2[]
}

export const TableOfContents: FC<Props> = ({ toc }) => {
  return (
    <div className="rounded border-2 border-primary-color bg-gray-100 dark:border-blue-600 dark:bg-gray-600">
      <div className="flex items-center justify-center bg-primary-color py-2 dark:bg-blue-600">
        <span className="text-lg font-semibold tracking-widest text-white">
          目次
        </span>
      </div>
      <ol className="list-decimal space-y-3 py-4 pl-10 pr-6 font-semibold text-gray-700 marker:text-lg dark:text-white">
        {toc.map((h2, index) => (
          <li key={index}>
            <a
              href={`#${h2.id}`}
              className="cursor-pointer text-lg tracking-wider hover:opacity-70"
            >
              {h2.text}
            </a>
            {h2.h3.length > 0 && (
              <ul className="mt-3 list-disc space-y-3 pl-6 font-medium marker:text-sm">
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
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
