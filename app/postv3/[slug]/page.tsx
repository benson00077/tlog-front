import React from 'react'
import { getAllPostsMeta, getFileNamefromId, getPageData } from '../util'
import dynamic from 'next/dynamic'
import { formatDate } from '../../_utils/utils'
import Image from 'next/image'

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
  const meta = await getPageData(`${fileName}.mdx`)
  const { title, updatedAt, description, posterURL } = meta
  const Post = dynamic(() => import(`../(mdx)/${fileName}.mdx`))

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
