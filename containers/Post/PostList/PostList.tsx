import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect } from "react"
import PostCard from "../components/PostCard/PostCard"
import TagCloud from "../components/TagCloud"
import { POSTS } from "../typeDefs"
import { IPost, PostQuery, PostVars } from "../types"
import * as S from './styled'

type PostListProps = {
  tags: string[]
  SSGposts: IPost
}

export default function PostList({ tags, SSGposts }: PostListProps) {

  const { query: { tag: targetTag } } = useRouter()  //TODO: tags cloud to click

  const [getPosts, { data: postsData }] = useLazyQuery<PostQuery, PostVars>(POSTS, { notifyOnNetworkStatusChange: true })

  function fetchPosts(currPage = 1, tag?: string) {
    getPosts({
      variables: {
        input: {
          page: currPage,
          pageSize: 10,
          tag,
        }
      }
    })
  }

  useEffect(() => {
    fetchPosts(1, targetTag as string)
  }, [targetTag])

  const posts = targetTag ? postsData?.posts : SSGposts

  return (
    <>
      <S.Wrapper>
        <div className="tags">
          <h3>Tags</h3>
          <div className="cloud">
            <TagCloud tags={tags} targetTag={targetTag}/>
          </div>
        </div>

        <div className="posts">
          {posts
            ? (posts.items.map((post, i) => (
              <div className="postsGridItem" key={i}>
                <PostCard post={post} key={i} />
              </div>
            ))
            ) : (
              <div>Loading Post Card...</div>
            )
          }
        </div>
      </S.Wrapper>
    </>
  )
}