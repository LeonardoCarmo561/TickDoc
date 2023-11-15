'use client'
import { Tooltip } from '@/components/tooltip'
import Link from 'next/link'
import { MdAdd, MdInfoOutline, MdSearch } from 'react-icons/md'

export default function CustomerServiceClients() {
  return (
    <main className="p-2">
      <h2 className="text-xl">Clientes</h2>
      <div
        id="toolbar"
        className="w-full p-2 mt-2 flex items-center justify-between rounded-xl border border-blue-500 bg-zinc-50 dark:bg-zinc-900"
      >
        <div className="flex gap-1 items-center">
          <input
            type="search"
            className="rounded-xl p-2 bg-inherit border border-zinc-500"
            placeholder="Pesquisar..."
          />
          <Tooltip title="pesquisar">
            <button
              type="button"
              className="text-2xl p-1 rounded-full focus:bg-black focus:bg-opacity-10 hover:bg-black hover:bg-opacity-10 transition-colors outline-none"
              tabIndex={0}
              onClick={() => console.log('clicou')}
            >
              <MdSearch />
            </button>
          </Tooltip>
        </div>
        <button className="text-xs flex gap-1 items-center justify-between p-2 bg-blue-500 text-white font-bold rounded-xl hover:shadow-xl transition-all">
          <span className="text-xl">
            <MdAdd />
          </span>
          NOVO
        </button>
      </div>

      <div
        id="table-container"
        className="w-full rounded-xl border border-blue-500 mt-2 overflow-auto flex-wrap bg-zinc-50 dark:bg-zinc-900"
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
            <tr>
              <td align="center" className="py-3">
                <Tooltip title="detalhes">
                  <Link href="details/1" tabIndex={-1}>
                    <button className="text-2xl p-2 text-blue-500 focus:bg-blue-500 focus:bg-opacity-10 hover:bg-blue-500 hover:bg-opacity-10 rounded-full outline-none">
                      <MdInfoOutline />
                    </button>
                  </Link>
                </Tooltip>
              </td>
              <td align="center" className="py-3">
                Assembleia Legislativa do Estado do Ceará
              </td>
              <td align="center" className="py-3">
                Não possui CI
              </td>
              <td align="center" className="py-3">
                Não possui ouvidoria
              </td>
              <td align="center" className="py-3">
                <span className="bg-red-300 text-xs font-semibold text-black w-full rounded-xl p-1 px-2">
                  Inativo
                </span>
              </td>
            </tr>
            <tr>
              <td align="center" className="py-3">
                <Tooltip title="detalhes">
                  <Link href="details/1" tabIndex={-1}>
                    <button className="text-2xl p-2 text-blue-500 focus:bg-blue-500 focus:bg-opacity-10 hover:bg-blue-500 hover:bg-opacity-10 rounded-full outline-none">
                      <MdInfoOutline />
                    </button>
                  </Link>
                </Tooltip>
              </td>
              <td align="center" className="py-3">
                Assembleia Legislativa do Estado do Ceará
              </td>
              <td align="center" className="py-3">
                Não possui CI
              </td>
              <td align="center" className="py-3">
                Não possui ouvidoria
              </td>
              <td align="center" className="py-3">
                <span className="bg-green-300 text-xs font-semibold text-black w-full rounded-xl p-1 px-2">
                  Ativo
                </span>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={5}>
                <caption>Nenhum registro encontrado</caption>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  )
}
