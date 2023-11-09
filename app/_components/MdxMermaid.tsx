'use client'
import React, { ReactNode, useEffect } from 'react'
import mermaid, { MermaidConfig } from 'mermaid'
import { extractText } from 'app/_utils/extractReactNodeText'

type MdxMermaidProps = {
  children: ReactNode
}

/**
 * TODO: when server side support. ref: https://github.com/mermaid-js/mermaid/issues/3650
 */
export default function MdxMermaid({ children }: MdxMermaidProps) {
  const mermaidText = extractText(children).join(' ')

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
  mermaid.contentLoaded()
}
