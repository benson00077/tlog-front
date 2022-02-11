import { ApolloError, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_POST_BY_ID } from '../typeDefs'
import { GetPostByIdQuery, GetPostByIdVar } from '../types'


function PostDetail() {

  const { query: { id }, replace } = useRouter()
  const { data: post } = useQuery<GetPostByIdQuery, GetPostByIdVar>(
    GET_POST_BY_ID,
    {
      notifyOnNetworkStatusChange: true,
      variables: { id: id as string }, 
      onCompleted: () => {}, // TODO: table of content
      onError: (e: ApolloError) => {
        // TODO: maybe useLazyquery + useQuery is better ?
        // Ignore the bad request error (useQuery variables not provided well)
        // which is resulted from id = undefined when first render bc useRouter is async
        if (e.message === "Post not found") replace('/404')
      }
    }
  )

  if (!post) return <div> .... Fetching data..... skeleton component to be added</div>

  const {
    getPostById: {
      title,
      posterUrl,
      summary,
      tags,
      content,
      createdAt,
      lastModifiedDate,
      pv,
      like,
      prev,
      next,
    },
  } = post

  return (
    <>
      <div>{post.getPostById.title}</div>
      <div>{post.getPostById.content}</div>
    </>

  )
}

export default PostDetail