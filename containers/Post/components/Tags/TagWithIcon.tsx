import React from 'react'
import { SiTypescript, SiJavascript, SiCss3 } from 'react-icons/si'
import { FaReact } from 'react-icons/fa'
import { MdOutlineComputer, MdOutlineGTranslate } from 'react-icons/md'

export const iconsMap = {
  JavaScript: { component: SiJavascript, fill: '#f7df1e', style: { backgroundColor: 'black' } },
  TypeScript: { component: SiTypescript, fill: '#007acc', style: { borderRadius: '5px' } },
  CSS: { component: SiCss3, fill: '#33a9dc', style: {} },
  React: { component: FaReact, fill: '#61dafb', style: {} },
  WebDev: { component: MdOutlineComputer, fill: '#778899', style: {} },
  Translation: { component: MdOutlineGTranslate, fill: 'saddlebrown', style: {} },
}
export type tagWithIcon = keyof typeof iconsMap

type TagBadgeProps = {
  tag: string
  size: number
}
function TagWithIcon({ tag, size }: TagBadgeProps) {
  const tagIcon = iconsMap[tag as tagWithIcon]
  const Icon: typeof FaReact = tagIcon?.component

  return <div>{tagIcon ? <Icon size={size} fill={tagIcon.fill} style={tagIcon.style} /> : tag}</div>
}

export default TagWithIcon
