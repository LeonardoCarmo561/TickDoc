'use client'
import { GroupingData } from '@/@types'
import {
  Accordion,
  AccordionTitle,
  BackButton,
  FormatStatus,
  LoadingSpinner,
} from '@/components'
import { getGrouping } from '@/services'
import { useFetch } from '@/utils/hooks'
import { Fragment, useCallback, useEffect, useRef } from 'react'
import { EditGroupingButton } from '../form-button/edit-button'
import { CreateGroupingButton } from '../form-button/create-button'
import { MdInfoOutline, MdSafetyDivider } from 'react-icons/md'
import { Environment, formatDatetime } from '@/utils'
import Image from 'next/image'
import { HistoricalGrouping } from '../historical-grouping'

export function LoadGroupingData(props: { iconId: number | string }) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<GroupingData>(
    getGrouping(props.iconId),
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
            <EditGroupingButton
              groupingData={data}
              revalidate={() => {
                update.current = true
                revalidate()
              }}
            />
          )}
          <CreateGroupingButton />
        </div>
        <BackButton />
      </div>

      <div className="my-2 flex items-center justify-center">
        {data ? (
          <Image
            alt={data.icon_name}
            src={
              Environment.NODE_ENV === 'development'
                ? `${Environment.URL_BASE}${data.icon_url}`
                : data.icon_url
            }
            width={80}
            height={80}
          />
        ) : (
          <LoadingSpinner height="h-10" width="w-10" />
        )}
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
            <span>Nome: {data.name}</span>
            <div className="flex gap-1 w-fit">
              <span>Status:</span>
              <FormatStatus status={data.status} />
            </div>
            <span>Ícone: {data.icon_name}</span>
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

      <Accordion
        title={
          <AccordionTitle
            title="Setores Cadastrados"
            icon={<MdSafetyDivider className="w-8 h-8 sm:w-10 sm:h-10" />}
            isLoading={false}
          />
        }
      >
        <span>Isso é o loading</span>
      </Accordion>

      <HistoricalGrouping
        revalidate={update.current}
        groupingId={Number(props.iconId)}
        onRevalidate={handleSetupdate}
      />
    </Fragment>
  )
}
