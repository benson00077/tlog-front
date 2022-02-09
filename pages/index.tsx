import { gql } from '@apollo/client'
import type { InferGetServerSidePropsType } from 'next'
import { Layout } from '../containers/Layout/Layout';
import { addApolloState, initializeApollo } from '../graphql/apollo'
import { POSTS } from '../graphql/ssrQuery';

type IndexProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = (props: IndexProps) => {
  console.log(props.data.data)
  return (
    <Layout>
      test
    </Layout>
  )
}

export const getServerSideProps = async () => {

  const apolloClient = initializeApollo({});

  const data = await apolloClient.query({
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
      data
    }
  })
}

export default Home
