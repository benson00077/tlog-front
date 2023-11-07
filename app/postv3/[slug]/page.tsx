import React from 'react'
import { getAllPostsMeta, getPageData } from './util'
import dynamic from 'next/dynamic'
import { formatDate } from '../../_utils/utils'
import Image from 'next/image'

// generate route segments
export async function generateStaticParams() {
  const metas = await getAllPostsMeta()
  return metas.map((meta) => ({
    //TODO: 改成走ID？
    slug: meta.fileName,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const meta = await getPageData(`${slug}.mdx`)
  const { title, updatedAt, description, posterURL } = meta
  const Post = dynamic(() => import(`../(mdx)/${slug}.mdx`))

  if (!Post) return <div>Loading...</div>
  return (
    <div key={slug}>
      <h1>{title}</h1>
      <Image
        alt={title}
        src={posterURL}
        width={900}
        height={550}
        style={{ objectFit: 'cover' }}
        className="rounded-lg"
      />
      <time>{formatDate(updatedAt.toString())}</time>
      <blockquote>{description}</blockquote>
      <Post />
    </div>
  )
}
