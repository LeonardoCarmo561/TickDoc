import { Form } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'

export function SelectModules(props: {
  onChange: (e: unknown) => void
  value: string[]
}) {
  const options = useMemo(() => {
    return [
      {
        label: 'Ouvidoria',
        value: 'ombudsman',
      },
      {
        label: 'Com. Interna',
        value: 'ci',
      },
    ]
  }, [])
  const [search, setSearch] = useState('')
  const [selectedLabel, setSelectedLabel] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (props.value.length > 0) {
      const selectedModules = options.filter((opt) =>
        props.value.includes(opt.value),
      )

      setSelectedLabel(() => {
        let label = ''
        selectedModules.map((mdl) =>
          label.length > 0
            ? (label = `${label}, ${mdl.label}`)
            : (label = mdl.label),
        )

        return label
      })
    } else {
      setSelectedLabel('Selecione os módulos')
    }
  }, [props.value, options])

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
          {isOpen ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>

      <ul
        className={`${
          isOpen ? 'block' : 'hidden'
        } max-h-56 z-10 overflow-auto border border-zinc-500 absolute w-full rounded-xl mt-2 bg-zinc-300 dark:bg-zinc-900 divide-y divide-zinc-500`}
      >
        {options?.map((option) => (
          <li
            key={option.value}
            className="w-full relative h-10 flex items-center justify-between"
          >
            <input
              type="checkbox"
              value={option.value}
              checked={props.value.includes(option.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  if (props.value.includes(option.value)) {
                    props.onChange([
                      ...props.value.filter((opt) => opt !== option.value),
                    ])
                  } else {
                    props.onChange([...props.value, option.value])
                  }
                }
              }}
              className="[all:unset] [inset:0] [position:absolute] [cursor:pointer] peer/check hover:bg-blue-500 hover:bg-opacity-25 focus:bg-blue-500 focus:bg-opacity-25"
            />
            <span className="px-2 w-full h-full items-center flex peer-checked/check:bg-blue-500 peer-checked/check:bg-opacity-50">
              {option.value}
            </span>
            {props.value.includes(option.value) && (
              <MdCheck className="absolute right-2" />
            )}
          </li>
        ))}
      </ul>
      <Form.ErrorMessage field="work_field" />
    </div>
  )
}
