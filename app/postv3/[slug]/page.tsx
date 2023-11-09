import React from 'react'
import { getAllPostsMeta, getFileNamefromId, getPostBody, getPostMeta } from '../util'
import dynamic from 'next/dynamic'
import { formatDate } from '../../_utils/utils'
import Image from 'next/image'
import tagsSection from 'app/post/_components/TagsSection'
import { TableContent } from 'app/post/[slug]/_components/TableContent'

// generate route segments
export async function generateStaticParams() {
  const metas = await getAllPostsMeta()
  return metas.map((meta) => ({
    slug: meta.id,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const fileName = await getFileNamefromId(slug)
  const meta = await getPostMeta(`${fileName}.mdx`)
  const content = await getPostBody(`${fileName}.mdx`)
  const { title, updatedAt, description, posterURL, tags } = meta

  const Post = dynamic(() => import(`../(mdx)/${fileName}.mdx`))
  const TagsWithoutIcon = tagsSection().withoutIcon

  if (!Post) return <div>Loading...</div>
  return (
    <>
      <section key={slug} className="grid grid-cols-12">
        <div className="flex flex-col items-center justify-center col-span-10 col-start-2">
          <Image
            alt={title}
            src={posterURL}
            width={900}
            height={550}
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
          <h1 className="my-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            {title}
          </h1>

          <div className="relative flex justify-center w-full">
            <TagsWithoutIcon tags={tags ? tags : ['']} targetTag={['']} baseHref="/postv3" />
            <time className="absolute right-1">{formatDate(updatedAt.toString())}</time>
          </div>

          <blockquote className="p-4 my-4 border-l-4 border-gray-300 rounded bg-gray-50 dark:border-gray-500 dark:bg-gray-700">
            <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{description}</p>
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
          <div className="my-markdown">
            <Post />
          </div>
        </div>
      </section>
    </>
  )
}
