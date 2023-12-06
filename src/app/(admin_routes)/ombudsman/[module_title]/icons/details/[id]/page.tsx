import { DetailsPage } from '@/@types/params'
import { LoadIconData } from '@/components/pages/ombudsman/icons/load-data'

export default function ManagerDetailsPage({
  params,
}: {
  params: DetailsPage
}) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadIconData iconId={params.id} />
    </main>
  )
}
