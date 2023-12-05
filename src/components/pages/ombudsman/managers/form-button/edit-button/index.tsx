'use client'

import { useState } from 'react'
import { ManagersForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { AdminUserData } from '@/@types'

export function EditWorkFieldButton({
  adminUserData,
  revalidate,
}: {
  adminUserData: AdminUserData
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
      {adminUserData && isOpen && (
        <ManagersForm
          open={isOpen}
          create={false}
          adminUserData={adminUserData}
          revalidate={revalidate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
