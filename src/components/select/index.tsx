'use client'

import { ReactNode, useState } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'
import { SelectProps } from '@/@types'

export function Select({ closeOnChange = true, ...props }: SelectProps) {
  const [label, setLabel] = useState<string>()
  const [value, setValue] = useState<string | number | string[]>()
  const [selectedIcon, setSelectedIcon] = useState<ReactNode>()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      id="select-box"
      className="z-10 border bg-inherit relative border-zinc-500 w-full py-2 flex items-center justify-between rounded-xl"
    >
      <input
        name={props.name}
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
        className={`bg-inherit group/ul peer/ul shadow-xl z-20 border border-zinc-500 rounded-xl w-full divide-y top-full mt-2 bg-white dark:bg-zinc-950 absolute ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {props.options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              if (
                props.multiple &&
                !(value as string[]).includes(option.value as string)
              ) {
                setValue((oldValue) => [
                  ...(oldValue as string[]),
                  String(option.value),
                ])
                setLabel((oldValue) =>
                  oldValue
                    ? `${oldValue}, ${option.value}`
                    : String(option.value),
                )
              } else if (value !== option.value) {
                setLabel(option.label)
                setSelectedIcon(() => option.icon)
                setValue(option.value)
                if (closeOnChange) {
                  setIsOpen(false)
                }
              }
            }}
            value={option.value}
            role="option"
            aria-selected={
              props.multiple
                ? (value as string[]).includes(option.value as string)
                : (value as string | number) ===
                  (option.value as string | number)
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
