import React, { ReactElement, ReactNode } from 'react'

/**
 * Retrieve text back cause rehypePrettyCode have parsed then into ReactNode with nested `<span>`
 * - ref: https://stackoverflow.com/questions/74438949/how-to-access-the-child-of-a-prop-in-react-typescript
 */
export function extractText(children: React.ReactNode): (string | number)[] {
  return React.Children.toArray(children).reduce<(string | number)[]>((previous, child) => {
    if (isElement(child)) {
      return [...previous, ...extractText(child.props.children)]
    }
    if (isLeaf(child)) {
      return [...previous, child]
    }
    return previous
  }, [])
}

function isElement(child: ReactNode): child is ReactElement {
  return (child as ReactElement)?.props !== undefined
}

function isLeaf(child: React.ReactNode): child is 'string' | 'number' {
  return typeof child === 'string' || typeof child === 'number'
}
