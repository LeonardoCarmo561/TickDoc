'use client'

import { useState } from 'react'
import { WorkfFieldsForm } from '../../form'
import { MdAdd } from 'react-icons/md'

export function CreateWorkFieldButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen((oldvalue) => !oldvalue)}
        className="text-xs flex text-ellipsis flex-nowrap w-auto flex-row gap-1 items-center justify-between p-2 bg-blue-500 text-white font-bold rounded-xl hover:shadow-xl transition-all"
      >
        <span className="text-xl">
          <MdAdd />
        </span>
        NOVO
      </button>
      <WorkfFieldsForm open={isOpen} onClose={() => setIsOpen(false)} create />
    </>
  )
}
