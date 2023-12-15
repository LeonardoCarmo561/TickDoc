'use client'
import { SectorData } from '@/@types'
import {
  Accordion,
  AccordionTitle,
  BackButton,
  FormatStatus,
} from '@/components'
import { getSector } from '@/services'
import { useFetch } from '@/utils/hooks'
import { Fragment, useCallback, useEffect, useRef } from 'react'
import { EditSectorButton } from '../form-button/edit-button'
import { CreateSectordButton } from '../form-button/create-button'
import { MdInfoOutline } from 'react-icons/md'
import { formatDatetime } from '@/utils'
import { HistoricalSector } from '../historical-sectors'

export function LoadSectorData(props: { sectorId: number | string }) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<SectorData>(
    getSector(props.sectorId),
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
            <EditSectorButton
              sectorData={data}
              revalidate={() => {
                update.current = true
                revalidate()
              }}
            />
          )}
          <CreateSectordButton />
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
          <div className="flex flex-col w-fit gap-2">
            <div className="flex gap-1 w-fit">
              <span>Status:</span>
              <FormatStatus status={data.status} />
            </div>
            <span>Nome: {data.name}</span>
            <span>
              Agrupamento:{' '}
              {data.grouping_id
                ? data.grouping_id.name
                : 'Não possui agrupamento'}
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

      <HistoricalSector
        revalidate={update.current}
        sectorId={Number(props.sectorId)}
        onRevalidate={handleSetupdate}
      />
    </Fragment>
  )
}
