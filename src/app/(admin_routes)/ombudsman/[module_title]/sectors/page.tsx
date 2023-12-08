import { SectorsTable } from '@/components/pages/ombudsman/sectors'

export default function SectorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Setores</h2>

      <SectorsTable queryParams={searchParams} />
    </main>
  )
}
