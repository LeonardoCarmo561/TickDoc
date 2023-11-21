import { Metadata } from 'next'
import { ClientsTable } from '@/components/pages/customer-service/clients/table'

export const metadata: Metadata = {
  title: 'Clientes · Ouvidoria · TickDoc',
  description: 'Página de clientes cadastrados no sistema TickDoc',
}

export default function OmbudsmanClients() {
  return (
    <main className="p-2">
      <h2 className="text-xl">Clientes</h2>

      <ClientsTable />
    </main>
  )
}
