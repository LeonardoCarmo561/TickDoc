'use client'

import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
} from 'react-icons/rx'

export function Editor() {
  const tipTap = useEditor({
    extensions: [StarterKit],
    content: '<p>Descreva aqui sua manifestalção</p>',
  })

  return (
    <>
      <EditorContent
        editor={tipTap}
        className="selection:bg-blue-500 selection:text-zinc-200"
      />
      {tipTap && (
        <BubbleMenu
          editor={tipTap}
          className="bg-blue-400 focus:bg-blue-800 text-zinc-800 divide-x divide-zinc-400 rounded-lg flex overflow-hidden border border-zinc-500"
        >
          <button
            data-active={tipTap.isActive('bold')}
            onClick={() => tipTap.chain().focus().toggleBold().run()}
            className="data-[active=true]:bg-blue-100 data-[active=true]:text-black p-2 font-medium leading-none flex items-center gap-1.5 hover:text-zinc-50 hover:bg-blue-600 transition-colors"
          >
            <RxFontBold className="w-5 h-5" />
          </button>
          <button
            data-active={tipTap.isActive('italic')}
            onClick={() => tipTap.chain().focus().toggleItalic().run()}
            className="data-[active=true]:bg-blue-100 data-[active=true]:text-black p-2 font-medium leading-none flex items-center gap-1.5 hover:text-zinc-50 hover:bg-blue-600 transition-colors"
          >
            <RxFontItalic className="w-5 h-5" />
          </button>
          <button className="p-2 font-medium leading-none flex items-center gap-1.5 hover:text-zinc-50 hover:bg-blue-600 transition-colors">
            <RxStrikethrough className="w-5 h-5" />
          </button>
          <button className="p-2 font-medium leading-none flex items-center gap-1.5 hover:text-zinc-50 hover:bg-blue-600 transition-colors">
            <RxCode className="w-5 h-5" />
          </button>
        </BubbleMenu>
      )}
    </>
  )
}
