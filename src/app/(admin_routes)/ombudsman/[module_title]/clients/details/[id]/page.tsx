'use client'
import { ClientData } from '@/@types'
import { DetailsPage } from '@/@types/params'
import { LoadingSpinner } from '@/components'
import { BackButton } from '@/components/back-button'
import {
  CreateClientButton,
  EditClientButton,
} from '@/components/pages/ombudsman/clients/form-button'
import { HistoricalClient } from '@/components/pages/ombudsman/clients/historical'
import { getClientDetails } from '@/services/clients-services'
import { useFetch } from '@/utils/hooks'
import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'

export default function ClientDetailsPage({ params }: { params: DetailsPage }) {
  const update = useRef(false)
  const handleSetupdate = useCallback(() => {
    update.current = false
  }, [])
  const { data, error, isLoading, revalidate } = useFetch<ClientData>(
    getClientDetails(params.id),
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
        clientId={Number(params.id)}
        onRevalidate={handleSetupdate}
      />
    </main>
  )
}
