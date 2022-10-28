import PostList from 'containers/Post/PostList/PostList'
import BackToTopBtn from 'components/BackToTopBtn/BackToTopBtn'
import { addApolloState, initializeApollo } from 'graphql/apollo'
import { POSTS, GET_ALL_TAGS } from 'containers/Post/typeDefs'
import { GetAllTagsQuery, PostQuery, PostVars } from 'containers/Post/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ApolloError } from '@apollo/client'
import Error from 'next/error'
import PageTransition from 'components/PageTransition/PageTransition'

// type IndexProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Posts(props: IndexProps) {
  // TODO: what happened when  production mode ? page/500.tsx or this com?
  if (props.error) {
    const error: ApolloError = JSON.parse(props?.error)
    if (error.networkError) {
      return <Error statusCode={503} message="Database is down" />
    }
  }

  const { posts, tags } = props

  return (
    <PageTransition>
      <>
        <PostList SSGposts={posts} tags={tags ? tags.tags : []} />
        <BackToTopBtn />
      </>
    </PageTransition>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  try {
    const {
      data: { getAllTags: tags },
    } = await apolloClient.query<GetAllTagsQuery>({
      query: GET_ALL_TAGS,
    })

    const {
      data: { posts: posts },
    } = await apolloClient.query<PostQuery, PostVars>({
      query: POSTS,
      variables: {
        input: {
          page: 1,
          pageSize: 10,
        },
      },
    })

    return addApolloState(apolloClient, {
      props: {
        posts,
        tags,
      },
      revalidate: 60,
    })
  } catch (err) {
    const error = JSON.stringify(err)
    return {
      props: {
        error,
      },
    }
  }
}
