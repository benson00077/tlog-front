'use client'
import React from 'react'
import { setColumnLeft, setLanguageLeft } from './utils'

export function CodeBlock({ children, ...props }: any) {
  return (
    <pre id="codeBlock" className="columnRight" {...props} ref={setColumnLeft}>
      {children}
    </pre>
  )
}

export function ForeignLanguageBlock({ children }: any) {
  return (
    <div id="foreignLanguageBlock" className="languageRight" ref={setLanguageLeft}>
      {children}
    </div>
  )
}
