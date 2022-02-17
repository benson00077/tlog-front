import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as S from './styled'
import TagCloud from '../components/TagCloud'
import { IPostItem } from '../types'
import { formatDate } from '../../../shared/utils'

// markdown
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs' // import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015' 



type PostDetailProps = {
  post: IPostItem
}

function PostDetail({ post }: PostDetailProps) {

  const { query: { id }, replace } = useRouter()

  const customMarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atomOneDark}
          customStyle={{ borderRadius: "0.5rem" }}
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
    pre({ node, children, ...props }: any) {
      // Add real code block a className
      // since quote in markdown also paresed as pre > code 
      const codeTagClassName = node.children[0].properties.className
      const match = /language-(\w+)/.exec(codeTagClassName || '') // belike [ "language-js", "js" ] | null
      return (match)
        ? <pre id="codeBlock" className={"columnRight"} {...props}>{children}</pre>
        : <div className={"quote"} ><pre {...props}>{children}</pre></div>
    },
    table({ node, inline, className, children, ...props }: any) {
      return (
        <S.Table className="clearFloat">
          <table {...props}>{children}</table>
        </S.Table>
      )
    },
    h1({ node, children, ...props }: any) { return <h1 className="clearFloat" {...props}>{children}</h1> },
    h2({ node, children, ...props }: any) { return <h2 className="clearFloat" {...props}>{children}</h2> },
    h3({ node, children, ...props }: any) { return <h3 className="clearFloat" {...props}>{children}</h3> },
    h4({ node, children, ...props }: any) { return <h4 className="clearFloat" {...props}>{children}</h4> },
    h5({ node, children, ...props }: any) { return <h5 className="clearFloat" {...props}>{children}</h5> },
    h6({ node, children, ...props }: any) { return <h6 className="clearFloat" {...props}>{children}</h6> },
  }

  useEffect(() => {
    // styling for columnLeft: text , columnRight: code
    const codeBlocks = document.querySelectorAll('#codeBlock')
    codeBlocks.forEach((preTag) => {
      const previouseEle = preTag?.previousElementSibling // mostly <p> or <ul> in my usecase
      previouseEle?.classList.add("columnLeft")
      // NOTICE: seems to be overwrote when ReactMarkdown render its "component" props 
      // and that's why we add className to be columnRight in customMarkdownComponents 
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


  return (
    <>
      {/* TODO: next head component for seo */}
      <S.PostRoot>
        <S.Poster src={posterUrl} alt={title} />
        <S.Title>
          {title}
        </S.Title>

        <S.Info>
          <TagCloud tags={tags} />
          <S.Date>
            {formatDate(createdAt)}
          </S.Date>
        </S.Info>

        <S.Summary>{summary}</S.Summary>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={customMarkdownComponents}
        >
          {content}

        </ReactMarkdown>
      </S.PostRoot>
    </>

  )
}

export default PostDetail