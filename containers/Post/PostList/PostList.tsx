'use client'
import { useLazyQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import MetaHead from 'components/MetaHead/MetaHead'
import PostCard from '../components/PostCard/PostCard'
import TagsSection from '../components/Tags/TagsSection'
import { POSTS } from '../typeDefs'
import { IPost, IPostItem, PostQuery, PostVars } from '../types'
import { AnimatePresence, motion } from 'framer-motion'
import PreLoader from 'components/PreLoader/PreLoader'

type PostListProps = {
  tags: string[]
  SSGposts: IPost
}

export function PostList({ tags, SSGposts }: PostListProps) {
  const query = useSearchParams()
  const targetTag = query.get('tag') || ''
  const posts = SSGposts

  return (
    <section className="flex flex-col items-center justify-center">
      <h3 className="pb-8">Tags</h3>
      <TagsSection tags={tags} targetTag={targetTag} noNavBar={false} />

      <h3 className="pb-8">Posts</h3>
      <div className="grid w-5/6 max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
        {posts.items.map((post: IPostItem) => {
          if (!targetTag) return <PostCard post={post} key={post._id} />
          return post.tags.includes(targetTag) ? <PostCard post={post} key={post._id} /> : null
        })}
      </div>
      {/* <AnimatePresence exitBeforeEnter initial={false}>
          {posts ? (
            <motion.div
              initial={{ opacity: 0, x: -200, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 0, y: 0 }}
              transition={{ type: 'linear' }}
              className="posts"
              key={targetTag as string}
            >
              {posts.items.map((post: IPostItem) => (
                <PostCard post={post} key={post._id} />
              ))}
            </motion.div>
          ) : (
            <PreLoader />
          )}
        </AnimatePresence> */}
    </section>
  )
}
