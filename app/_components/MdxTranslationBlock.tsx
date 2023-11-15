import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  block: 'translate-origin' | 'translate-target'
}

function MdxTranslationBlock({ children, block }: Props) {
  if (!Array.isArray(children) || children.length !== 2) {
    console.error('\x1b[31m%s\x1b[0m', 'Please use the following format:')
    console.error(
      '\x1b[31m%s\x1b[0m',
      `
      <MdxTranslationBlock>
        <>your content 1</>
        <>your content 2</>
      </MdxTranslationBlock>
    `,
    )
    throw new Error('Wrong format')
  }

  return (
    <>
      {Array.isArray(children) ? (
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div>{children[0]}</div>
          <div>{children[1]}</div>
        </section>
      ) : null}
    </>
  )
}

export default MdxTranslationBlock
