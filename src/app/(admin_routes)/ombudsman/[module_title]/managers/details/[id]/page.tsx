import { DetailsPage } from '@/@types/params'
import { LoadManagerData } from '@/components/pages/ombudsman/managers/load-data'

export default function ManagerDetailsPage({
  params,
}: {
  params: DetailsPage
}) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadManagerData userId={params.id} />
    </main>
  )
}
