import { PostList } from 'app/post/PostList'
import BackToTopBtn from 'app/_components/BackToTopBtn/BackToTopBtn'
import { addApolloState, initializeApollo } from 'app/graphql/apollo'
import { POSTS, GET_ALL_TAGS } from 'app/post/typeDefs'
import { GetAllTagsQuery, PostQuery, PostVars } from 'app/post/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ApolloError } from '@apollo/client'
import Error from 'next/error'
import { getClient } from 'app/graphql/ApolloClient'

async function fetchAllTags() {
  const { data } = await getClient().query<GetAllTagsQuery>({
    query: GET_ALL_TAGS,
  })
  return data.getAllTags
}
async function fetchAllPosts() {
  const { data } = await getClient().query<PostQuery, PostVars>({
    query: POSTS,
    variables: {
      input: {
        page: 1,
        pageSize: 10,
      },
    },
  })
  return data.posts
}
export default async function Page() {
  const posts = await fetchAllPosts()
  const tags = await fetchAllTags()

  return (
    <>
      <PostList SSGposts={posts} tags={tags ? tags.tags : []} />
      <BackToTopBtn />
    </>
  )
}
