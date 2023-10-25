'use client'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
/** ^^^ Don't use esm module. see: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/230 */
// import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
// import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015'

type Props = {
  children: any
  forwardedProps: any
  language: string
}
/**
 *  ref: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/536#issuecomment-1731066549
 */
export function CustomSyntaxHighlighter({ children, forwardedProps, language }: Props) {
  return (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, '')}
      style={vscDarkPlus}
      customStyle={{ borderRadius: '0.5rem', background: '#2a2a2a' }}
      showLineNumbers={true}
      showInlineLineNumbers={false}
      lineNumberStyle={{
        minWidth: '3.25em',
        paddingRight: '1em',
        textAlign: 'right',
        color: '#5b5b5b',
      }}
      wrapLongLines={false}
      language={language}
      PreTag="div"
      {...forwardedProps}
    />
  )
}
