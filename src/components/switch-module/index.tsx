'use client'

import { useEffect, useState } from 'react'
import {
  MdConnectWithoutContact,
  MdExpandLess,
  MdExpandMore,
  MdMapsUgc,
  MdSupportAgent,
} from 'react-icons/md'

export function SwitchModule() {
  const [selected, setSelected] = useState<string>()
  const [value, setValue] = useState<string | number>()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      id="select-box"
      className="z-20 border bg-inherit relative focus:outline focus:outline-blue-500 border-zinc-500 w-full p-2 flex items-center justify-between rounded-xl"
    >
      <input
        name="module"
        value={value}
        checked={isOpen}
        onChange={() => setIsOpen((oldValue) => !oldValue)}
        type="checkbox"
        autoFocus
        tabIndex={0}
        onBlur={() => {
          if (isOpen) setIsOpen(false)
        }}
        className="[all:unset] [inset:0] [position:absolute] rounded-xl z-10"
      />
      <span className="line-clamp-1 text-ellipsis">
        {selected || 'Selecione um módulo'}
      </span>
      <span>{isOpen ? <MdExpandLess /> : <MdExpandMore />}</span>
    </div>
  )
}
