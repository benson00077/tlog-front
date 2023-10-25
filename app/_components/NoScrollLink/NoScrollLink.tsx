import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

interface IProps extends LinkProps {
  children: ReactNode
  className?: string
}

/**
 *  NOTICE: <Link scroll={false}> for smoother page tranision by Framer Motion
 */
function NoScrollLink({ children, href, passHref, className }: IProps) {
  return (
    <Link className={className} href={href} passHref={passHref} scroll={false}>
      {children}
    </Link>
  )
}

export default NoScrollLink
