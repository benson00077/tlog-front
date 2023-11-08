import type { MDXComponents } from 'mdx/types'
import { Suspense } from 'react'
import { CustomMermaid } from './app/post/[slug]/_components/CustomMermaid'
import { CustomSyntaxHighlighter } from './app/post/[slug]/_components/CustomSyntaxHighlighter'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className={`mt-11 mb-5 text-5xl`}>{children}</h1>,
    h2: ({ children }) => <h2 className={`z-30 sticky top-[6px] clearFloat mt-10 mb-5 text-3xl`}>{children}</h2>,
    h3: ({ children }) => <h3 className={`mt-7 mb-5 text-2xl`}>{children}</h3>,
    h4: ({ children }) => <h4 className={`text-xl`}>{children}</h4>,
    h5: ({ children }) => <h5 className={`text-lg`}>{children}</h5>,
    p: ({ children }) => <p className="my-4 leading-6">{children}</p>,
    ul: ({ children }) => {
      return <ul className={`pl-8 list-disc`}>{children}</ul>
    },
    ol: ({ children }) => {
      return <ol className={`pl-8 list-decimal`}>{children}</ol>
    },
    li: ({ children }) => {
      return <li className="leading-6">{children}</li>
    },
    a({ node, children, ...props }: any) {
      return (
        <a target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" {...props}>
          {children}
        </a>
      )
    },
    blockquote({ node, children, ...props }: any) {
      //TODO: add .quote
      return <blockquote className="quote">{children}</blockquote>
    },
    strong({ node, children, ...props }: any) {
      return <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    },
    ...components,
  }
}
