'use client'

import { useState } from 'react'
import { InternalUsersForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { InternalUserData } from '@/@types'

export function EditInternalUserButton({
  internalUserdData,
  revalidate,
}: {
  internalUserdData: InternalUserData
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
      {internalUserdData && isOpen && (
        <InternalUsersForm
          open={isOpen}
          create={false}
          internalUserData={internalUserdData}
          revalidate={revalidate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
