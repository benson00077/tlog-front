export const navHeight = '3rem'

const isServer = typeof window === 'undefined'
const fontSize = isServer ? '16px' : window.getComputedStyle(document.documentElement).fontSize //"16px"
export const pxPerRem = parseFloat(fontSize) //16
export const navHeightInt = 3 * pxPerRem //for px
