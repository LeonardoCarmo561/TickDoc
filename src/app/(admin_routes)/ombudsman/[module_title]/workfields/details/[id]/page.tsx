'use client'
import { WorkFieldData } from '@/@types'
import { DetailsPage } from '@/@types/params'
import { Accordion, AccordionTitle, BackButton } from '@/components'
import { CreateWorkFieldButton } from '@/components/pages/ombudsman/workfields/form-button/create-button'
import { EditWorkFieldButton } from '@/components/pages/ombudsman/workfields/form-button/edit-button'
import { formatDatetime } from '@/utils'
import { useFetch } from '@/utils/hooks'
import { useEffect } from 'react'
import { MdInfoOutline } from 'react-icons/md'

export default function WorkFieldsDetailsPage(props: { params: DetailsPage }) {
  const { data, error, isLoading, revalidate } = useFetch<WorkFieldData>(
    `/V1/workfields/${props.params.id}/`,
  )

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <h2 className="text-lg">{data?.name || 'Carregando...'}</h2>
      <div className="flex w-full gap-2 border border-blue-500 p-2 rounded-xl dark:bg-zinc-700 bg-white shadow-lg">
        <div className="gap-2 flex">
          {data && (
            <EditWorkFieldButton workFieldData={data} revalidate={revalidate} />
          )}
          <CreateWorkFieldButton />
        </div>
        <BackButton />
      </div>
      {data && (
        <Accordion
          title={
            <AccordionTitle
              title="Informações"
              icon={<MdInfoOutline className="w-8 h-8 sm:w-10 sm:h-10" />}
              isLoading={isLoading}
            />
          }
        >
          <span>Nome: {data.name}</span>
          <span>Criado em: {formatDatetime(data.created_at)}</span>
          <span>Última atualização em: {formatDatetime(data.updated_at)}</span>
        </Accordion>
      )}
    </main>
  )
}
