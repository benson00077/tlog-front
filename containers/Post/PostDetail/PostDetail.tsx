import { useCallback, useEffect, useRef } from 'react'
import * as S from './styled'
import TagCloud from '../components/TagCloud'
import { IPostItem } from '../types'
import { formatDate } from '../../../shared/utils'

// markdown
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { CustomMarkdown } from './CustomMarkdown'
import MetaHead from '../../../components/MetaHead/MetaHead'
import TableContent from './TableContent'

type PostDetailProps = {
  post: IPostItem
}

function PostDetail({ post }: PostDetailProps) {
  const markdownRef = useRef<HTMLDivElement>(null)
  const tocRef = useRef<HTMLDivElement>(null)

  /**
   *  Layout UI:
   *          columnLeft (text) <-> columnRight (code)
   *          languageLeft (text) <-> languageRight (text)
   *  Notice:
   *          <ReactMarkdown> overwrite in the end,
   *          don't add classList columnRight and languageLeft here.
   *          OR, workaround is set UseEffect w/o dependency. Work as componentDidMount
   */
  const dirtyLayoutAdjust = useCallback(() => {
    const codeBlocks = document.querySelectorAll('#codeBlock')
    const foreignLanBlocks = document.querySelectorAll('#foreignLanguageBlock')

    codeBlocks.forEach((codeBlock) => {
      const previouseEle = codeBlock?.previousElementSibling // mostly <p> or <ul> in my usecase

      if (previouseEle?.tagName === 'P') {
        // Filter out h1~h6, table , ul, li. Do not Paraleel then w/ code block
        previouseEle?.classList.add('columnLeft')
      } else {
        // Notice: this intentedly overide .cloumnRight css width and make float:left not work
        codeBlock.setAttribute('style', 'width: 100%;')
      }
    })

    foreignLanBlocks.forEach((foreignLanBlock) => {
      const previouseEle = foreignLanBlock?.previousElementSibling
      if (previouseEle && !previouseEle.classList.contains('languageRight')) {
        previouseEle?.classList.add('languageLeft')
      }
    })
  }, [post])

  useEffect(() => {
    dirtyLayoutAdjust()
  })

  if (!post) return <div> .... Fetching data..... skeleton component to be added</div>

  const { title, posterUrl, summary, tags, content, createdAt, lastModifiedDate, pv, like, prev, next } = post

  return (
    <>
      <MetaHead title={`${title} - Benson Tuan`} description={summary} />

      <TableContent deps={{ post, markdownRef }} />

      <S.PostRoot>
        <S.Poster src={posterUrl} alt={title} />
        <S.Title>{title}</S.Title>

        <S.Info>
          <TagCloud tags={tags} />
          <S.Date>{formatDate(createdAt)}</S.Date>
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
