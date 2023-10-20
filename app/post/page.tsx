import { PostList } from 'containers/Post/PostList/PostList'
import BackToTopBtn from 'components/BackToTopBtn/BackToTopBtn'
import { addApolloState, initializeApollo } from 'graphql/apollo'
import { POSTS, GET_ALL_TAGS } from 'containers/Post/typeDefs'
import { GetAllTagsQuery, PostQuery, PostVars } from 'containers/Post/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ApolloError } from '@apollo/client'
import Error from 'next/error'
import PageTransition from 'components/PageTransition/PageTransition'
import { getClient } from 'graphql/ApolloClient'

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
    // <PageTransition>
    <>
      <PostList SSGposts={posts} tags={tags ? tags.tags : []} />
      <BackToTopBtn />
    </>
    // {/* </PageTransition> */}
  )
}
