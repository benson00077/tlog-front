import { useEffect, useState, useRef } from 'react'

export function useHeadingObserver() {
  const [activeId, setActiveId] = useState('')
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observerCb: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observer.current = new IntersectionObserver(observerCb, {
      /** when a header is at the bottom 50% of our page, it will not be counted as visible. */
      rootMargin: '0px 0px -50% 0px',
    })

    const elements = document.querySelectorAll('.my-markdown h2 > span, .my-markdown h3 span')
    elements.forEach((elem) => observer.current!.observe(elem))
    return () => observer.current?.disconnect()
  }, [])

  return { activeId }
}
