import { createContext, useContext, useMemo, ReactChild } from 'react'
import { useScroll } from './useScroll'

const TIMEOUT = 500
export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  None = 'NONE',
}

export const ScrollContext = createContext({
  scrollTop: 0,
  previousScrollTop: 0,
  time: TIMEOUT,
  amountScrolled: 0,
  direction: Direction.None,
  velocity: 0,
  isBottomOfPage: false,
})

type ScrollProviderProps = {
  children: ReactChild
}
export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const { scrollTop, previousScrollTop, time, isBottomOfPage } = useScroll(TIMEOUT)
  const amountScrolled = useMemo(() => scrollTop - previousScrollTop, [scrollTop, previousScrollTop])

  const direction = useMemo(() => {
    if (amountScrolled < 0) {
      return Direction.Up
    } else if (amountScrolled > 0) {
      return Direction.Down
    }
    return Direction.None
  }, [amountScrolled])

  const velocity = useMemo(() => Math.abs(amountScrolled / time), [amountScrolled, time])

  const value = useMemo(
    () => ({
      scrollTop,
      previousScrollTop,
      time,
      amountScrolled,
      direction,
      velocity,
      isBottomOfPage,
    }),
    [scrollTop, previousScrollTop, time, amountScrolled, direction, velocity, isBottomOfPage],
  )

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export const useScrollContext = () => useContext(ScrollContext)
