// import 'server-only'
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useHeadingObserver } from 'app/_hooks/useHeadingObserver'
import { getAnchor } from './utils'

type TableContentProps = {
  markdownContent: string
}
export function TableContent({ markdownContent }: TableContentProps) {
  const toc = mdContentParser(markdownContent)
  const { activeId } = useHeadingObserver([...toc.map((t) => t.anchor)])
  return (
    <ul>
      {toc.map(({ level, id, title, anchor }) => {
        return (
          <li key={id} className={`ml-${level} ${'#' + activeId === anchor ? 'underline' : ''}`}>
            <Link href={anchor}>{title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

type Toc = {
  level: number // markdown heading level from 1-6,
  id: number
  rootTitleId: number // sibling heading's root heading id
  title: string
  anchor: string
}
function mdContentParser(markdown: string): Toc[] {
  /** Aviod anchor elements and codeblocks, which could contains hash symbols and misinterpreted as headers */
  const regexReplaceCode = /(```.+?```)/gms
  const regexRemoveLinks = /\[(.*?)\]\(.*?\)/g

  const markdownWithoutLinks = markdown.replace(regexRemoveLinks, '')
  const markdownWithoutCodeBlocks = markdownWithoutLinks.replace(regexReplaceCode, '')

  const regexHeader = /#{1,6}.+/g
  const titles = markdownWithoutCodeBlocks.match(regexHeader)

  let rootTitleId = 0
  let notLv1TitleCount = 0

  if (!titles) return []

  const toc = titles.map((tempTitle, i) => {
    const match = tempTitle.match(/#/g)
    if (!match) throw Error('Failed to parse header in your markdown content')
    const level = tempTitle.match(/#/g)!.length - 1
    const title = tempTitle.replace(/#/g, '')!.trim()
    const { anchorHref } = getAnchor(title)
    if (level !== 1) notLv1TitleCount += 1
    if (i !== 0 && level === 1) rootTitleId = rootTitleId + 1 + notLv1TitleCount
    return {
      level: level,
      id: i,
      rootTitleId: rootTitleId,
      title: title,
      anchor: anchorHref,
    }
  })

  return toc
}
