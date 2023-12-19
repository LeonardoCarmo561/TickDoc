import { DetailsPage } from '@/@types/params'
import { LoadGroupingData } from '@/components/pages/ombudsman/groupings/load-data'

export default function GroupingDetailsPage({
  params,
}: {
  params: DetailsPage
}) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadGroupingData groupingId={params.id} />
    </main>
  )
}
