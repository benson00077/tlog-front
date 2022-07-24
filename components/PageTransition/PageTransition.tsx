import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { isMobile, isSafari } from '../../shared/utils'

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
  children: React.ReactChild
}

/**
 *  NOTICE:
 *      Use under framer motion <AnimatePresence> to handle page transition on exit
 *      Cancel page transition on Safari, which has a built in animation when doing siwpe back gesture on trackpad
 *      Cancel page transition on Mobile device, which has a built in amimation when go to last / next page
 */
function PageTransition({ children }: PageTransitionProps) {
  const [ifMotion, setIfMotion] = useState(!isSafari && !isMobile)

  return (
    <motion.main
      variants={ifMotion ? variants : variantsNoMotion}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
    >
      {children}
    </motion.main>
  )
}

export default PageTransition
