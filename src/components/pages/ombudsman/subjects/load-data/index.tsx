'use client'
import { SubjectDetailsData } from '@/@types'
import {
  Accordion,
  AccordionTitle,
  BackButton,
  FormatStatus,
} from '@/components'
import { useFetch } from '@/utils/hooks'
import { Fragment, useCallback, useEffect, useRef } from 'react'
import { EditSubjectButton } from '../form-button/edit-button'
import { CreateSubjectButton } from '../form-button/create-button'
import { MdInfoOutline } from 'react-icons/md'
import { formatDatetime } from '@/utils'
import Link from 'next/link'
import { HistoricalSubject } from '../historical-subjects'

export function LoadSubjectData(props: {
  subjectId: number | string
  moduleTitle: string
}) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<SubjectDetailsData>(
    `/V1/subjects/${props.subjectId}/`,
  )

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  return (
    <Fragment>
      <h2 className="text-lg">{data?.name || 'Carregando...'}</h2>
      <div className="flex w-full gap-2 border border-blue-500 p-2 rounded-xl dark:bg-zinc-700 bg-white shadow-lg">
        <div className="gap-2 flex">
          {data && (
            <EditSubjectButton
              subjectData={data}
              revalidate={() => {
                update.current = true
                revalidate()
              }}
            />
          )}
          <CreateSubjectButton />
        </div>
        <BackButton />
      </div>

      <Accordion
        title={
          <AccordionTitle
            title="Informações"
            icon={<MdInfoOutline className="w-8 h-8 sm:w-10 sm:h-10" />}
            isLoading={isLoading}
          />
        }
      >
        {isLoading && <span>Carregando...</span>}
        {data && (
          <div className="flex flex-col w-fit gap-2 flex-wrap">
            <div className="flex gap-1 w-fit">
              <span>Status:</span>
              <FormatStatus status={data.status} />
            </div>
            <span>Nome: {data.name}</span>
            <span className="flex gap-1 flex-wrap">
              Setores:{' '}
              {data.sectors.map((sector) => (
                <Link
                  key={sector[1]}
                  title={sector[0]}
                  href={`/ombudsman/${props.moduleTitle}/sectors/details/${sector[1]}`}
                  className="flex min-w-fit bg-blue-500 py-1 px-2 rounded-xl"
                >
                  <span className="line-clamp-1 text-ellipsis">
                    {sector[0]}
                  </span>
                </Link>
              ))}
            </span>
            <span>Criado em: {formatDatetime(data.created_at)}</span>
            <span>
              Última atualização:{' '}
              {data.updated_at !== data.created_at
                ? formatDatetime(data.updated_at)
                : 'Não houve atualizações'}
            </span>
          </div>
        )}
      </Accordion>

      <HistoricalSubject
        revalidate={update.current}
        onRevalidate={handleSetupdate}
        subjectId={Number(props.subjectId)}
      />
    </Fragment>
  )
}
