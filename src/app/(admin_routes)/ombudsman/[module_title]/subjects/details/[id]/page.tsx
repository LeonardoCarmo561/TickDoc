import { DetailsPage } from '@/@types/params'
import { LoadSubjectData } from '@/components/pages/ombudsman/subjects/load-data'

export default function SubjectDetailsPage(props: { params: DetailsPage }) {
  return (
    <main className="flex flex-col gap-2 p-2 overflow-auto">
      <LoadSubjectData
        subjectId={props.params.id}
        moduleTitle={props.params.module_title}
      />
    </main>
  )
}
