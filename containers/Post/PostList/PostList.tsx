import { useLazyQuery, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect } from "react"
import PostCard from "../components/PostCard/PostCard"
import TagCloud from "../components/TagCloud"
import { POSTS, GET_ALL_TAGS } from "../typeDefs"
import { GetAllTagsQuery, PostQuery, PostVars } from "../types"
import * as S from './styled'


export default function PostList() {

  const { query: { tag: targetTag } } = useRouter()  //TODO: tags cloud to click

  const [getPosts, { data: postsData }] = useLazyQuery<PostQuery, PostVars>(POSTS, { notifyOnNetworkStatusChange: true })
  const { data: tagsData } = useQuery<GetAllTagsQuery>(GET_ALL_TAGS, { notifyOnNetworkStatusChange: true })

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

  return (
    <>
      <S.Wrapper>
        {postsData
          ? (
            postsData.posts.items.map((post, i) => (
              <PostCard post={post} key={i} />
            ))
          ) : (
            <div>Loading Post Card...</div>
          )
        }

        <div>
          <TagCloud tags={tagsData ? tagsData.getAllTags.tags : []} />
        </div>
      </S.Wrapper>
    </>
  )
}