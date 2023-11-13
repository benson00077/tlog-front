import BackToTopBtn from 'app/_components/BackToTopBtn/BackToTopBtn'
import PostDetail from 'app/post/[slug]/_components/PostDetail'
import { GET_POST_BY_ID } from 'app/post/typeDefs'
import { GetPostByIdQuery, GetPostByIdVar } from 'app/post/types'
import { getClient } from 'app/graphql/ApolloClient'
import { fetchAllPosts } from '../page'

// generate route segments
export async function generateStaticParams() {
  const posts = await fetchAllPosts()
  return [
    {
      slug: posts.items[0]._id,
    },
  ]
  // return posts.items.map((item) => ({
  //   slug: item._id,
  // }))
}

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
