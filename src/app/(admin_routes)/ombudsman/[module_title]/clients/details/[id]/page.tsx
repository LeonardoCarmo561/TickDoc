import { DetailsPage } from '@/@types/params'
import { LoadData } from '@/components/pages/ombudsman'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalhes · Clientes · Ouvidoria · TickDoc',
  description: 'Página de detalhes do cliente cadastrado no sistema TickDoc',
}

export default function ClientDetailsPage({ params }: { params: DetailsPage }) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadData clientId={params.id} />
    </main>
  )
}
