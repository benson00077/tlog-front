import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Layout } from "../../containers/Layout/Layout";
import PostDetail from "../../containers/Post/PostDetail/PostDetail";
import { GET_POST_BY_ID, POSTS } from "../../containers/Post/typeDefs";
import { GetPostByIdQuery, GetPostByIdVar, PostQuery, PostVars } from "../../containers/Post/types";
import { addApolloState, initializeApollo } from "../../graphql/apollo";

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>;


export default function Post(props: IndexProps) {
  // TODO: pass down to child comp or useQuery in child comp ?
  // console.log(props.post.getPostById)
  return (
    <Layout>
      <PostDetail post={props.post?.getPostById} />
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo({});
  let notFound = false;

  // Error handling ref: https://stackoverflow.com/a/67171798/16124226
  // Error for non-exist query id
  try {
    const { data: post, error } = await apolloClient.query<GetPostByIdQuery, GetPostByIdVar>({
      query: GET_POST_BY_ID,
      variables: {
        id: context?.params?.id as string
      }
    })
    if (error || !post) notFound = true;

    return addApolloState(apolloClient, {
      props: {
        post
      },
      revalidate: 60,
      notFound
    })
  } catch {
    notFound = true
    return { notFound }
  } 
}


export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo({});

  // TODO: getAllIds from backend gql
  const { data: { posts: posts } } = await apolloClient.query<PostQuery, PostVars>({
    query: POSTS,
    variables: {
      input: {
        page: 1,
        pageSize: 10,
      }
    },
  })

  const paths = posts.items.map(post => (
    { params: { id: post._id } }
  ))

  return {
    paths,
    fallback: 'blocking',
  }
}