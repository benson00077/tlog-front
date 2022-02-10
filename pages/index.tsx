import type { InferGetServerSidePropsType } from 'next'
import { Home } from '../containers/Home/Home';
import { Layout } from '../containers/Layout/Layout';
import { addApolloState, initializeApollo } from '../graphql/apollo'
import { POSTS } from '../graphql/ssrQuery';

type IndexProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Index = (props: IndexProps) => {
  console.log(props.posts)
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export const getServerSideProps = async () => {

  const apolloClient = initializeApollo({});

  const { data: { getPosts: posts } = {} } = await apolloClient.query({
    query: POSTS,
    variables: {
      input: {
        page: 1,
        pageSize: 10
      }
    }
  })

  return addApolloState(apolloClient, {
    props: {
      posts
    }
  })
}

export default Index
