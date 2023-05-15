// import { client } from "libs/client"
import { Articles } from "./components/Articles"
import { Aside } from "./components/Aside"
import { CategoryList } from "./components/CategoryList"

const Home = () => {
  return (
    <>
      <div className="mt-8">
        {/* @ts-expect-error Server Component */}
        <CategoryList />
      </div>
      <div className="mt-12 md:flex">
        <div className="md:flex-1">
          <div className="text-center">
            <span className="section-title">新着記事</span>
          </div>
          <div className="mt-8">
            {/* @ts-expect-error Server Component */}
            <Articles />
          </div>
        </div>
        <aside className="mt-12 md:ml-8 md:mt-0 md:w-1/4">
          {/* @ts-expect-error Server Component */}
          <Aside />
        </aside>
      </div>
    </>
  )
}

export default Home
