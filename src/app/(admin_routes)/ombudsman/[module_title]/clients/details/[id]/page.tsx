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
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ClientDetailsPage({ params }: { params: DetailsPage }) {
  const [clientData, setClientData] = useState<ClientData>()
  const [isLoading, setIsLoading] = useState(true)
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    if (update) {
      setIsLoading(true)
      getClientDetails(params.id)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            setClientData(result)
          }
        })
        .finally(() => {
          setIsLoading(false)
          setUpdate(false)
        })
    }
  }, [params.id, update])

  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <h2 className="text-lg">{clientData?.name || 'Carregando...'}</h2>
      <div className="flex w-full gap-2 border border-blue-500 p-2 rounded-xl dark:bg-zinc-700 bg-white shadow-lg">
        <div className="gap-2 flex">
          {clientData && <EditClientButton clientData={clientData} />}
          <CreateClientButton />
        </div>
        <BackButton />
      </div>

      <div className="flex w-full items-center justify-center">
        {isLoading && !clientData && (
          <LoadingSpinner height="h-10" width="w-10" />
        )}
        {clientData && (
          <Image
            src={clientData.logo}
            alt={clientData.name}
            width={500}
            height={0}
            className="max-w-[300px] h-auto"
            priority
          />
        )}
      </div>

      <HistoricalClient clientId={Number(params.id)} />
    </main>
  )
}
