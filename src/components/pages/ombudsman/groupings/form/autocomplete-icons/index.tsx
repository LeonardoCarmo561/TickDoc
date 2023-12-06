import { IconData } from '@/@types'
import { Form } from '@/components'
import { LoadingSpinner } from '@/components/loading-spinner'
import { getAllIcons } from '@/services'
import { useDebounce } from '@/utils/hooks'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'

const ONE_SECOND = 1000

export function AutocompleteIcons(props: {
  onChange: (e: unknown) => void
  value: number
}) {
  const { debounce } = useDebounce(ONE_SECOND)
  const [icons, setIcons] = useState<IconData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      getAllIcons('0', '999999999', search)
        .then((res) => {
          if (res instanceof Error) {
            alert('Erro ao carregar ícones')
          } else {
            setIcons(res.results)
          }
        })
        .finally(() => setIsLoading(false))
    })
  }, [debounce, search])

  useEffect(() => {
    if (props.value && icons && !search) {
      setSelectedLabel(
        icons.find((icon) => icon.id === props.value)?.name || '',
      )
    }
  }, [icons, search, props.value])

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
      <label htmlFor="icon-input" className="z-10">
        Ícone *
      </label>
      <div className="flex flex-1 items-center p-2 gap-2 justify-between border relative border-zinc-500 rounded-xl">
        <input
          value={search || selectedLabel}
          placeholder={isLoading ? 'Carregando...' : 'Selecione um ícone'}
          id="icon-input"
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

        {icons.length === 0 && !isLoading && (
          <div className="w-full relative h-10 items-center flex">
            <span className="px-2 w-full">Nenhuma opção encontrada</span>
          </div>
        )}

        {icons.map((option) => (
          <li
            key={option.id}
            className="w-full relative h-14 flex items-center justify-between"
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
            <span className="px-2 w-full h-full gap-2 items-center flex peer-checked/check:bg-blue-500 peer-checked/check:bg-opacity-50">
              <Image
                alt={option.name}
                src={option.icon}
                width={40}
                height={40}
                className="max-w-[40px] max-h-[40px] w-full h-full"
              />
              {option.name}
            </span>
            {option.id === props.value && (
              <MdCheck className="absolute right-2" />
            )}
          </li>
        ))}
      </ul>
      <Form.ErrorMessage field="icon" />
    </div>
  )
}