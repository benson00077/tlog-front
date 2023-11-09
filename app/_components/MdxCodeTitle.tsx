import React, { PropsWithChildren } from 'react'
import { BiLogoJavascript, BiLogoTypescript, BiLogoReact } from 'react-icons/bi'

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
          <button className="flex items-center justify-center w-8 h-8 hover:text-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              ></path>
            </svg>
          </button>
          {/* copy */}
        </div>
      </div>
    </div>
  )
}

export default MdxCodeTitle
