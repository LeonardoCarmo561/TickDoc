import { SubjectsTable } from '@/components/pages/ombudsman/subjects'

export default function SubjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Assuntos</h2>

      <SubjectsTable queryParams={searchParams} />
    </main>
  )
}
