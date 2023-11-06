import React from 'react'
import { getAllPostsMeta, getPageData } from './util'
import dynamic from 'next/dynamic'

// generate route segments
export async function generateStaticParams() {
  const metas = await getAllPostsMeta()
  return metas
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { meta } = await getPageData(`${slug}.mdx`)
  const { title, date, description } = meta
  const Post = dynamic(() => import(`../(mdx)/${slug}.mdx`))

  if (!Post) return <div>Loading...</div>
  return (
    <div key={slug}>
      <h1>{title}</h1>
      <time>{date}</time>
      <blockquote>{description}</blockquote>
      <Post />
    </div>
  )
}
