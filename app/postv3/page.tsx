import { PostList } from './PostList'
import BackToTopBtn from 'app/_components/BackToTopBtn/BackToTopBtn'
import { getAllPostsMeta } from './util'

export default async function Page() {
  const metas = await getAllPostsMeta()

  return (
    <>
      <PostList metas={metas} selectedTag="" />
      <BackToTopBtn />
    </>
  )
}
