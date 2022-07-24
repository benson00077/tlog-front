export const navHeight = '3rem'

const isServer = typeof window === 'undefined'
const fontSize = isServer ? '16px' : window.getComputedStyle(document.documentElement).fontSize //"16px"
export const pxPerRem = parseFloat(fontSize) //16
export const navHeightInt = 3 * pxPerRem //px
export const h2marginTop = 2.5 //px
