import 'server-only'
import React, { Suspense, useRef } from 'react'
import { Triangle } from './Triangle'
import { setLanguageLeft, setColumnLeft } from './utils'
import { CustomMermaid } from './CustomMermaid'
import './mdStyle.css'
import { CustomSyntaxHighlighter } from './CustomSyntaxHighlighter'
import { CodeBlock, ForeignLanguageBlock } from './CustomMarkdownEle'

export function CustomMarkdown() {
  return {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      const matchForeignLanguage = /language-foreign/.exec(className || '')
      const matchMermaid = /mermaid/.exec(className)
      //FIXME: quote should use > in markdown, instead of ```...```
      const isQuote = !inline && !match && !matchForeignLanguage && !matchMermaid

      if (inline) {
        return (
          <code className="inline-code" {...props}>
            {children}
          </code>
        )
      }
      if (matchMermaid) {
        // return <CustomMermaid isMermaidLoaded={isMermaidLoaded.current}>{children}</CustomMermaid>
        return (
          <Suspense fallback={<div>Parsing Mermaid...</div>}>
            <CustomMermaid>{children}</CustomMermaid>
          </Suspense>
        )
        // return <div>Mermaid</div>
      }
      if (matchForeignLanguage) return <p>{children}</p>
      if (match) {
        const codeBlockLanguage = match[1]
        return (
          <CustomSyntaxHighlighter language={codeBlockLanguage} children={children} forwardedProps={{ ...props }} />
        )
      }
      if (isQuote) {
        return (
          <code className={`${className} quote`} {...props}>
            {children}
          </code>
        )
      }
      throw new Error('Something went wrong parsing markdown code blocks...')
    },
    pre({ node, children, ...props }: any) {
      // Add real code block a className
      // since quote in markdown also paresed as pre > code
      const codeTagClassName = node.children[0].properties.className
      const match = /language-(\w+)/.exec(codeTagClassName || '') // belike [ "language-js", "js" ] | null
      const matchForeignLanguage = /language-foreign/.exec(codeTagClassName || '')
      if (matchForeignLanguage) {
        return <ForeignLanguageBlock>{children}</ForeignLanguageBlock>
      }
      if (match) {
        return <CodeBlock {...props}>{children}</CodeBlock>
      }
      /** markdown quote: 2 tabs, or ```...``` , or > */
      return (
        <div className="quote">
          <pre {...props}>{children}</pre>
        </div>
      )
    },
    table({ node, inline, className, children, ...props }: any) {
      return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="md-table" {...props}>
            {children}
          </table>
        </div>
      )
    },
    // NOTE: prevent using h1 in markdown content. Post title would be the only h1 for SEO
    h1({ node, children, ...props }: any) {
      return (
        <>
          <h1 id={children[0]} className={`mt-11 mb-5 text-5xl clearFloat`} {...props}>
            {children}
          </h1>
        </>
      )
    },
    h2({ node, children, ...props }: any) {
      const anchor = children[0].replace(/ /g, '-').toLowerCase()
      return (
        <>
          {/* mask for git-line icon */}
          <div className="absolute left-[-194px] w-12 h-14 bg-gray-800 z-10"></div>
          <h2 id={children[0]} className={`z-30 sticky top-[6px] clearFloat mt-10 mb-5 text-3xl`} {...props}>
            {/* For html anchor tag target: pt-12 as offset for nav bar's h-12 */}
            <span id={anchor}></span>
            <Triangle />
            {children}
          </h2>
        </>
      )
    },
    h3({ node, children, ...props }: any) {
      const anchor = children[0].replace(/ /g, '-').toLowerCase()
      return (
        <h3 id={children[0]} className={`clearFloat mt-7 mb-5 text-2xl`} {...props}>
          {/* For html anchor tag target: pt-12 as offset for nav bar's h-12 */}
          <span id={anchor} className="pt-12"></span>
          {children}
        </h3>
      )
    },
    h4({ node, children, ...props }: any) {
      return (
        <h4 className={`clearFloat text-xl`} {...props}>
          {children}
        </h4>
      )
    },
    h5({ node, children, ...props }: any) {
      return (
        <h5 className={`clearFloat text-lg`} {...props}>
          {children}
        </h5>
      )
    },
    h6({ node, children, ...props }: any) {
      return (
        <h6 className={`clearFloat`} {...props}>
          {children}
        </h6>
      )
    },
    p({ node, children, ...props }: any) {
      return (
        <p className="my-4 leading-6 clearFloat" {...props}>
          {children}
        </p>
      )
    },
    ul({ node, children }: any) {
      return <ul className={`indent2 list-disc clearFloat`}>{children}</ul>
    },
    ol({ node, children }: any) {
      return <ol className={`indent2 list-decimal clearFloat`}>{children}</ol>
    },
    li({ node, children }: any) {
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
      // return <blockquote className="pt-4 pr-4 pb-2.5 rounded">{children}</blockquote>
      return <blockquote className="quote">{children}</blockquote>
    },
    strong({ node, children, ...props }: any) {
      return <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    },
  }
}
