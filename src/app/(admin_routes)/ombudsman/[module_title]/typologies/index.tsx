export default function TypologiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  return (
    <main className="p-2 flex flex-col overflow-auto">
      <h2 className="text-xl">Assuntos</h2>

      <TypologiesTable queryParams={searchParams} />
    </main>
  )
}
