import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MetaHead from 'components/MetaHead/MetaHead'
import PostCard from 'components/PostCard/PostCard'
import TagsSection from 'components/Tags/TagsSection'
import { POSTS } from '../typeDefs'
import { IPost, IPostItem, PostQuery, PostVars } from '../types'
import * as S from './styled'
import { AnimatePresence, motion } from 'framer-motion'
import PreLoader from 'components/PreLoader/PreLoader'

type PostListProps = {
  tags: string[]
  SSGposts: IPost
}

export default function PostList({ tags, SSGposts }: PostListProps) {
  const {
    query: { tag: targetTag },
  } = useRouter()

  const [getPosts, { data: postsData }] = useLazyQuery<PostQuery, PostVars>(POSTS, {
    notifyOnNetworkStatusChange: true,
  })

  function fetchPosts(currPage = 1, tag?: string) {
    getPosts({
      variables: {
        input: {
          page: currPage,
          pageSize: 10,
          tag,
        },
      },
    })
  }

  useEffect(() => {
    fetchPosts(1, targetTag as string)
  }, [targetTag])

  const posts = targetTag ? postsData?.posts : SSGposts

  return (
    <>
      <MetaHead title="Blog - Benson" description="I share anything that may help others, and technologies I'm using" />

      <S.Wrapper>
        <h3>Tags</h3>
        <TagsSection tags={tags} targetTag={targetTag} noNavBar={false} />

        <h3>Posts</h3>
        <AnimatePresence exitBeforeEnter initial={false}>
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
        </AnimatePresence>
      </S.Wrapper>
    </>
  )
}
