import React, { useRef } from 'react'
import { Triangle } from './Triangle'
import { setLanguageLeft, setColumnLeft } from './utils'
import { CustomMermaid } from './CustomMermaid'
import styles from './mdStyle.module.css'
import './mdStyle.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
/** ^^^ Don't use esm module. see: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/230 */
// import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
// import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015'

export function CustomMarkdown() {
  const isExpand = useRef(false)
  const isMermaidLoaded = useRef(false)
  const isSectionNotCollasped = useRef(false)

  return {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      const matchForeignLanguage = /language-foreign/.exec(className || '')
      const matchMermaid = /mermaid/.exec(className)
      //FIXME: quote should use > in markdown, instead of ```...```
      const isQuote = !inline && !match && !matchForeignLanguage && !matchMermaid

      if (inline) {
        return (
          <code className={styles['inline-code']} {...props}>
            {children}
          </code>
        )
      }
      if (matchMermaid) {
        return <CustomMermaid isMermaidLoaded={isMermaidLoaded.current}>{children}</CustomMermaid>
      }
      if (matchForeignLanguage) return <p>{children}</p>
      if (match) {
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
            language={match[1]}
            PreTag="div"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const preTag = e.currentTarget
              isExpand.current ? preTag.classList.remove('expand') : preTag.classList.add('expand')
              isExpand.current = !isExpand.current
            }}
            {...props}
          />
        )
      }
      if (isQuote) {
        return (
          <code className={`${className} ${styles.quote}`} {...props}>
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
        return (
          <div id="foreignLanguageBlock" className="languageRight" ref={setLanguageLeft}>
            {children}
          </div>
        )
      }
      if (match) {
        return (
          <pre id="codeBlock" className="columnRight" {...props} ref={setColumnLeft}>
            {children}
          </pre>
        )
      }
      /** markdown quote: 2 tabs, or ```...``` , or > */
      return (
        <div className={`${styles.quote}`}>
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
    // p({ node, children, ...props }: any) { return <p {...props}>{children}</p> },
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
      return (
        <>
          <Triangle />
          <h2 id={children[0]} className={`clearFloat mt-10 mb-5 text-3xl`} {...props}>
            {children}
          </h2>
        </>
      )
    },
    h3({ node, children, ...props }: any) {
      return (
        <h3 id={children[0]} className={`clearFloat mt-7 mb-5 text-2xl`} {...props}>
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
      return <ul className={`${styles.indent2} list-disc clearFloat`}>{children}</ul>
    },
    ol({ node, children }: any) {
      return <ol className={`${styles.indent2} list-decimal clearFloat`}>{children}</ol>
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
      return <blockquote className={`${styles.quote}`}>{children}</blockquote>
    },
    strong({ node, children, ...props }: any) {
      return <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
    },
  }
}
