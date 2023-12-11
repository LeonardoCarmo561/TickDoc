import { DetailsPage } from '@/@types/params'
import { LoadSectorData } from '@/components/pages/ombudsman/sectors/load-data'

export default function SectorDetailsPage({ params }: { params: DetailsPage }) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadSectorData sectorId={params.id} />
    </main>
  )
}
