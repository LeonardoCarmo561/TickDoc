import { TotalCount, WorkFieldData } from '@/@types'
import { Form } from '@/components'
import { LoadingSpinner } from '@/components/loading-spinner'
import { WORKFIELDS_URL } from '@/services'
import { useDebounce, useFetch } from '@/utils/hooks'
import { useEffect, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'

const ONE_SECOND = 1000

export function AutocompleteWorkfields(props: {
  onChange: (e: unknown) => void
  value: number
}) {
  const { debounce } = useDebounce(ONE_SECOND)
  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const {
    data: workFields,
    error,
    isLoading,
    revalidate,
  } = useFetch<TotalCount<WorkFieldData>>(WORKFIELDS_URL, {
    item: '0',
    total: '999999999',
    search,
  })

  useEffect(() => {
    revalidate()
  }, [debounce, revalidate, search])

  useEffect(() => {
    if (error) {
      alert('Erro ao carregar ramos de atividade')
    }
  }, [error])

  useEffect(() => {
    if (props.value && workFields && !search) {
      setSelectedLabel(
        workFields.results.find((workField) => workField.id === props.value)
          ?.name || '',
      )
    }
  }, [workFields, search, props.value])

  return (
    <div
      className="relative w-full group focus:outline"
      onFocusCapture={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
          setSearch('')
        }
      }}
    >
      <label htmlFor="work-field-input" className="z-10">
        Ramo de Atividade
      </label>
      <div className="flex flex-1 items-center p-2 gap-2 justify-between border relative border-zinc-500 rounded-xl">
        <input
          value={search || selectedLabel}
          placeholder={
            isLoading ? 'Carregando...' : 'Selecione um ramo de atividade'
          }
          id="work-field-input"
          className="w-full peer bg-inherit z-10 outline-none"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => {
            ;(e.target as HTMLInputElement).select()
          }}
        />
        <button
          type="button"
          className="flex h-6 items-center justify-center w-6 focus:outline-blue-500"
          onClick={() => setIsOpen((oldValue) => !oldValue)}
        >
          {isLoading ? (
            <LoadingSpinner height="h-5" width="w-5" />
          ) : isOpen ? (
            <MdExpandLess />
          ) : (
            <MdExpandMore />
          )}
        </button>
      </div>

      <ul
        className={`${
          isOpen ? 'block' : 'hidden'
        } max-h-56 z-10 overflow-auto border border-zinc-500 absolute w-full rounded-xl mt-2 bg-zinc-300 dark:bg-zinc-900 divide-y divide-zinc-500`}
      >
        {isLoading && (
          <div className="w-full relative h-10 items-center flex">
            <span className="px-2 w-full">Carregando...</span>
          </div>
        )}

        {workFields?.count === 0 && !isLoading && (
          <div className="w-full relative h-10 items-center flex">
            <span className="px-2 w-full">Nenhuma opção encontrada</span>
          </div>
        )}

        {workFields?.results.map((option) => (
          <li
            key={option.id}
            className="w-full relative h-10 flex items-center justify-between"
          >
            <input
              type="checkbox"
              value={option.id}
              checked={props.value === option.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedLabel(option.name)
                  props.onChange(option.id)
                  setIsOpen(false)
                }
              }}
              className="[all:unset] [inset:0] [position:absolute] [cursor:pointer] peer/check hover:bg-blue-500 hover:bg-opacity-25 focus:bg-blue-500 focus:bg-opacity-25"
            />
            <span className="px-2 w-full h-full items-center flex peer-checked/check:bg-blue-500 peer-checked/check:bg-opacity-50">
              {option.name}
            </span>
            {option.id === props.value && (
              <MdCheck className="absolute right-2" />
            )}
          </li>
        ))}
      </ul>
      <Form.ErrorMessage field="work_field" />
    </div>
  )
}
