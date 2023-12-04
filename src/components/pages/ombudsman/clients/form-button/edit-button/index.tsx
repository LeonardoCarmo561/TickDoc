'use client'

import { useState } from 'react'
import { ClientsForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { ClientData } from '@/@types'

export function EditClientButton({
  clientData,
  revalidate,
}: {
  clientData: ClientData
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
      {isOpen && clientData && (
        <ClientsForm
          open={isOpen}
          create={false}
          clientData={clientData}
          onClose={() => setIsOpen(false)}
          revalidate={revalidate}
        />
      )}
    </>
  )
}
