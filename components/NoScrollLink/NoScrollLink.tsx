import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

interface IProps extends LinkProps {
  children: ReactNode
}

/**
 *  NOTICE: <Link scroll={false}> for smoother page tranision by Framer Motion
 */
function NoScrollLink({ children, href, passHref }: IProps) {
  return (
    <Link href={href} passHref={passHref} scroll={false}>
      {children}
    </Link>
  )
}

export default NoScrollLink
