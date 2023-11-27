'use client'
import { ClientData } from '@/@types'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Tooltip } from '@/components/tooltip'
import { getAllClients } from '@/services/clients-services'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { MdInfoOutline, MdSearch } from 'react-icons/md'
import { FormButton } from '../form-button'

export function ClientsTable() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const item = useMemo(() => {
    return searchParams.get('item') || '0'
  }, [searchParams])
  const total = useMemo(() => {
    return searchParams.get('total') || '10'
  }, [searchParams])
  const search = useMemo(() => {
    return searchParams.get('search') || ''
  }, [searchParams])
  const status = useMemo(() => {
    return searchParams.get('status') || ''
  }, [searchParams])

  const [clients, setClients] = useState<ClientData[]>([])
  useEffect(() => {
    const getClients = async () => {
      setIsLoading(true)
      const result = await getAllClients(item, total, search, status)
      if (result instanceof Error) {
        alert(result.message)
      } else {
        setClients(result.results)
      }

      setIsLoading(false)
    }

    getClients()
  }, [item, search, status, total])

  return (
    <div className="h-fit">
      <div
        id="toolbar"
        className="p-2 mt-2 flex items-center gap-2 rounded-xl border border-blue-500 bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
      >
        <div className="flex flex-1 gap-1 items-center">
          <input
            placeholder="Pesquisar..."
            className="w-full max-w-xs p-2 rounded-xl bg-inherit border border-zinc-500"
          />
          <button className="p-1 w-7 h-7 rounded-full hover:bg-zinc-500 hover:bg-opacity-30 transition-colors focus:bg-zinc-500 focus:bg-opacity-30 outline-none">
            <MdSearch className="w-5 h-5" />
          </button>
        </div>
        <FormButton create />
      </div>

      <div
        id="table-container"
        className="w-full rounded-xl border border-blue-500 mt-2 overflow-auto flex-wrap bg-zinc-50 dark:bg-zinc-900 flex flex-col"
      >
        <table className="w-full divide-y divide-zinc-500">
          <thead>
            <tr>
              <th align="center" className="py-3"></th>
              <th align="center" className="py-3">
                Nome
              </th>
              <th align="center" className="py-3">
                CI Expira Em
              </th>
              <th align="center" className="py-3">
                Ouvidoria Expira Em
              </th>
              <th align="center" className="py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-500">
            {isLoading && (
              <tr>
                <td
                  colSpan={5}
                  className="p-3 overflow-hidden flex-nowrap flex text-lg gap-2 items-center justify-center"
                >
                  <LoadingSpinner />
                  <span>carregando...</span>
                </td>
              </tr>
            )}
            {clients.map((row) => (
              <tr key={row.id}>
                <td align="center" className="py-3">
                  <Tooltip title="detalhes" position="rigth">
                    <Link href={`clients/details/${row.id}`} tabIndex={-1}>
                      <button className="text-2xl p-2 text-blue-500 focus:bg-blue-500 focus:bg-opacity-10 hover:bg-blue-500 hover:bg-opacity-10 rounded-full outline-none">
                        <MdInfoOutline />
                      </button>
                    </Link>
                  </Tooltip>
                </td>
                <td align="center" className="py-3">
                  {row.name}
                </td>
                <td align="center" className="py-3">
                  Não possui CI
                </td>
                <td align="center" className="py-3">
                  Não possui ouvidoria
                </td>
                <td align="center" className="py-3 pr-2">
                  <span className="bg-red-300 text-xs font-semibold text-black w-full rounded-xl p-1 px-2">
                    Inativo
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
