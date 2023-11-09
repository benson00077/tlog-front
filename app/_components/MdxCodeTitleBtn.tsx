'use client'
import React, { useState } from 'react'
import { HiOutlineClipboardDocumentCheck, HiOutlineClipboardDocument } from 'react-icons/hi2'

function MdxCodeTitleBtn() {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <button
      className="flex items-center justify-center w-8 h-8 hover:text-slate-300"
      onClick={(e) => {
        let curr = e.currentTarget as HTMLElement
        while (curr) {
          curr = curr.parentNode as HTMLElement
          if (curr.getAttributeNames().includes('data-rehype-pretty-code-title')) break
          if (!curr) return new Error('Node not found')
        }
        const codeEle = curr.nextElementSibling?.querySelector('code')
        if (!codeEle) return new Error('Node not found')
        const codeContent = codeEle.textContent
        if (!codeContent) return new Error('Node not found')
        navigator.clipboard.writeText(codeContent).then(() => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        })
      }}
    >
      {isCopied ? (
        <HiOutlineClipboardDocumentCheck size={20} className="text-green-400" />
      ) : (
        <HiOutlineClipboardDocument size={20} />
      )}
    </button>
  )
}

export default MdxCodeTitleBtn
