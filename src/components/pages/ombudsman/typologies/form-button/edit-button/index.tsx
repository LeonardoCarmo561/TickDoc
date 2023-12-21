'use client'

import { useState } from 'react'
import { TypologiesForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { TypologyData } from '@/@types'

export function EditTypologyButton({
  typologyData,
  revalidate,
}: {
  typologyData: TypologyData
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
      {typologyData && isOpen && (
        <TypologiesForm
          open={isOpen}
          create={false}
          revalidate={revalidate}
          typologyData={typologyData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
