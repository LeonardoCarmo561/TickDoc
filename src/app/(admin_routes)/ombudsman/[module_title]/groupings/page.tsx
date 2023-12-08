import { GroupingsTable } from '@/components/pages/ombudsman/groupings'

export default function GroupingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Agrupamentos</h2>

      <GroupingsTable queryParams={searchParams} />
    </main>
  )
}
