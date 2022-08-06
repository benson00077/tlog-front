import { useEffect, useRef, useState } from 'react'
import { isServer } from '../shared/utils'

type useIntersectionObserverProps = {
  ids: string[]
  options: IntersectionObserverInit
}

export default function useIntersectionObserver({ ids, options }: useIntersectionObserverProps) {
  const [activeId, setActiveId] = useState<string>()
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (isServer) return

    /**
     *  Intersection Observer fails sometimes when scrolling fast
     *    https://stackoverflow.com/a/65008310/16124226
     */

    // let minId: number | null
    // let maxId: number | null
    // let debounceTimeout: ReturnType<typeof setTimeout>

    // function applyChanges() {
    //   console.log(minId, maxId);
    //   const items = document.querySelectorAll('.item');
    //   // perform action on elements with Id between min and max
    //   minId = null
    //   maxId = null
    // }

    // function reportIntersection(entries: IntersectionObserverEntry[]) {
    //   clearTimeout(debounceTimeout);
    //   entries.forEach((entry, i) => {
    //     if (entry.isIntersecting) {
    //       if (minId === null || maxId === null) {
    //         minId = i;
    //         maxId = i;
    //       } else {
    //         minId = Math.min(minId, i);
    //         maxId = Math.max(maxId, i);
    //       }
    //       setActiveId(entry.target.id)
    //     }
    //   });
    //   debounceTimeout = setTimeout(applyChanges, 500);
    // }

    const elements = ids.map((id) => document.getElementById(id))
    observer.current?.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) setActiveId(entry.target.id)
      })
    }, options)
    elements.forEach((el) => {
      if (el) observer.current?.observe(el)
    })

    return () => observer.current?.disconnect()
  }, [ids, options])

  return activeId
}
