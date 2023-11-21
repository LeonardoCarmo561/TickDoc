'use client'

import { ReactNode, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'
import { SelectFormProps } from '@/@types'
import { useFormContext } from 'react-hook-form'

export function Select({ closeOnChange = true, ...props }: SelectFormProps) {
  const [label, setLabel] = useState<string>()
  const [value, setValue] = useState<string | number | string[]>()
  const [selectedIcon, setSelectedIcon] = useState<ReactNode>()
  const [isOpen, setIsOpen] = useState(false)

  const { register } = useFormContext()

  return (
    <div
      id="select-box"
      className="z-10 border bg-inherit relative border-zinc-500 w-full py-2 flex items-center justify-between rounded-xl"
    >
      <input
        id={props.name}
        {...register(props.name)}
        value={value}
        checked={isOpen}
        onChange={() => setIsOpen((oldValue) => !oldValue)}
        type="checkbox"
        tabIndex={0}
        className="[all:unset] [inset:0] [position:absolute] focus:rounded-xl z-20 [cursor:pointer] focus:outline focus:outline-blue-500"
      />
      <div className="flex px-2 items-center gap-2">
        {!props.multiple && selectedIcon}
        <span className="line-clamp-1 text-ellipsis">
          {label || 'Selecione um módulo'}
        </span>
      </div>
      <span className="px-2">
        {isOpen ? <MdExpandLess /> : <MdExpandMore />}
      </span>

      <ul
        className={`bg-inherit group/ul peer/ul shadow-xl z-20 border border-zinc-500 rounded-xl w-full top-full mt-2 bg-white dark:bg-zinc-950 absolute ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {props.options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              if (props.multiple) {
                if (value) {
                  if (!(value as string[]).includes(String(option.value))) {
                    if ((value as string[]).length > 0) {
                      setValue((oldValue) => [
                        ...(oldValue as string[]),
                        String(option.value),
                      ])
                      setLabel((oldLabel) => `${oldLabel}, ${option.label}`)
                    } else {
                      setValue([String(option.value)])
                      setLabel(() => `${option.label}`)
                    }
                  } else {
                    setValue((oldValue) => [
                      ...(oldValue as string[]).filter(
                        (opt) => opt !== String(option.value),
                      ),
                    ])
                    setLabel((oldLabel) => {
                      const splitedLabel = oldLabel?.split(', ')
                      const labels = splitedLabel?.filter(
                        (lbl) => lbl !== option.label,
                      )
                      if (labels?.length === 0) return ''
                      return labels?.toString()
                    })
                  }
                } else {
                  setValue(() => [String(option.value)])
                  setLabel(option.label)
                }
                if (closeOnChange) setIsOpen(false)
              } else {
                if (value !== option.value) {
                  setValue(option.value)
                  setLabel(option.label)
                  setSelectedIcon(option.icon)
                  if (closeOnChange) {
                    setIsOpen(false)
                  }
                }
              }
            }}
            value={option.value}
            role="option"
            aria-selected={
              props.multiple && value
                ? (value as string[]).includes(String(option.value))
                : value === option.value
            }
            tabIndex={0}
            className="p-2 group/li cursor-pointer flex justify-between items-center aria-selected:bg-blue-500 aria-selected:bg-opacity-30 aria-selected:text-black aria-selected:dark:text-white hover:bg-blue-500 hover:text-white rounded-xl m-1"
          >
            <div className="flex items-center gap-2 line-clamp-1 text-ellipsis">
              {option.icon}
              <span className="font-semibold">{option.label}</span>
            </div>
            <span className="hidden group-aria-selected/li:block">
              <MdCheck />
            </span>
          </li>
        ))}
      </ul>
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          aria-hidden
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
