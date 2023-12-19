'use client'

import { useState } from 'react'
import { SubjectsForm } from '../../form'
import { MdEdit } from 'react-icons/md'
import { SubjectDetailsData } from '@/@types'

export function EditSubjectButton({
  subjectData,
  revalidate,
}: {
  subjectData: SubjectDetailsData
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
      {subjectData && isOpen && (
        <SubjectsForm
          open={isOpen}
          create={false}
          revalidate={revalidate}
          subjectData={subjectData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
