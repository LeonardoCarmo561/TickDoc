import { Metadata } from 'next'
import { ClientsTable } from '@/components/pages/customer-service/clients/table'

export const metadata: Metadata = {
  title: 'Clientes · Ouvidoria · TickDoc',
  description: 'Página de clientes cadastrados no sistema TickDoc',
}

export default function OmbudsmanClients() {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Clientes</h2>

      <ClientsTable />

      <div className="flex flex-col h-fit">
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll</span>
        <span>Testado Scroll 2</span>
      </div>
    </main>
  )
}
