import { Metadata } from 'next'
import { WorkFieldsTable } from '@/components/pages/ombudsman'

export const metadata: Metadata = {
  title: 'Ramos de Atividades · Ouvidoria · TickDoc',
  description:
    'Página de ramos de atividades cadastrados no sistema TickDoc para gerenciamento dos clientes',
}

export default function WorkFields({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Ramos de Atividades</h2>

      <WorkFieldsTable queryParams={searchParams} />
    </main>
  )
}
