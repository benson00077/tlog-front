import { useCallback, useState, useEffect, ReactChild } from 'react'
import { Direction, useScrollContext } from './ScrollProvider'

type thresholdCirteriaType = {
  NavBar: { show: boolean }
  Toc: { show: boolean }
}
type FocusProviderProps = {
  component: keyof thresholdCirteriaType
  ifFocus: boolean
  callbacks?: {
    toc?: () => boolean
  }
}
export const useFocus = ({ component, ifFocus = false, callbacks }: FocusProviderProps) => {
  const [focus, setFocus] = useState(ifFocus)
  const { scrollTop, direction } = useScrollContext() // 就算零件用的 useFocus 的 state 各自獨立，但用到的context是不是還是同一個？

  useEffect(() => {
    const thresholdCirteria = {
      NavBar: {
        show: scrollTop <= 100 || direction !== Direction.Down,
      },
      Toc: {
        show: direction !== Direction.None || (callbacks?.toc?.() as boolean), // onHover & scroll to anchor tags
      },
    }
    setFocus(thresholdCirteria[component].show)
  }, [scrollTop, direction])

  return { focus }
}
