// React
import { useEffect, useState } from 'react'

// Others
import { MdRestore } from 'react-icons/md'

// Local
import { LoadingSpinner, Accordion } from '@/components'
import { getClientHistorical } from '@/services'
import { HistoricalData } from '@/@types'
import { formatDatetime } from '@/utils'

export function HistoricalClient(props: { clientId: number }) {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    if (update) {
      getClientHistorical(props.clientId)
        .then((res) => {
          if (res instanceof Error) {
            alert(`Histórico: ${res.message}`)
          } else {
            setHistoricalData(res)
          }
        })
        .finally(() => {
          setIsLoading(false)
          setUpdate(false)
        })
    }
  }, [props.clientId, update])

  return (
    <Accordion
      title={
        <div className="flex gap-1 items-center">
          <MdRestore className="w-8 h-8 sm:w-10 sm:h-10" />
          <h3 className="text-lg font-semibold">Histórico {props.clientId}</h3>
          {isLoading && <LoadingSpinner height="h-6" width="w-6" />}
        </div>
      }
    >
      <div className="flex w-full flex-col divide-y divide-zinc-500">
        {historicalData.map((historical, index) => (
          <div className="flex flex-col gap-1 p-2" key={index}>
            <span>Campo &ldquo;{historical.field}&ldquo; Alterado</span>
            <span>Valor anterior: {JSON.stringify(historical.old)}</span>
            <span>Valor atual: {JSON.stringify(historical.new)}</span>
            <span>Alterado por: {historical.user}</span>
            <span>Data da alteração: {formatDatetime(historical.date)}</span>
          </div>
        ))}
      </div>
    </Accordion>
  )
}
