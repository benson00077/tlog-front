import React, { useEffect, useState } from 'react'
import useIntersectionObserver from '../../../hooks/useIntersectionObeserver'
import { isServer } from '../../../shared/utils'

type heading = {
  id: string
  text: string
  level: number
}
function useHeadings() {
  const [headings, setHeadings] = useState<heading[]>([])
  useEffect(() => {
    if (isServer) return
    const headings: heading[] = []
    document.querySelectorAll('h2, h3').forEach((heading) => {
      headings.push({
        id: heading.id,
        text: heading.innerHTML,
        level: parseInt(heading.tagName.substring(1)),
      })
    })
    setHeadings(headings)
  }, [])
  return headings
}

export default function TableOfContent() {
  const headings = useHeadings()
  const activeId = useIntersectionObserver({
    ids: headings.map(({ id }) => id),
    options: { rootMargin: '0% 0% -95% 0%' },
  })

  const smoothScroll = (e: React.MouseEvent) => {
    e.preventDefault()
    const anchor = e.currentTarget.getAttribute('href')
    // selector make [id="some id with spaces"] works
    if (!anchor) return
    document.querySelector(`[id="${anchor.split('#')[1]}"]`)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <nav style={{ position: 'fixed', top: '1em', right: '1em' }}>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: `${heading.level - 2}em` }}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => smoothScroll(e)}
              style={{ fontWeight: activeId === heading.id ? 'bold' : 'normal' }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
