import { useEffect } from 'react'
import { ApolloError, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_POST_BY_ID } from '../typeDefs'
import * as S from './styled'
import TagCloud from '../components/TagCloud'
import { IPostItem } from '../types'

// markdown
import { GetPostByIdQuery, GetPostByIdVar } from '../types'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs' // import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015' 
import { formatDate } from '../../../shared/utils'



type PostDetailProps = {
  post: IPostItem
}

function PostDetail({ post } : PostDetailProps) {

  const { query: { id }, replace } = useRouter()
  // const { data: post } = useQuery<GetPostByIdQuery, GetPostByIdVar>(
  //   GET_POST_BY_ID,
  //   {
  //     notifyOnNetworkStatusChange: true,
  //     variables: { id: id as string },
  //     onCompleted: () => { }, // TODO: table of content
  //     onError: (e: ApolloError) => {
  //       // TODO: maybe useLazyquery + useQuery is better ? or just passed down from ssg props?
  //       // Ignore the bad request error (useQuery variables not provided well)
  //       // which is resulted from id = undefined when first render bc useRouter is async
  //       // if (e.message === "Post not found") replace('/404')
  //       if (e.message) console.error(e.message)
  //     }
  //   }
  // )

  const customMarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atomOneDark}
          showLineNumbers={false}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    pre({ node, ...props }: any) {
      // Add real code block a className
      // since quote in markdown also paresed as pre > code 
      const codeTagClassName = node.children[0].properties.className
      const match = /language-(\w+)/.exec(codeTagClassName || '') // belike [ "language-js", "js" ] | null
      return (match)
        ? <pre id="clodeBlock" {...props}></pre>
        : <pre {...props}></pre>
    },
  }



  useEffect(() => {
    // styling for columnLeft: text , columnRight: code
    const codeBlocks = document.querySelectorAll('#clodeBlock')
    codeBlocks.forEach((preTag) => {
      const previouseTag = preTag?.previousElementSibling // mostly <p> or <ul> in my usecase
      previouseTag?.classList.add("columnLeft")
      preTag.classList.add("columnRight")
    })
  }, [])




  if (!post) return <div> .... Fetching data..... skeleton component to be added</div>

  const {
    title,
      posterUrl,
      summary,
      tags,
      content,
      createdAt,
      lastModifiedDate,
      pv,
      like,
      prev,
      next,
  } = post
  // const {
  //   getPostById: {
  //     title,
  //     posterUrl,
  //     summary,
  //     tags,
  //     content,
  //     createdAt,
  //     lastModifiedDate,
  //     pv,
  //     like,
  //     prev,
  //     next,
  //   },
  // } = post

  return (
    <>
      {/* TODO: next head component for seo */}
      <S.PostRoot>
        <S.Poster src={posterUrl} alt={title} />
        <S.Title>{title}</S.Title>

        <S.Info>
          <S.Date>
            {formatDate(createdAt)}
          </S.Date>
          <TagCloud tags={tags} />
        </S.Info>

        <S.Summary>{summary}</S.Summary>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={customMarkdownComponents}
        >
          {content}

        </ReactMarkdown>
      </S.PostRoot>
    </>

  )
}

export default PostDetail