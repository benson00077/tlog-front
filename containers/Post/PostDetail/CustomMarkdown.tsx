import React, { useEffect, useRef } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs' // import vs2015 from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015' 
import * as S from './styled'


// TODO: consider use p tag to have multi speaking language block
// sth like @KOREAN in markdown
export function CustomMarkdown() {
  
  const isExpand = useRef(false)

  return ({
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      const matchForeignLanguage = /language-foreign/.exec(className || '')
      if (!inline && matchForeignLanguage) {
        // TODO: return block for multi speaking language block
        return (
          <p>{children}</p>
        )
      }
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atomOneDark}
          customStyle={{ borderRadius: "0.5rem", background: "#2a2a2a" }}
          showLineNumbers={false}
          showInlineLineNumbers={false}
          wrapLongLines={false}
          language={match[1]}
          PreTag="div"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            const preTag = e.currentTarget
            isExpand.current
              ? preTag.classList.remove("expand")
              : preTag.classList.add("expand")
            isExpand.current = !isExpand.current
          }}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    pre({ node, children, ...props }: any) {
      // Add real code block a className
      // since quote in markdown also paresed as pre > code 
      const codeTagClassName = node.children[0].properties.className
      const match = /language-(\w+)/.exec(codeTagClassName || '') // belike [ "language-js", "js" ] | null
      const matchForeignLanguage = /language-foreign/.exec(codeTagClassName || '')
      if (matchForeignLanguage) {
        return (<div id="foreignLanguageBlock" className={"languageRight"}>{children}</div>)
      }
      return (match)
        ? <pre id="codeBlock" className={"columnRight"} {...props}>{children}</pre>
        : <div className={"quote"} ><pre {...props}>{children}</pre></div>
    },
    table({ node, inline, className, children, ...props }: any) {
      return (
        <S.Table className="clearFloat">
          <table {...props}>{children}</table>
        </S.Table>
      )
    },
    // p({ node, children, ...props }: any) { return <p {...props}>{children}</p> },
    // NOTE: prevent using h1 in markdown content. Post title would be the only h1 for SEO
    h1({ node, children, ...props }: any) { 
      return <h1 id={children[0]} className="clearFloat" {...props}>{children}</h1> 
    },
    h2({ node, children, ...props }: any) { 
      return <h2 id={children[0]} className="clearFloat" {...props}>{children}</h2> 
    },
    h3({ node, children, ...props }: any) { 
      return <h3 id={children[0]} className="clearFloat" {...props}>{children}</h3> 
    },
    h4({ node, children, ...props }: any) { return <h4 className="clearFloat" {...props}>{children}</h4> },
    h5({ node, children, ...props }: any) { return <h5 className="clearFloat" {...props}>{children}</h5> },
    h6({ node, children, ...props }: any) { return <h6 className="clearFloat" {...props}>{children}</h6> },
    p({ node, children, ...props }: any) { return <p className='clearFloat' {...props}>{children}</p> },
    ul({ node, children }: any) { return <ul className='clearFloat'>{children}</ul> },
  })
}