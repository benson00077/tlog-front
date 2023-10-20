'use client'

import throttle from 'lodash/throttle'
import { useEffect, useRef, useState } from 'react'
import { BiArrowToTop } from 'react-icons/bi'

/**
 *  Inproving scrolling performance
 *  with debounce or throttle in React : https://blog.logrocket.com/how-and-when-to-debounce-or-throttle-in-react/
 *  with passive listeners : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners
 */

function BackToTopBtn() {
  const [scrollTopCount, setScrollTopCount] = useState(0)
  const threshold = useRef(400)

  // FIXME: should I use useCallback?
  //  https://stackoverflow.com/a/57556594/16124226
  //  https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
  const scrollCountHandler = throttle(() => {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    setScrollTopCount(top)
  }, 100)

  const scrollToTop = () => {
    //TODO: note it
    // requestAnimationFrame https://ithelp.ithome.com.tw/articles/10280810?sc=iThelpR
    // https://pjchender.dev/webapis/webapis-timer-and-scheduling/
    // https://juejin.cn/post/6844903925473083405
    // https://juejin.cn/post/6844903925741518862
    // 關於緩動 https://segmentfault.com/a/1190000004670799
    // DOMHighResTimeStamp  指示 requestAnimationFrame() 开始触发回调函数的当前时间

    // let startTime = performance.now();
    /* ... do things for a while ... */
    // let elapsedTime = performance.now() - startTime;

    let timer = 0
    cancelAnimationFrame(timer)
    const startTime = +new Date()
    const b = document.body.scrollTop || document.documentElement.scrollTop
    const d = 500 //duration?
    const c = b
    timer = requestAnimationFrame(function func(timestamp: DOMHighResTimeStamp) {
      const t = d - Math.max(0, startTime - +new Date() + d) // timeFraction? from 0 to d-500
      document.documentElement.scrollTop = (t * -c) / d + b
      document.body.scrollTop = (t * -c) / d + b
      timer = requestAnimationFrame(func)
      if (t === d) {
        cancelAnimationFrame(timer)
      }
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollCountHandler, { passive: true })

    return () => {
      document.removeEventListener('scroll', scrollCountHandler)
    }
  }, [])

  const isShow = scrollTopCount >= threshold.current
  return (
    <>
      <BiArrowToTop
        size={40}
        onClick={scrollToTop}
        className={`${
          isShow ? 'z-10 opacity-100 h-auto' : 'opacity-0 h-0'
        } fixed cursor-pointer select-none bottom-8 right-8 hover:scale-105`}
      />
    </>
  )
}

export default BackToTopBtn
