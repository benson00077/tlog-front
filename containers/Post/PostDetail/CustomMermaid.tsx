import React, { ReactNode, useEffect } from 'react'
import { useThemeMode } from 'hooks/useThemeMode'
import mermaid, { MermaidConfig } from 'mermaid'

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

  useEffect(() => {
    withMemoized()
  }, [theme])

  return <div className="mermaid">{children}</div>
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
  setTimeout(() => mermaid.contentLoaded())
}
