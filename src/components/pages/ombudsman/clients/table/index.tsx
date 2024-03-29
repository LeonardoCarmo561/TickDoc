'use client'
// React
import { useEffect, useMemo, useState } from 'react'

// Next
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Others
import { MdInfoOutline, MdSearch } from 'react-icons/md'

// Local
import { LoadingSpinner, FormatStatus, Tooltip } from '@/components'
import { ClientData, TotalCount } from '@/@types'
import { formatDate, updateQuery } from '@/utils'

// Parent Directory
import { CreateClientButton } from '../form-button'
import { useFetch } from '@/utils/hooks'

export function ClientsTable({
  queryParams,
}: {
  queryParams: { [key: string]: string }
}) {
  const [inputSearch, setInputSearch] = useState('')
  const item = useMemo(() => {
    return String(queryParams.item || '0')
  }, [queryParams])
  const total = useMemo(() => {
    return String(queryParams.total || '10')
  }, [queryParams])
  const search = useMemo(() => {
    const searchValue = queryParams.search || ''
    setInputSearch(String(searchValue))
    return searchValue
  }, [queryParams])
  const status = useMemo(() => {
    return String(queryParams.status || '')
  }, [queryParams])

  const { data, error, isLoading, revalidate } = useFetch<
    TotalCount<ClientData>
  >('/V1/institutions/', { item, total, search, status })
  const { push } = useRouter()

  useEffect(() => {
    revalidate()
  }, [item, total, search, status, revalidate])

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

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
              const currentQuery = updateQuery(
                queryParams,
                ['search'],
                [inputSearch],
              )
              push(`clients?${currentQuery}`)
            }}
            className="p-1 w-7 h-7 rounded-full hover:bg-zinc-500 hover:bg-opacity-30 transition-colors focus:bg-zinc-500 focus:bg-opacity-30 outline-none"
          >
            <MdSearch className="w-5 h-5" />
          </button>
        </div>
        <CreateClientButton revalidate={revalidate} />
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
            {data &&
              data.results.map((row) => (
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

          {((data && data.count === 0 && !isLoading) ||
            (data && data.count < 10)) && (
            <tfoot>
              {data.count === 0 && !isLoading && (
                <tr>
                  <td className="py-3">
                    <span className="text-zinc-700 dark:text-zinc-200 px-2">
                      Nenhum registro encontrado
                    </span>
                  </td>
                </tr>
              )}
              {data.count < 10 && (
                <tr>
                  <td colSpan={5} className="py-2">
                    <div className="flex flex-1 items-center justify-center">
                      <select
                        onChange={(e) => {
                          const currentQuery = updateQuery(
                            queryParams,
                            ['total'],
                            [e.target.value],
                          )
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
