import { gql } from '@apollo/client'
import type { InferGetServerSidePropsType } from 'next'
import { addApolloState, initializeApollo } from '../graphql/apollo'
import { POSTS } from '../graphql/ssrQuery';

type IndexProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = (props: IndexProps) => {
  console.log(props)
  return (
    <div >
      test
    </div>
  )
}

export const getServerSideProps = async () => {

  const apolloClient = initializeApollo({});

  const result = await apolloClient.query({
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
      result
    }
  })
}

export default Home
