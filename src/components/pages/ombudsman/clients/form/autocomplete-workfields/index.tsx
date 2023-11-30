import { WorkFieldData } from '@/@types'
import { Form } from '@/components'
import { getAllWorkFields } from '@/services'
import { useDebounce } from '@/utils/hooks'
import { useEffect, useState } from 'react'

const ONE_SECOND = 1000

export function AutocompleteWorkfields(props: {
  onChange: (e: unknown) => void
  value: number
}) {
  const { debounce } = useDebounce(ONE_SECOND)
  const [workFields, setWorkFields] = useState<WorkFieldData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      getAllWorkFields('0', '999999999', search)
        .then((res) => {
          if (res instanceof Error) {
            alert('Erro ao carregar ramos de atividade')
          } else {
            setWorkFields(res.results)
          }
        })
        .finally(() => setIsLoading(false))
    })
  }, [debounce, search])

  useEffect(() => {
    if (props.value && workFields && !search) {
      setSelectedLabel(
        workFields.find((workField) => workField.id === props.value)?.name ||
          '',
      )
    }
  }, [workFields, search, props.value])

  return (
    <div
      className="relative w-full group"
      onFocusCapture={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <label htmlFor="work-field-input" className="z-10">
        Ramo de Atividade
      </label>
      <input
        value={search || selectedLabel}
        placeholder="Selecione um ramo de atividade"
        id="work-field-input"
        className="w-full p-2 border border-zinc-500 rounded-xl peer bg-inherit z-10"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } max-h-56 z-10 overflow-auto absolute w-full rounded-xl mt-2 bg-zinc-300 dark:bg-zinc-900 divide-y divide-zinc-500`}
      >
        {isLoading && (
          <div className="w-full relative h-10 items-center flex">
            <span className="px-2 w-full">Carregando...</span>
          </div>
        )}

        {workFields.length === 0 && !isLoading && (
          <div className="w-full relative h-10 items-center flex">
            <span className="px-2 w-full">Nenhuma opção encontrada</span>
          </div>
        )}

        {workFields.map((option) => (
          <div
            key={option.id}
            className="w-full relative h-10 flex items-center"
          >
            <input
              type="checkbox"
              value={option.id}
              checked={props.value === option.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedLabel(option.name)
                  props.onChange(option.id)
                }
              }}
              className="[all:unset] [inset:0] [position:absolute] [cursor:pointer] peer/check focus:bg-blue-500 focus:bg-opacity-25"
            />
            <span className="px-2 w-full h-full items-center flex peer-checked/check:bg-blue-500 peer-checked/check:bg-opacity-50">
              {option.name}
            </span>
          </div>
        ))}
      </div>
      <Form.ErrorMessage field="work_field" />
    </div>
  )
}
