import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import * as S from './styled'
import TagCloud from '../components/TagCloud'
import { IPostItem } from '../types'
import { formatDate } from '../../../shared/utils'
import { navHeightInt } from '../../../styled/position'

// markdown
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { CustomMarkdown } from './CustomMarkdown'
import { setupTocbot } from './utils'
import MetaHead from '../../../components/MetaHead/MetaHead'



type PostDetailProps = {
  post: IPostItem
}

function PostDetail({ post }: PostDetailProps) {

  const { query: { id }, replace } = useRouter()
  const markdownRef = useRef<HTMLDivElement>(null)
  const tocRef = useRef<HTMLDivElement>(null)

  /**
   *  Layout UI: 
   *          columnLeft (text) <-> columnRight (code)
   *          languageLeft (text) <-> languageRight (text)
   *  Notice: 
   *          <ReactMarkdown> overwrite in the end,
   *          don't add classList columnRight and languageLeft here
   */
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('#codeBlock')
    const foreignLanBlocks = document.querySelectorAll('#foreignLanguageBlock')

    codeBlocks.forEach((codeBlock) => {
      const previouseEle = codeBlock?.previousElementSibling // mostly <p> or <ul> in my usecase
      if (previouseEle?.tagName === 'P') {
        // Filter out h1~h6, table , ul, li. Do not Paraleel then w/ code block
        previouseEle?.classList.add("columnLeft")
      } else {
        // Notice: this intentedly overide .cloumnRight css width and make float:left not work
        // @ts-ignore
        codeBlock.style.width = "100%";
      }
    })

    foreignLanBlocks.forEach((foreignLanBlock) => {
      const previouseEle = foreignLanBlock?.previousElementSibling
      if (previouseEle && !previouseEle.classList.contains("languageRight")) {
        previouseEle?.classList.add("languageLeft")
      }
    })

  }, [])

  /**
   *  Table of Contents
   *  NOTICE: 
   *          UI break after switch theme.
   *          set window.localStorage.theme as dep, as temp workaround
   */
  useEffect(() => {
    setupTocbot()
  }, [post, globalThis?.localStorage?.theme])

  /**
   *  Table of Contents
   *          inject style for child node posn sticky. as temp workaround 
   *  NOTICE: 
   *          work when positoin: absolute on S.Toc
   */
  useEffect(() => {
    const [markdown, toc] = [markdownRef.current, tocRef.current]
    if (toc && markdown) {
      // markdown.offsetParent = S.PostRoot
      const tocStyle = `
        height: ${markdown.getBoundingClientRect().height}px;
        top: ${markdown.offsetTop + navHeightInt}px
      ` // 3rem 
        // top: ${markdown.offsetTop}px
        // 1268 . 1307.59999
      toc.setAttribute("style", tocStyle)
    }
  }, [globalThis?.localStorage?.theme, markdownRef.current, tocRef.current])


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
      <MetaHead title={`${title} - Benson Tuan`} description={summary} />

      <S.Toc ref={tocRef}>
        <div>
          <aside className="tableOfContents"></aside>
        </div>
      </S.Toc>

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

        <S.Markdown ref={markdownRef}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={CustomMarkdown()}
            className="postContentByToc"
          >
            {content}
          </ReactMarkdown>
          {/*  popup  */}
        </S.Markdown>

      </S.PostRoot>
    </>

  )
}

export default PostDetail