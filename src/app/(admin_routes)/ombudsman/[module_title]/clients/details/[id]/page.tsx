'use client'
import { ClientData } from '@/@types'
import { DetailsPage } from '@/@types/params'
import {
  CreateClientButton,
  EditClientButton,
} from '@/components/pages/ombudsman/clients/form-button'
import { getClientDetails } from '@/services/clients-services'
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
    <main>
      <CreateClientButton />
      {clientData && <EditClientButton clientData={clientData} />}
      {isLoading && <span>Carregando...</span>}

      <span className=" ">{JSON.stringify(clientData)}</span>
    </main>
  )
}
