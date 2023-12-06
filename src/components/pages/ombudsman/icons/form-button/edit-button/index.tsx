'use client'

import { useState } from 'react'
import { IconsForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { IconData } from '@/@types'

export function EditIconButton({
  iconData,
  revalidate,
}: {
  iconData: IconData
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
      {iconData && isOpen && (
        <IconsForm
          open={isOpen}
          create={false}
          iconData={iconData}
          revalidate={revalidate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
