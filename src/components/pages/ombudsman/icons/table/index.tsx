'use client'

// React
import { useEffect, useMemo, useState } from 'react'

// Local
import { IconData, TotalCount } from '@/@types'
import { LoadingSpinner, Tooltip } from '@/components'
import { MdInfoOutline, MdSearch } from 'react-icons/md'
import Link from 'next/link'
import { formatDatetime, updateQuery } from '@/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CreateIconButton } from '../form-button/create-button'
import { useFetch } from '@/utils/hooks'
import { ICONS_URL } from '@/services'

export function IconsTable(props: { queryParams: { [key: string]: string } }) {
  const { push } = useRouter()
  const [inputSearch, setInputSearch] = useState('')

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

  const {
    data: icons,
    error,
    isLoading,
    revalidate,
  } = useFetch<TotalCount<IconData>>(ICONS_URL, { item, search, total })

  useEffect(() => {
    revalidate()
  }, [item, revalidate, search, total])

  useEffect(() => {
    if (error) {
      const listError = new Error((error as { message: string }).message)
      alert(listError.message)
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
                props.queryParams,
                ['search'],
                [inputSearch],
              )
              push(`icons?${currentQuery}`)
            }}
            className="p-1 w-7 h-7 rounded-full hover:bg-zinc-500 hover:bg-opacity-30 transition-colors focus:bg-zinc-500 focus:bg-opacity-30 outline-none"
          >
            <MdSearch className="w-5 h-5" />
          </button>
        </div>
        <CreateIconButton revalidate={revalidate} />
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
                Criado em
              </th>
              <th align="center" className="py-3 px-3">
                Última atualização em
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
            {icons?.results.map((row) => (
              <tr key={row.id}>
                <td align="center" className="py-3">
                  <Tooltip title="detalhes" position="rigth">
                    <Link href={`icons/details/${row.id}`} tabIndex={-1}>
                      <button className="text-2xl p-2 text-blue-500 focus:bg-blue-500 focus:bg-opacity-10 hover:bg-blue-500 hover:bg-opacity-10 rounded-full outline-none">
                        <MdInfoOutline />
                      </button>
                    </Link>
                  </Tooltip>
                </td>
                <td align="center" className="py-3">
                  <Image
                    alt={row.name}
                    src={row.icon}
                    width={50}
                    height={50}
                    className="max-w-[50px] max-h-[50px] w-full h-full"
                  />
                </td>
                <td align="center" className="py-3">
                  {row.name}
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
              </tr>
            ))}
          </tbody>

          {((icons?.count === 0 && !isLoading) ||
            (icons && icons?.count > 10)) && (
            <tfoot>
              {icons.count === 0 && !isLoading && (
                <tr>
                  <td className="py-3">
                    <span className="text-zinc-700 dark:text-zinc-200 px-2">
                      Nenhum registro encontrado
                    </span>
                  </td>
                </tr>
              )}
              {icons && icons.count > 10 && (
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
                          push(`icons?${currentQuery}`)
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
