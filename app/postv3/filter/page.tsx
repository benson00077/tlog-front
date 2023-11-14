import React from 'react'
import { getAllPostsMeta } from '../util'
import WithSearchParams from './WithSeacrhParams'

export default async function Page() {
  const metas = await getAllPostsMeta()
  return (
    <>
      <WithSearchParams metas={metas} />
    </>
  )
}
