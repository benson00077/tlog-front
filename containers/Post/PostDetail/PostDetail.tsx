'use client'

import { useRef } from 'react'
import tagsSection from '../components/Tags/TagsSection'
import { IPostItem } from '../types'
import { formatDate } from 'shared/utils'
import Image from 'next/image'
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
  const TagsSection = tagsSection()

  return (
    <>
      {/* <TableContent deps={{ post, markdownRef }} /> */}

      <section className="flex flex-col items-center justify-center w-5/6 pl-[17%]">
        <Image
          src={posterUrl}
          alt={title}
          width={900}
          height={550}
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
        <h1 className="my-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h1>

        <div className="relative flex justify-center w-full">
          <TagsSection.withoutIcon tags={tags} targetTag={['']} />
          <time className="absolute right-1">{formatDate(createdAt)}</time>
        </div>

        <blockquote className="p-4 my-4 border-l-4 border-gray-300 rounded bg-gray-50 dark:border-gray-500 dark:bg-gray-700">
          <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{summary}</p>
        </blockquote>

        <div ref={markdownRef} className="w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkSectionize]}
            rehypePlugins={[rehypeRaw]}
            components={CustomMarkdown()}
            className={`postContentByToc my-markdown`}
          >
            {content}
          </ReactMarkdown>
          {/*  popup  */}
        </div>
      </section>
    </>
  )
}

export default PostDetail
