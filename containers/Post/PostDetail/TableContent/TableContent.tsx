import React, { useEffect, useRef, RefObject, useState } from 'react'
import { IPostItem } from '../../types'
import { Toc } from './styled'
import { setupTocbot } from '../utils'
import { h2marginTop, navHeightInt, pxPerRem } from '../../../../styled/position'
import { useFocus } from '../../../../hooks/useFocus'

type TableContentProps = {
  deps: {
    post: IPostItem
    markdownRef: RefObject<HTMLDivElement>
  }
}

function TableContent({ deps }: TableContentProps) {
  const tocRef = useRef<HTMLDivElement>(null)
  const { focus } = useFocus({
    component: 'Toc',
    ifFocus: true,
  })

  /**
   *  NOTICE:
   *          Working around UI break after switch theme by setting
   *          window.localStorage.theme as dep
   */
  useEffect(() => {
    setupTocbot()
  }, [deps.post, globalThis?.localStorage?.theme])

  /**
   *  Usage:
   *          inject style so as to aligned with the design
   *          for child node position sticky.(work when position absolute in TOC)
   *  NOTICE:
   *          timeout is needed since
   *          markdown.offsetTop changes after photo above it loaded.
   *
   *          markdown.offsetParent = S.PostRoot, so navHeightInt is needed as wlll
   */
  useEffect(() => {
    const [markdown, toc] = [deps.markdownRef.current, tocRef.current]
    if (toc && markdown) {
      const footerHeightSpy = 200
      setTimeout(() => {
        const tocStyle = `
        height: ${markdown.getBoundingClientRect().height + footerHeightSpy}px;
        top: ${markdown.offsetTop + navHeightInt + h2marginTop * pxPerRem}px
        `
        toc.setAttribute('style', tocStyle)
      }, 0)
    }
  }, [globalThis?.localStorage?.theme, deps.markdownRef.current, tocRef.current])

  return (
    <Toc ref={tocRef} opacity={focus ? '1' : '0'}>
      <div>
        <aside className="tableOfContents"></aside>
      </div>
    </Toc>
  )
}

export default TableContent
