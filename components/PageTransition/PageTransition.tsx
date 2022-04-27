import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

type PageTransitionProps = {
  children: React.ReactChild
}
/**
 *  NOTICE:
 *      Use under framer motion <AnimatePresence>
 */
function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.main
      variants={variants}
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