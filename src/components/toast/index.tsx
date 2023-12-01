'use client'

import { ToastProps } from '@/@types'
import { useToastContext } from '@/utils/hooks'
import { MdClose } from 'react-icons/md'

export function Toast({ message, type, id }: ToastProps) {
  const { removeToast } = useToastContext()

  return (
    <div className="relative p-2 bg-zinc-100 dark:bg-zinc-800 shadow-2xl border border-zinc-300 dark:border-zinc-700 h-full max-h-28 w-full max-w-xs rounded-xl">
      <span>type: {type}</span>
      <span>message: {message}</span>
      <button
        type="button"
        onClick={() => removeToast(id)}
        className="p-1 rounded-full absolute right-0 top-0"
      >
        <MdClose className="w-4 h-4" />
      </button>
    </div>
  )
}
