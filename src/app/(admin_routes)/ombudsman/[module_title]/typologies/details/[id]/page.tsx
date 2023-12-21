import { DetailsPage } from '@/@types/params'
import { LoadTypologyData } from '@/components/pages/ombudsman/typologies/load-data'

export default function TypologyDetailsPage(props: { params: DetailsPage }) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadTypologyData typologyId={props.params.id} />
    </main>
  )
}
