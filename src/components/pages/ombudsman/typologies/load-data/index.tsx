'use client'
import { TypologyData } from '@/@types'
import {
  Accordion,
  AccordionTitle,
  BackButton,
  FormatStatus,
} from '@/components'
import { useFetch } from '@/utils/hooks'
import { Fragment, useCallback, useEffect, useRef } from 'react'
import { EditTypologyButton, CreateTypologyButton } from '../form-button'
import { MdInfoOutline } from 'react-icons/md'
import { formatDatetime } from '@/utils'
import { HistoricalTypology } from '../historical-typologies'

export function LoadTypologyData(props: { typologyId: number | string }) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<TypologyData>(
    `/V1/categories/${props.typologyId}/`,
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
            <EditTypologyButton
              typologyData={data}
              revalidate={() => {
                update.current = true
                revalidate()
              }}
            />
          )}
          <CreateTypologyButton />
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

      <HistoricalTypology
        revalidate={update.current}
        onRevalidate={handleSetupdate}
        typologyId={Number(props.typologyId)}
      />
    </Fragment>
  )
}
