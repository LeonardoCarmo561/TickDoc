'use client'
import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'

export function BackButton() {
  const { back } = useRouter()

  return (
    <button
      type="button"
      onClick={() => back()}
      className="flex gap-1 items-center justify-center border border-blue-500 rounded-xl px-2 text-blue-500 dark:text-white"
    >
      <MdArrowBack className="text-blue-500" />
      VOLTAR
    </button>
  )
}
