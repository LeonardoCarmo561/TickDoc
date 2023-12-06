import { IconsTable } from '@/components/pages/ombudsman/icons'

export default function IconsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Ícones</h2>

      <IconsTable queryParams={searchParams} />
    </main>
  )
}
