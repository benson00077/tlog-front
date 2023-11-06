import React from 'react'
import Post, { meta } from './mdx/page.mdx'

//ref: https://github.com/vercel/next.js/issues/50734
export default function Page() {
  return (
    <>
      <h1> {meta.title}</h1>
      <blockquote>{meta.description}</blockquote>
      <Post></Post>
    </>
  )
}
