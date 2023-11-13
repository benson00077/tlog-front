'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { MetaData } from '../util'
import { PostList } from '../PostList'

type Props = {
  metas: MetaData[]
}

/**
 * Not using searchParams prop in page.js since I'm using static export
 *   ref: https://github.com/vercel/next.js/discussions/17269#discussioncomment-4220731
 */
function WithSearchParams({ metas }: Props) {
  const searchParams = useSearchParams()
  const targetTag = searchParams.get('tag')!
  return <PostList metas={metas} selectedTag={targetTag} />
}

export default WithSearchParams
