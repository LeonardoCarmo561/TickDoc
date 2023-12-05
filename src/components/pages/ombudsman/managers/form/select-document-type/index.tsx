import { Form } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'

export function SelectDocumentType(props: {
  onChange: (e: unknown) => void
  value: number
}) {
  const options = useMemo(() => {
    return [
      {
        value: 1,
        label: 'CPF',
      },
      {
        value: 2,
        label: 'CNPJ',
      },
    ]
  }, [])

  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (props.value && !search) {
      setSelectedLabel(
        options.find((opt) => opt.value === props.value)?.label || '',
      )
    }
  }, [options, props.value, search])
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
      <label htmlFor="document_type-input" className="z-10">
        Tipo *
      </label>
      <div className="flex flex-1 items-center p-2 gap-2 justify-between border relative border-zinc-500 rounded-l-xl">
        <input
          value={search || selectedLabel}
          placeholder="Selecione um ramo de atividade"
          id="document_type-input"
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
          {isOpen ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>

      <ul
        className={`${
          isOpen ? 'block' : 'hidden'
        } max-h-56 z-10 overflow-auto border border-zinc-500 absolute w-full rounded-xl mt-2 bg-zinc-300 dark:bg-zinc-900 divide-y divide-zinc-500`}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="w-full relative h-10 flex items-center justify-between"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={props.value === option.value}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedLabel(option.label)
                  props.onChange(option.value)
                  setIsOpen(false)
                }
              }}
              className="[all:unset] [inset:0] [position:absolute] [cursor:pointer] peer/check hover:bg-blue-500 hover:bg-opacity-25 focus:bg-blue-500 focus:bg-opacity-25"
            />
            <span className="px-2 w-full h-full items-center flex peer-checked/check:bg-blue-500 peer-checked/check:bg-opacity-50">
              {option.label}
            </span>
            {option.value === props.value && (
              <MdCheck className="absolute right-2" />
            )}
          </li>
        ))}
      </ul>
      <Form.ErrorMessage field="document_type" />
    </div>
  )
}
