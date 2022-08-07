import { useEffect, useMemo, useRef, useState } from 'react'
import throttle from 'lodash/throttle'

const getScrollPosition = () => {
  if (typeof window === 'undefined') return 0
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

export const useScroll = (timeout = 250) => {
  const defaultScrollTop = useMemo(() => getScrollPosition(), [])
  const previousScrollTop = useRef(defaultScrollTop)
  const [currentScrollTop, setCurrentScrollTop] = useState(defaultScrollTop)
  const isBottomOfPage = useRef(false)

  useEffect(() => {
    const handleDocumentScroll = throttle(() => {
      const scrollTop = getScrollPosition()
      setCurrentScrollTop(scrollTop)
      previousScrollTop.current = scrollTop
      const footerHeightSpy = 200
      isBottomOfPage.current = window.innerHeight + window.scrollY >= document.body.scrollHeight - footerHeightSpy
    }, timeout)

    window.addEventListener('scroll', handleDocumentScroll)

    return () => {
      window.removeEventListener('scroll', handleDocumentScroll)
    }
  }, [timeout])

  return {
    scrollTop: currentScrollTop,
    previousScrollTop: previousScrollTop.current,
    time: timeout,
    isBottomOfPage: isBottomOfPage.current,
  }
}
