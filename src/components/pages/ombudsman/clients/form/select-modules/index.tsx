'use client'

import { Form } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'

export function SelectModules(props: {
  value: string[]
  onChange: (e: unknown) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [label, setLabel] = useState('')
  const options = useMemo(() => {
    return [
      {
        value: 'ci',
        label: 'Com. Interna',
      },
      {
        value: 'ombudsman',
        label: 'Ouvidoria',
      },
    ]
  }, [])

  useEffect(() => {
    if (props.value) {
      setLabel(() => {
        const selectedOptions = options.filter((value) =>
          props.value.includes(value.value),
        )

        return selectedOptions.map((opt) => opt.label).join(', ')
      })
    }
  }, [props.value, options])

  return (
    <div
      className="relative w-full group focus:outline"
      onFocusCapture={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <label htmlFor="modules">Módulos</label>
      <div
        tabIndex={0}
        className="flex flex-1 items-center p-2 gap-2 justify-between border relative border-zinc-500 rounded-xl"
      >
        <span
          placeholder="Selecione os módulos"
          id="modules"
          className="w-full peer bg-inherit outline-none"
          onFocus={(e) => {
            ;(e.target as HTMLInputElement).select()
          }}
        >
          {label || 'Selecione os módulos'}
        </span>
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
        } max-h-56 overflow-auto border border-zinc-500 absolute w-full rounded-xl mt-2 bg-zinc-300 dark:bg-zinc-900 divide-y divide-zinc-500`}
      >
        {options.map((opt) => (
          <li
            key={opt.value}
            role="option"
            aria-selected={props.value.includes(opt.value)}
            className="w-full relative h-10 flex items-center list-none"
          >
            <input
              type="checkbox"
              value={opt.value}
              checked={props.value.includes(opt.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  if (props.value.length > 0) {
                    props.onChange([...props.value, opt.value])
                  } else {
                    props.onChange([props.value])
                  }
                } else {
                  props.onChange(
                    props.value.filter((value) => value !== opt.value),
                  )
                }
              }}
              className="[all:unset] [inset:0] [position:absolute] [cursor:pointer] peer/check hover:bg-blue-500 hover:bg-opacity-25 focus:bg-blue-500 focus:bg-opacity-25"
            />
            <span className="px-2 w-full h-full items-center flex peer-checked/check:bg-blue-500 peer-checked/check:bg-opacity-50">
              {opt.label}
            </span>
            {props.value.includes(opt.value) && (
              <MdCheck className="absolute right-2" />
            )}
          </li>
        ))}
      </ul>
      <Form.ErrorMessage field="modules" />
    </div>
  )
}
