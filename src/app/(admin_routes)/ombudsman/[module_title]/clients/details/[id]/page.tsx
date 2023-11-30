'use client'
import { ClientData } from '@/@types'
import { DetailsPage } from '@/@types/params'
import { BackButton } from '@/components/back-button'
import {
  CreateClientButton,
  EditClientButton,
} from '@/components/pages/ombudsman/clients/form-button'
import { getClientDetails } from '@/services/clients-services'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

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
    <main className="flex flex-col gap-2 pr-2">
      <h2 className="text-lg">{clientData?.name || 'Carregando...'}</h2>
      <div className="flex w-full gap-2 border border-blue-500 p-2 rounded-xl dark:bg-zinc-700 bg-white shadow-lg">
        <div className="gap-2 flex">
          {clientData && <EditClientButton clientData={clientData} />}
          <CreateClientButton />
        </div>
        <BackButton />
      </div>

      <div className="flex w-full items-center justify-center">
        {clientData && (
          <Image
            src={clientData.logo}
            alt={clientData.name}
            width={500}
            height={0}
            className="max-w-[300px] h-auto"
          />
        )}
      </div>

      <section className="border border-blue-500 overflow-hidden flex flex-col w-full max-h-14 bg-white dark:bg-zinc-700 shadow-lg p-2 rounded-xl [&:has(input:checked)]:max-h-fit">
        <div className="relative h-12 min-h-[3rem] flex w-full items-center justify-between rounded-t-xl overflow-hiddenx ">
          <input
            type="checkbox"
            className="[all:unset] [cursor:pointer] [position:absolute] [inset:0] peer hover:bg-blue-500 hover:bg-opacity-30 focus:bg-blue-500 focus:bg-opacity-30"
          />
          <h3 className="text-lg font-semibold">Histórico</h3>
          <MdExpandMore className="peer-checked:hidden block h-6 w-6" />
          <MdExpandLess className="peer-checked:block hidden h-6 w-6" />
        </div>

        <span>Isso é aqui conte</span>
      </section>
    </main>
  )
}
