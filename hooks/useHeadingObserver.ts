import { useEffect, useState } from 'react'

export function useHeadingObserver(anchors: string[]) {
  const [activeId, setActiveId] = useState('')

  const throttle = (fn: (...args: any[]) => void, wait = 250) => {
    let inThrottle: boolean
    let lastFn: ReturnType<typeof setTimeout>
    let lastTime: number
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        fn.apply(this, args)
        lastTime = Date.now()
        inThrottle = true
      } else {
        clearTimeout(lastFn)
        lastFn = setTimeout(() => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(this, args)
            lastTime = Date.now()
          }
        }, Math.max(wait - (Date.now() - lastTime), 0))
      }
    }
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      const headingAnchors = document.querySelectorAll(anchors.join(', '))
      // Find the active heading based on scroll position
      headingAnchors.forEach((elem) => {
        const rect = elem.getBoundingClientRect()
        const headingStickyTopOffset = 10
        if (rect.top <= headingStickyTopOffset) {
          setActiveId(elem.id)
        }
      })

      /** Corner case: when scroll to very top and bottom */
      const markdownEle = document.querySelector('.my-markdown')
      if (!markdownEle) throw Error("Oops! what's your markdown element ?")
      if (!(markdownEle instanceof HTMLElement)) throw Error('Oops! Wrongly select SVGElement or sth...')
      const isOutOfTopBoundary = window.scrollY <= markdownEle.offsetTop
      const reachBtmOffset = 260
      const isReachedDocBottom =
        window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - reachBtmOffset

      if (isOutOfTopBoundary) {
        setActiveId(headingAnchors[0].id)
      }
      if (isReachedDocBottom) {
        setActiveId(headingAnchors[headingAnchors.length - 1].id)
      }
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { activeId }
}
