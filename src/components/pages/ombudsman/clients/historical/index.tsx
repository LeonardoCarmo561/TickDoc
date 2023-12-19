// React
import { useEffect } from 'react'

// Others
import { MdRestore } from 'react-icons/md'

// Local
import { LoadingSpinner, Accordion } from '@/components'
import { HistoricalData } from '@/@types'
import { formatDatetime } from '@/utils'
import { useFetch } from '@/utils/hooks'

export function HistoricalClient(props: {
  clientId: number
  revalidate: boolean
  onRevalidate: () => void
}) {
  const { data, error, isLoading, revalidate } = useFetch<HistoricalData[]>(
    `/V1/institutions/${props.clientId}/historical/`,
    {},
    props.onRevalidate,
  )

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  useEffect(() => {
    revalidate()
  }, [revalidate, props.revalidate])

  return (
    <Accordion
      title={
        <div className="flex gap-1 items-center">
          <MdRestore className="w-8 h-8 sm:w-10 sm:h-10" />
          <h3 className="text-lg font-semibold">Histórico</h3>
          {isLoading && <LoadingSpinner height="h-6" width="w-6" />}
        </div>
      }
    >
      <div className="flex w-full flex-col divide-y divide-zinc-500">
        {data &&
          data.map((historical, index) => (
            <div className="flex flex-col gap-1 p-2" key={index}>
              <span>Campo &ldquo;{historical.field}&ldquo; Alterado</span>
              <span>Valor anterior: {JSON.stringify(historical.old)}</span>
              <span>Valor atual: {JSON.stringify(historical.new)}</span>
              <span>Alterado por: {historical.user}</span>
              <span>
                Data da alteração:{' '}
                {historical.date
                  ? formatDatetime(historical.date)
                  : 'Não definido'}
              </span>
            </div>
          ))}
      </div>
    </Accordion>
  )
}
