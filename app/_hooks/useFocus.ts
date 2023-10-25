import { useCallback, useState, useEffect, ReactChild } from 'react'
import { Direction, useScrollContext } from './ScrollProvider'

type thresholdCirteriaType = {
  NavBar: { show: boolean }
  Toc: { show: boolean }
}
type FocusProviderProps = {
  component: keyof thresholdCirteriaType
  ifFocus: boolean
}
export const useFocus = ({ component, ifFocus = false }: FocusProviderProps) => {
  const [focus, setFocus] = useState(ifFocus)
  const { scrollTop, direction, isBottomOfPage } = useScrollContext()

  useEffect(() => {
    const thresholdCirteria = {
      show: false,
    }
    if (component === 'NavBar') {
      thresholdCirteria.show = scrollTop <= 100 || direction !== Direction.Down || isBottomOfPage
    }
    if (component === 'Toc') {
      thresholdCirteria.show = scrollTop <= 1500 || isBottomOfPage
    }
    setFocus(thresholdCirteria.show)
  }, [scrollTop, direction])

  return { focus }
}
