'use client'

// React
import { useEffect, useMemo, useState } from 'react'

// Local
import { SectorData } from '@/@types'
import { FormatStatus, LoadingSpinner, Tooltip } from '@/components'
import { MdInfoOutline, MdSearch } from 'react-icons/md'
import Link from 'next/link'
import { Environment, formatDatetime, updateQuery } from '@/utils'
import { useRouter } from 'next/navigation'
import { getAllSectors } from '@/services'
import Image from 'next/image'
import { CreateSectordButton } from '../form-button/create-button'

export function SectorsTable(props: {
  queryParams: { [key: string]: string }
}) {
  const { push } = useRouter()
  const [sectors, setSectors] = useState<SectorData[]>([])
  const [inputSearch, setInputSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [update, setUpdate] = useState(true)

  const item = useMemo(() => {
    return String(props.queryParams.item || '0')
  }, [props.queryParams])
  const total = useMemo(() => {
    return String(props.queryParams.total || '10')
  }, [props.queryParams])
  const search = useMemo(() => {
    const searchValue = props.queryParams.search || ''
    setInputSearch(String(searchValue))
    return searchValue
  }, [props.queryParams])

  useEffect(() => {
    getAllSectors(item, total, search)
      .then((res) => {
        if (res instanceof Error) {
          alert(res.message)
        } else {
          setSectors(res.results)
          setTotalCount(res.count)
        }
      })
      .finally(() => {
        setUpdate(false)
        setIsLoading(false)
      })
  }, [item, search, total, update])

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
                props.queryParams,
                ['search'],
                [inputSearch],
              )
              push(`sectors?${currentQuery}`)
            }}
            className="p-1 w-7 h-7 rounded-full hover:bg-zinc-500 hover:bg-opacity-30 transition-colors focus:bg-zinc-500 focus:bg-opacity-30 outline-none"
          >
            <MdSearch className="w-5 h-5" />
          </button>
        </div>
        <CreateSectordButton />
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
                Ícone
              </th>
              <th align="center" className="py-3 px-3">
                Nome
              </th>
              <th align="center" className="py-3 px-3">
                Agrupamento
              </th>
              <th align="center" className="py-3 px-3">
                Criado em
              </th>
              <th align="center" className="py-3 px-3">
                Última atualização em
              </th>
              <th align="center" className="py-3 px-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-500">
            {isLoading && (
              <tr>
                <td colSpan={6}>
                  <div className="p-3 overflow-hidden flex-nowrap flex text-lg gap-2 items-center justify-center">
                    <LoadingSpinner />
                    <span>carregando...</span>
                  </div>
                </td>
              </tr>
            )}
            {sectors.map((row) => (
              <tr key={row.id}>
                <td align="center" className="py-3">
                  <Tooltip title="detalhes" position="rigth">
                    <Link href={`sectors/details/${row.id}`} tabIndex={-1}>
                      <button className="text-2xl p-2 text-blue-500 focus:bg-blue-500 focus:bg-opacity-10 hover:bg-blue-500 hover:bg-opacity-10 rounded-full outline-none">
                        <MdInfoOutline />
                      </button>
                    </Link>
                  </Tooltip>
                </td>
                <td align="center" className="py-3">
                  <Image
                    alt={row.name}
                    src={String(
                      Environment.NODE_ENV === 'development'
                        ? `${Environment.URL_BASE}${row.icon}`
                        : row.icon,
                    )}
                    width={50}
                    height={50}
                    className="max-w-[50px] max-h-[50px] w-full h-full"
                  />
                </td>
                <td align="center" className="py-3">
                  {row.name}
                </td>
                <td align="center" className="py-3">
                  {String(row.grouping_id)}
                </td>
                <td align="center" className="py-3">
                  {row.created_at
                    ? formatDatetime(row.created_at)
                    : 'Não definido'}
                </td>
                <td align="center" className="py-3">
                  {row.updated_at && row.updated_at !== row.created_at
                    ? formatDatetime(row.updated_at)
                    : 'Não houve atualizações'}
                </td>
                <td align="center" className="py-3 pr-3">
                  <FormatStatus status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>

          {((totalCount === 0 && !isLoading) || totalCount > 10) && (
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
              {totalCount > 10 && (
                <tr>
                  <td colSpan={5} className="py-2">
                    <div className="flex flex-1 items-center justify-center">
                      <select
                        value={
                          props.queryParams.total
                            ? Number(props.queryParams.total)
                            : 10
                        }
                        onChange={(e) => {
                          const currentQuery = updateQuery(
                            props.queryParams,
                            ['total'],
                            [e.target.value],
                          )
                          push(`sectors?${currentQuery}`)
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
