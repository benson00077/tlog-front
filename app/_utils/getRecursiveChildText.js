/** retrieve text back cause rehypePrettyCode have parsed then into ReactNode with nested <span> */
export default function getRecursiveChildText(reactNode) {
  const children = reactNode.props?.children || undefined
  if (Array.isArray(reactNode)) {
    // Multiple children
    const joinedNodes = []
    reactNode.forEach((node) => {
      if (typeof node === 'object') joinedNodes.push(getRecursiveChildText(node))
      else if (typeof node === 'string') joinedNodes.push(node)
    })
    return joinedNodes.join(' ')
  }
  if (children === undefined) {
    if (typeof reactNode === 'string') return reactNode
    else return ' '
  }
  if (typeof children === 'object') {
    // Found direct child
    return getRecursiveChildText(reactNode.props.children)
  }
  if (typeof children === 'string') {
    // Found searchable string
    return reactNode.props.children
  }
}
