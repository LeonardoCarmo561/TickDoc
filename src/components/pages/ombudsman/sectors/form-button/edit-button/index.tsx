'use client'

import { useState } from 'react'
import { SectorsForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { SectorData } from '@/@types'

export function EditSectorButton({
  sectorData,
  revalidate,
}: {
  sectorData: SectorData
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
      {sectorData && isOpen && (
        <SectorsForm
          open={isOpen}
          create={false}
          sectorData={sectorData}
          revalidate={revalidate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
