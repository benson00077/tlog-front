'use client'
/**
 *  FIXME: exit animation bug on framer motion + app router
 *  ref: https://github.com/framer/motion/issues/1375#issuecomment-1345067212
 *  ref: https://github.com/vercel/next.js/discussions/42658
 */
import React, { ReactNode } from 'react'
// import { motion } from 'framer-motion'
import { isMobile, isSafari } from 'app/_utils/utils'
import { usePathname } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const variantsNoMotion = {
  hidden: {},
  enter: {},
  exit: {},
}

type PageTransitionProps = {
  children: ReactNode
}

/**
 *  USAGE:
 *      Use under framer motion <AnimatePresence> to handle page transition on exit
 *      Cancel page transition on Safari, which has a built in animation when doing siwpe back gesture on trackpad
 *      Cancel page transition on Mobile device, which has a built in amimation when go to last / next page
 *  FIXME:
 *      scroll jumping problem still exist
 */
function PageTransition({ children }: PageTransitionProps) {
  const ifMotion = !isSafari && !isMobile
  const pathName = usePathname()

  console.log('page key: ', pathName)

  return (
    // <motion.main
    //   key={pathName}
    //   className='max-h-full overflow-y-auto'
    //   variants={ifMotion ? variants : variantsNoMotion}
    //   initial="hidden"
    //   animate="enter"
    //   exit="exit"
    //   transition={{ type: 'linear' }}
    // >
    //   {children}
    // </motion.main>
    <div></div>
  )
}

export default PageTransition
