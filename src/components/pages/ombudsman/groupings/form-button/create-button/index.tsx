'use client'

import { useState } from 'react'
import { GroupingsForm } from '../../form'
import { MdAdd } from 'react-icons/md'

export function CreateGroupingButton({
  revalidate,
}: {
  revalidate?: () => void
}) {
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
      <GroupingsForm
        create
        open={isOpen}
        revalidate={revalidate}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
