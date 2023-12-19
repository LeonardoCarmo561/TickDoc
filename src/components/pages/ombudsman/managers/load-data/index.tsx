'use client'
import { AdminUserData } from '@/@types'
import {
  Accordion,
  AccordionTitle,
  BackButton,
  FormatStatus,
} from '@/components'
import { useFetch } from '@/utils/hooks'
import { Fragment, useCallback, useEffect, useRef } from 'react'
import { EditManagerButton } from '../form-button/edit-button'
import { CreateManagerButton } from '../form-button/create-button'
import { MdInfoOutline } from 'react-icons/md'
import { formatDatetime } from '@/utils'
import { HistoricalManager } from '../historical-manager'

export function LoadManagerData(props: { userId: number | string }) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<AdminUserData>(
    `/V1/adminusers/${props.userId}/`,
  )

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  return (
    <Fragment>
      <h2 className="text-lg">{data?.username || 'Carregando...'}</h2>
      <div className="flex w-full gap-2 border border-blue-500 p-2 rounded-xl dark:bg-zinc-700 bg-white shadow-lg">
        <div className="gap-2 flex">
          {data && (
            <EditManagerButton
              adminUserData={data}
              revalidate={() => {
                update.current = true
                revalidate()
              }}
            />
          )}
          <CreateManagerButton />
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
            <span>Nome: {data.username}</span>
            <div className="flex gap-1 w-fit">
              <span>Status:</span>
              <FormatStatus status={data.is_active} />
            </div>
            <div className="flex gap-1 w-fit">
              <span>Confirmado:</span>
              <FormatStatus
                status={data.is_confirmed}
                active="Sim"
                inactive="Não"
              />
            </div>
            <span>E-mail: {data.email}</span>
            <span>
              Último LogIn:{' '}
              {data.last_login
                ? formatDatetime(data.last_login)
                : 'Ainda não entrou'}
            </span>
            <span>Documento: {data.document_number}</span>
            <span>Quantidade de LogIns: {data.sign_in_count}</span>
          </div>
        )}
      </Accordion>

      <HistoricalManager
        revalidate={update.current}
        userId={Number(props.userId)}
        onRevalidate={handleSetupdate}
      />
    </Fragment>
  )
}
