'use client'
import React, { ReactNode, useEffect } from 'react'
import mermaid, { MermaidConfig } from 'mermaid'
// import getRecursiveChildText from '../_utils/getRecursiveChildText'

type MdxMermaidProps = {
  children: ReactNode
}

/**
 * TODO: when server side support. ref: https://github.com/mermaid-js/mermaid/issues/3650
 */
export default function MdxMermaid({ children }: MdxMermaidProps) {
  /** retrieve text back cause rehypePrettyCode have parsed then into ReactNode with nested <span> */

  const getRecursiveChildText = (reactNode: ReactNode) => {
    const children = reactNode!.props?.children || undefined
    if (Array.isArray(reactNode)) {
      // Multiple children
      const joinedNodes: string[] = []
      reactNode.forEach((node) => {
        if (typeof node === 'object') joinedNodes.push(getRecursiveChildText(node))
        else if (typeof node === 'string') joinedNodes.push(node)
      })
      return joinedNodes.join(' ')
    }
    if (children === undefined) {
      if (typeof reactNode === 'string') return reactNode
      else return ' '
    }
    if (typeof children === 'object') {
      // Found direct child
      return getRecursiveChildText(reactNode.props.children)
    }
    if (typeof children === 'string') {
      // Found searchable string
      return reactNode.props.children
    }
  }

  const mermaidText = getRecursiveChildText(children)

  useEffect(() => {
    //Workaround: Error: There was an error while hydrating this Suspense boundary. Switched to client rendering.
    const mermaidDivs = document.querySelectorAll('.myMermaid')
    mermaidDivs.forEach((div) => {
      div.classList.add('mermaid')
    })
    setMermaid('dark')
  })

  return <div className="myMermaid">{mermaidText}</div>
}

/**
 *  @Usage Callback ref for UI of mermaid block
 *
 *  NOTE: mermaid block is not shown in server side (checked by View Page Source)
 */
export function setMermaid(theme: MermaidConfig['theme']) {
  const mermaidConfig: MermaidConfig = {
    startOnLoad: true,
    theme: theme,
    securityLevel: 'loose',
    fontFamily: 'Fira Code',
  }
  mermaid.initialize(mermaidConfig)
  /**
   *  NOTICE:
   *          setTimeout as a workaround,
   *          theme would somehow be mismatch w/o setTimeout here
   */
  // setTimeout(() => mermaid.contentLoaded())
  mermaid.contentLoaded()
}
