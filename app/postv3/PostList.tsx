import PostCard from '../post/_components/PostCard'
import tagsSection from '../post/_components/TagsSection'
import { IPostItem } from '../post/types'
import { MetaData } from './util'

type PostListProps = {
  metas: MetaData[]
  selectedTag: string //useSearchParams should extraced as other client component
}

export function PostList({ metas, selectedTag }: PostListProps) {
  const targetTag = ''

  const { withIcon: TagsWithIcon, withoutIcon: TagsWithoutIcon } = tagsSection()
  const adaptor = (metas: MetaData[]) => {
    return metas.map(
      (meta) =>
        ({
          ...meta,
          _id: meta.id,
          summary: meta.description,
          posterUrl: meta.posterURL,
          lastModifiedDate: meta.updatedAt.toString(),
          content: '',
          like: 0,
          pv: 0,
          isPublic: true,
          createdAt: meta.createdAt.toString(),
          updatedAt: meta.updatedAt.toString(),
          prev: null,
          next: null,
        } as IPostItem),
    )
  }
  const posts = adaptor(metas)
  const tags = metas.map((meta) => (meta.tags ? meta.tags : []))

  return (
    <section className="flex flex-col items-center justify-center">
      <h3 className="pb-8">Tags</h3>
      <section className="w-1/2">
        <TagsWithoutIcon tags={tags[0]} targetTag={targetTag} baseHref="/postv3" />
      </section>
      <section className="flex flex-row flex-wrap justify-around w-1/2 mt-8 bg-slate-600/30 mb-28">
        <TagsWithIcon baseHref="/postv3" />
      </section>

      <h3 className="pb-8">Posts</h3>
      <div className="grid w-5/6 max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
        {posts.map((post) => {
          if (!targetTag) return <PostCard post={post} key={post._id} href={`/postv3/${post._id}`} />
          return post.tags.includes(targetTag) ? (
            <PostCard post={post} key={post._id} href={`/postv3/${post._id}`} />
          ) : null
        })}
      </div>
    </section>
  )
}
