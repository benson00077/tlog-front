import { createContext, useContext, useMemo, ReactChild } from 'react'
import { useScroll } from './useScroll'

const TIMEOUT = 150
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
})

type ScrollProviderProps = {
  children: ReactChild
}
export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const { scrollTop, previousScrollTop, time } = useScroll(TIMEOUT)
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
    }),
    [scrollTop, previousScrollTop, time, amountScrolled, direction, velocity],
  )

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export const useScrollContext = () => useContext(ScrollContext)
