import BackToTopBtn from 'components/BackToTopBtn/BackToTopBtn'
import PostDetail from 'containers/Post/PostDetail/PostDetail'
import { GET_POST_BY_ID } from 'containers/Post/typeDefs'
import { GetPostByIdQuery, GetPostByIdVar } from 'containers/Post/types'
import { getClient } from 'graphql/ApolloClient'

async function fetchPost(postId: string) {
  const result = await getClient().query<GetPostByIdQuery, GetPostByIdVar>({
    query: GET_POST_BY_ID,
    variables: {
      id: postId,
    },
  })
  return result.data.getPostById
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)
  return (
    <>
      <PostDetail post={post} />
      <BackToTopBtn />
    </>
  )
}
