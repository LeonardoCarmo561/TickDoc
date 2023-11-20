import { FormButton } from '@/components/pages/customer-service/clients/form-button'
import { Tooltip } from '@/components/tooltip'
import { MdSearch } from 'react-icons/md'
import { Metadata } from 'next'
import { ClientsTable } from '@/components/pages/customer-service/clients/table'

export const metadata: Metadata = {
  title: 'Clientes · S.A.C · TickDoc',
  description: 'Página de clientes cadastrados no sistema TickDoc',
}

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
            >
              <MdSearch />
            </button>
          </Tooltip>
        </div>
        <FormButton />
      </div>

      <ClientsTable />
    </main>
  )
}
