import React, { PropsWithChildren } from 'react'
import { BiLogoJavascript, BiLogoTypescript, BiLogoReact } from 'react-icons/bi'
import MdxCodeTitleBtn from './MdxCodeTitleBtn'

type Props = {
  language: 'js' | 'javascript' | 'ts' | 'typescript' | 'jsx' | 'tsx'
}

function MdxCodeTitle({ children, language }: PropsWithChildren<Props>) {
  const Icons = {
    js: () => <BiLogoJavascript size={18} className="mr-2 fill-yellow-300" />,
    javascript: () => <BiLogoJavascript size={18} className="mr-2 fill-yellow-300" />,
    ts: () => <BiLogoTypescript size={18} className="mr-2 fill-blue-500" />,
    typescript: () => <BiLogoTypescript size={18} className="mr-2 fill-blue-500" />,
    jsx: () => <BiLogoReact size={18} className="mr-2 fill-blue-500" />,
    tsx: () => <BiLogoReact size={18} className="mr-2 fill-blue-500" />,
  }
  const Icon = Icons[language]

  return (
    <div className="flex items-center w-full h-12 overflow-hidden border-b border-black rounded-tl-md rounded-tr-md bg-gray-700/50">
      <div className="hidden h-8 items-center space-x-1.5 px-3 md:flex">
        <div className="h-[12px] w-[12px] rounded-full bg-red-400"></div>
        <div className="h-[12px] w-[12px] rounded-full bg-orange-400"></div>
        <div className="h-[12px] w-[12px] rounded-full bg-green-400"></div>
      </div>

      <div className="flex items-center h-full min-w-0 px-4 py-3 text-sm font-medium leading-none border border-b-0 select-none border-slate-700/50 text-slate-400 bg-gray-600/50">
        <Icon />
        <div className="text-sm truncate">{children}</div>
      </div>

      <div className="flex-shrink-0 ml-auto">
        <div className="px-4">
          <MdxCodeTitleBtn />
        </div>
      </div>
    </div>
  )
}

export default MdxCodeTitle
