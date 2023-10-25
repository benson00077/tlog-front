import { useRef } from 'react'
import tagsSection from '../../_components/TagsSection'
import { IPostItem } from '../../types'
import { formatDate } from 'app/_utils/utils'
import Image from 'next/image'
import { TableContent } from './TableContent'
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
  // const markdownRef = useRef<HTMLDivElement>(null)

  const { title, posterUrl, summary, tags, content, createdAt, lastModifiedDate, pv, like, prev, next } = post
  const TagsSection = tagsSection()

  return (
    <>
      <section className="grid grid-cols-12">
        <div className="flex flex-col items-center justify-center col-span-10 col-start-2">
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
        </div>
      </section>

      <section className="grid grid-cols-12">
        <aside className="sticky h-0 col-span-2 col-start-11 top-12">
          <div className="mt-10 ml-4">
            <TableContent markdownContent={content} />
          </div>
        </aside>

        <div className="w-full col-span-8 col-start-3">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkSectionize]}
            rehypePlugins={[rehypeRaw]}
            components={CustomMarkdown()}
            className={`my-markdown`}
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
