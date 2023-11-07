import { getClient } from 'app/graphql/ApolloClient'
import { GET_POST_BY_ID, POSTS } from 'app/post/typeDefs'
import { GetPostByIdQuery, GetPostByIdVar, PostQuery, PostVars } from 'app/post/types'
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
/* eslint @typescript-eslint/no-var-requires: "off" */
const remarkSectionize = require('remark-sectionize') // import not work

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

async function fetchPost(postId: string) {
  const result = await getClient().query<GetPostByIdQuery, GetPostByIdVar>({
    query: GET_POST_BY_ID,
    variables: {
      id: postId,
    },
  })
  return result.data.getPostById
}

// generate route segments
export async function generateStaticParams() {
  const posts = await fetchAllPosts()
  return posts.items.map((item) => ({
    slug: item._id,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await fetchPost(slug)
  const { content, frontmatter } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkSectionize],
        rehypePlugins: [rehypePrettyCode],
      },
    },
    components: {
      h1: ({ children }) => <h1 style={{ fontSize: '100px' }}>{children}</h1>,
      h2: ({ children }) => <h2 style={{ fontSize: '100px' }}>{children}</h2>,
    },
  })

  // console.log('content', post.content)
  console.log('frontmatter', frontmatter)
  const fm = frontmatter as any

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        {/* <MDXRemote
          source={post.content}
          components={useMDXComponents}
        /> */}
        <div>{fm.title}</div>
        {content}
      </Suspense>
    </>
  )
}
