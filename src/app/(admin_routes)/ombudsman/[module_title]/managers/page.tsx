import { ManagersTable } from '@/components/pages/ombudsman/managers'

export default function ManagersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Administradores</h2>

      <ManagersTable queryParams={searchParams} />
    </main>
  )
}
