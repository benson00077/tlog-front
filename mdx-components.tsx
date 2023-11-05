import type { MDXComponents } from 'mdx/types'
import { Suspense } from 'react'
import { CustomMermaid } from './app/post/[slug]/_components/CustomMermaid'
import { CustomSyntaxHighlighter } from './app/post/[slug]/_components/CustomSyntaxHighlighter'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  console.log(3123)
  return {
    h1: ({ children }) => <h1 style={{ fontSize: '100px' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '100px' }}>{children}</h2>,
    ...components,
  }
}
