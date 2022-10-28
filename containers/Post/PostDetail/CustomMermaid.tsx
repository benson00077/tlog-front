import React, { ReactNode } from 'react'
import { useThemeMode } from '../../../hooks/useThemeMode'
import mermaid, { Config } from 'mermaid'

type CustomMermaydType = {
  children: ReactNode
  isMermaidLoaded: boolean
}
export function CustomMermaid({ children, isMermaidLoaded }: CustomMermaydType) {
  const { theme } = useThemeMode()

  const withMemoized = () => {
    if (isMermaidLoaded) return
    setMermaid(theme === 'dark' ? 'dark' : 'default')
  }

  return (
    <div className="mermaid" ref={withMemoized}>
      {children}
    </div>
  )
}

/**
 *  @Usage Callback ref for UI of mermaid block
 *
 *  NOTE: mermaid block is not shown in server side (checked by View Page Source)
 */
export function setMermaid(theme: Config['theme']) {
  const mermaidConfig: Config = {
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
  setTimeout(() => mermaid.contentLoaded())
}
