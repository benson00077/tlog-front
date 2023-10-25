'use client'
import React, { ReactNode } from 'react'
// import { useThemeMode } from 'hooks/useThemeMode'
import mermaid, { MermaidConfig } from 'mermaid'

type CustomMermaydType = {
  children: ReactNode
}
//FIXME: Hydration failed because the initial UI does not match what was rendered on the server.
// \_ Maybe until mermaid support server side render

// export function CustomMermaid({ children, isMermaidLoaded }: CustomMermaydType) {
export function CustomMermaid({ children }: CustomMermaydType) {
  // const { theme } = useThemeMode()

  // const withMemoized = () => {
  //   if (isMermaidLoaded) return
  //   setMermaid(theme === 'dark' ? 'dark' : 'default')
  // }

  // useEffect(() => {
  //   withMemoized()
  // }, [theme])

  return (
    <div className="mermaid" ref={() => setMermaid('dark')}>
      {children}
    </div>
  )
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
