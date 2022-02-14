import { Layout } from "../../containers/Layout/Layout";
import PostList from "../../containers/Post/PostList/PostList";
import { addApolloState, initializeApollo } from "../../graphql/apollo";
import { POSTS, GET_ALL_TAGS } from "../../containers/Post/typeDefs"
import { GetAllTagsQuery, IPost, PostQuery, PostVars } from "../../containers/Post/types"
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";


// type IndexProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type IndexProps = InferGetStaticPropsType<typeof getStaticProps>;


export default function Posts(props: IndexProps) {
  const { posts, tags } = props

  return (
    <Layout>
      <PostList SSGposts={posts} tags={tags.tags}/>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo({});

  const { data: { getAllTags: tags } } = await apolloClient.query<GetAllTagsQuery>({
    query: GET_ALL_TAGS,
  })

  const { data: { posts: posts } } = await apolloClient.query<PostQuery, PostVars>({
    query: POSTS,
    variables: {
      input: {
        page: 1,
        pageSize: 10,
      }
    }
  })

  return addApolloState(apolloClient, {
    props: {
      posts,
      tags,
    },
    revalidate: 60,
  })
}
