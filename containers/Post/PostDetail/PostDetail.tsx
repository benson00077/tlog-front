import { useRef } from 'react'
import * as S from './styled'
import TagsSection from '../components/Tags/TagsSection'
import { IPostItem } from '../types'
import { formatDate } from 'shared/utils'
import MetaHead from 'components/MetaHead/MetaHead'
import TableContent from './TableContent/TableContent'
// markdown
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
/* eslint @typescript-eslint/no-var-requires: "off" */
const remarkSectionize = require('remark-sectionize') // import not work
import { CustomMarkdown } from './CustomMarkdown'

type PostDetailProps = {
  post: IPostItem
}

function PostDetail({ post }: PostDetailProps) {
  const markdownRef = useRef<HTMLDivElement>(null)

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
          <TagsSection tags={tags} noNavBar={true} />
          <S.Date>{formatDate(createdAt)}</S.Date>
        </S.Info>

        <S.Summary>{summary}</S.Summary>

        <S.Markdown ref={markdownRef}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkSectionize]}
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
