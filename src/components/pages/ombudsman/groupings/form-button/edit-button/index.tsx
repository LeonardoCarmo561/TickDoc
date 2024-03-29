'use client'

import { useState } from 'react'
import { GroupingsForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { GroupingData } from '@/@types'

export function EditGroupingButton({
  groupingData,
  revalidate,
}: {
  groupingData: GroupingData
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
      {groupingData && isOpen && (
        <GroupingsForm
          open={isOpen}
          create={false}
          revalidate={revalidate}
          groupingData={groupingData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
