import 'server-only'
import React from 'react'
import Link from 'next/link'

type TableContentProps = {
  markdownContent: string
}
export function TableContent({ markdownContent }: TableContentProps) {
  const toc = mdContentParser(markdownContent)
  console.log(44, toc)
  return (
    <ul>
      {toc.map(({ level, id, title, anchor }) => {
        return (
          <li key={id} className={`ml-${level}`}>
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
  console.log(33, titles)

  if (!titles) return []

  const toc = titles.map((tempTitle, i) => {
    const match = tempTitle.match(/#/g)
    if (!match) throw Error('Failed to parse header in your markdown content')
    const level = tempTitle.match(/#/g)!.length - 1
    const title = tempTitle.replace(/#/g, '')!.trim()
    const anchor = `#${title.replace(/ /g, '-').toLowerCase()}`
    if (level !== 1) notLv1TitleCount += 1
    if (i !== 0 && level === 1) rootTitleId = rootTitleId + 1 + notLv1TitleCount
    return {
      level: level,
      id: i,
      rootTitleId: rootTitleId,
      title: title,
      anchor: anchor,
    }
  })

  return toc
}
