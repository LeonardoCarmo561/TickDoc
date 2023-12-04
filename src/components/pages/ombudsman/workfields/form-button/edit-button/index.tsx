'use client'

import { useState } from 'react'
import { WorkfFieldsForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { WorkFieldData } from '@/@types'

export function EditWorkFieldButton({
  workFieldData,
  revalidate,
}: {
  workFieldData: WorkFieldData
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
          <MdEdit />
        </span>
        EDITAR
      </button>
      {workFieldData && isOpen && (
        <WorkfFieldsForm
          open={isOpen}
          create={false}
          workFieldData={workFieldData}
          revalidate={revalidate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
