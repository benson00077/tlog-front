import type { MDXComponents } from 'mdx/types'
import { Suspense } from 'react'
import './mdx-components-style.css'
import MdxCodeTitle from './app/_components/MdxCodeTitle'
import { getAnchor } from 'app/post/[slug]/_components/utils'
import MdxMermaid from 'app/_components/MdxMermaid'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className={`mt-11 mb-5 text-5xl`}>{children}</h1>,
    h2: ({ children }) => {
      const { anchorTargetId } = getAnchor(children as string)
      return (
        <>
          {/*
           * NOTICE: span intendedly outside h2, or achor position be wrong for sticky h2
           *      \_ h-[36px] = text-3xl line-height of h2
           */}
          <span id={anchorTargetId}></span>
          <h2 className={`z-30 sticky top-[6px] mt-10 mb-5 text-3xl`}>{children}</h2>
        </>
      )
    },
    h3: ({ children }) => {
      const { anchorTargetId } = getAnchor(children as string)
      return (
        <h3 className={`mt-7 mb-5 text-2xl`}>
          {/* NOTICE: offset: span mt-12 = nav pt-12 */}
          <span id={anchorTargetId} className="pt-12"></span>
          {children}
        </h3>
      )
    },
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
    // pre({ children, ...props }) {
    //   return (
    //     <pre {...props} className={`${props.className} rounded`}>
    //       {children}
    //     </pre>
    //   )
    // },
    code({ children, ...props }) {
      const language = (props as { 'data-language': string })['data-language']
      switch (language) {
      case 'mermaid':
        return (
          <Suspense fallback={<div>Parsing Mermaid...</div>}>
            <code {...props}></code>
            <MdxMermaid>{children}</MdxMermaid>
          </Suspense>
        )
      default:
        return <code {...props}>{children}</code>
      }
    },
    div({ children, ...props }) {
      if (Object.keys(props).includes('data-rehype-pretty-code-title')) {
        const language = (props as any)['data-language']
        if (!language) throw new Error(`Cannot find data-language, props: ${{ ...props }}`)
        return (
          <div {...props}>
            <MdxCodeTitle language={language}>{children}</MdxCodeTitle>
          </div>
        )
      }
      return <div {...props}>{children}</div>
    },
    ...components,
  }
}
