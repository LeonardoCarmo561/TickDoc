'use client'
import { ClientData } from '@/@types'
import { getClientDetails } from '@/services'
import { useFetch } from '@/utils/hooks'
import { Fragment, useCallback, useEffect, useRef } from 'react'
import { CreateClientButton, EditClientButton } from '../form-button'
import { BackButton, LoadingSpinner } from '@/components'
import Image from 'next/image'
import { HistoricalClient } from '../historical'

export function LoadData(props: { clientId: number | string }) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<ClientData>(
    getClientDetails(props.clientId),
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
            <EditClientButton
              clientData={data}
              revalidate={() => {
                update.current = true
                revalidate()
              }}
            />
          )}
          <CreateClientButton />
        </div>
        <BackButton />
      </div>

      <div className="flex w-full items-center justify-center">
        {isLoading && !data && <LoadingSpinner height="h-10" width="w-10" />}
        {data && (
          <Image
            src={data.logo}
            alt={data.name}
            width={500}
            height={0}
            className="max-w-[300px] h-auto"
            priority
          />
        )}
      </div>

      <HistoricalClient
        revalidate={update.current}
        clientId={Number(props.clientId)}
        onRevalidate={handleSetupdate}
      />
    </Fragment>
  )
}
