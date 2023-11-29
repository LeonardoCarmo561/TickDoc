'use client'
import { ClientData } from '@/@types'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Tooltip } from '@/components/tooltip'
import { getAllClients } from '@/services/clients-services'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { MdInfoOutline, MdSearch } from 'react-icons/md'
import { CreateClientButton } from '../form-button'
import { FormatStatus, formatDate } from '@/utils'

export function ClientsTable({
  queryParams,
}: {
  queryParams: { [key: string]: string | string[] }
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [inputSearch, setInputSearch] = useState('')
  const [clients, setClients] = useState<ClientData[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const { push } = useRouter()
  const searchParams = useSearchParams()

  const item = useMemo(() => {
    return searchParams.get('item') || '0'
  }, [searchParams])
  const total = useMemo(() => {
    return searchParams.get('total') || '10'
  }, [searchParams])
  const search = useMemo(() => {
    const searchValue = searchParams.get('search') || ''
    setInputSearch(searchValue)
    return searchValue
  }, [searchParams])
  const status = useMemo(() => {
    return searchParams.get('status') || ''
  }, [searchParams])

  useEffect(() => {
    const getClients = async () => {
      setIsLoading(true)
      const result = await getAllClients(item, total, search, status)
      if (result instanceof Error) {
        alert(result.message)
      } else {
        setClients(result.results)
        setTotalCount(result.count)
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
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <button
            onClick={() => {
              let currentQuery = ''
              let hasSearch = false
              Object.keys(queryParams).forEach((queryKey) => {
                if (queryKey !== 'search') {
                  currentQuery += `${queryKey}=${queryParams[queryKey]}&`
                } else {
                  hasSearch = true
                  currentQuery += `search=${inputSearch}&`
                }
              })

              if (!hasSearch) {
                currentQuery += `search=${inputSearch}&`
              }

              push(`clients?${currentQuery}`)
            }}
            className="p-1 w-7 h-7 rounded-full hover:bg-zinc-500 hover:bg-opacity-30 transition-colors focus:bg-zinc-500 focus:bg-opacity-30 outline-none"
          >
            <MdSearch className="w-5 h-5" />
          </button>
        </div>
        <CreateClientButton />
      </div>

      <div
        id="table-container"
        className="w-full rounded-xl border border-blue-500 mt-2 overflow-auto flex-wrap bg-zinc-50 dark:bg-zinc-900 flex flex-col"
      >
        <table className="w-full divide-y divide-zinc-500">
          <thead>
            <tr>
              <th align="center" className="py-3 px-3"></th>
              <th align="center" className="py-3 px-3">
                Nome
              </th>
              <th align="center" className="py-3 px-3">
                CI Expira Em
              </th>
              <th align="center" className="py-3 px-3">
                Ouvidoria Expira Em
              </th>
              <th align="center" className="py-3 px-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-500">
            {isLoading && (
              <tr>
                <td colSpan={5}>
                  <div className="p-3 overflow-hidden flex-nowrap flex text-lg gap-2 items-center justify-center">
                    <LoadingSpinner />
                    <span>carregando...</span>
                  </div>
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
                  {row.ci_expires_at
                    ? formatDate(row.ci_expires_at)
                    : 'Não definido'}
                </td>
                <td align="center" className="py-3">
                  {row.ombudsman_expires_at
                    ? formatDate(row.ombudsman_expires_at)
                    : 'Não definido'}
                </td>
                <td align="center" className="py-3 pr-2">
                  <FormatStatus status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>

          {((totalCount === 0 && !isLoading) || totalCount < 10) && (
            <tfoot>
              {totalCount === 0 && !isLoading && (
                <tr>
                  <td className="py-3">
                    <span className="text-zinc-700 dark:text-zinc-200 px-2">
                      Nenhum registro encontrado
                    </span>
                  </td>
                </tr>
              )}
              {totalCount < 10 && (
                <tr>
                  <td colSpan={5} className="py-2">
                    <div className="flex flex-1 items-center justify-center">
                      <select
                        onChange={(e) => {
                          let currentQuery = ''
                          let hasTotal = false
                          Object.keys(queryParams).forEach((queryKey) => {
                            if (queryKey !== 'total') {
                              currentQuery += `${queryKey}=${queryParams[queryKey]}&`
                            } else {
                              hasTotal = true
                              currentQuery += `total=${e.target.value}&`
                            }
                          })

                          if (!hasTotal) {
                            currentQuery += `total=${e.target.value}&`
                          }

                          push(`clients?${currentQuery}`)
                        }}
                        className="p-2 border border-zinc-500 rounded-xl bg-inherit"
                      >
                        <option value={10} className="dark:bg-zinc-900">
                          10
                        </option>
                        <option value={20} className="dark:bg-zinc-900">
                          20
                        </option>
                        <option value={30} className="dark:bg-zinc-900">
                          30
                        </option>
                        <option value={40} className="dark:bg-zinc-900">
                          40
                        </option>
                        <option value={50} className="dark:bg-zinc-900">
                          50
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
              )}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}
