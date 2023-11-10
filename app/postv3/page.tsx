import { PostList } from './PostList'
import { getAllPostsMeta } from './util'

export default async function Page() {
  const metas = await getAllPostsMeta()

  return (
    <>
      <PostList metas={metas} selectedTag="" />
    </>
  )
}
