'use client'
import { SelectProps } from '@/@types'
import { useEffect, useState } from 'react'

export function Select(props: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<string | number>()
  const [optionLabel, setOptionLabel] = useState<string>()

  useEffect(() => {
    window.addEventListener('click', function (e) {
      const element = e.target as HTMLElement
      if (element.getAttribute('data-type') === 'option') {
        setValue(element.getAttribute('data-value') || undefined)
        setOptionLabel(element.getAttribute('aria-label') || undefined)
      }
    })
  }, [])

  useEffect(() => {
    if (value) {
      props.onChange?.(value)
    }
  }, [props, value])

  return (
    <div
      tabIndex={0}
      title={props.title}
      onClick={() => setIsOpen((oldValue) => !oldValue)}
      className="w-full flex flex-col cursor-pointer relative h-10 justify-center border-2 border-blue-500 rounded-xl"
    >
      <span className="px-2 flex-nowrap text-ellipsis line-clamp-1">
        {optionLabel || props.label}
      </span>
      {isOpen && (
        <ul className="flex flex-col absolute top-full bg-white dark:bg-zinc-950 mt-2 w-full p-2 rounded-xl border-2 border-blue-500 divide-y-[1px]">
          {props.children}
        </ul>
      )}
    </div>
  )
}
