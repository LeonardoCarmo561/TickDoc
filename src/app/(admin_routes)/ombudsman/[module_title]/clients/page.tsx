import { Metadata } from 'next'
import { ClientsTable } from '@/components/pages/ombudsman'

export const metadata: Metadata = {
  title: 'Clientes · Ouvidoria · TickDoc',
  description: 'Página de clientes cadastrados no sistema TickDoc',
}

export default function OmbudsmanClients({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] }
}) {
  console.log(searchParams)
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Clientes</h2>

      <ClientsTable queryParams={searchParams} />
    </main>
  )
}
