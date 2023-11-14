'use client'

import { useAuthContext } from '@/utils/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  MdCheck,
  MdConnectWithoutContact,
  MdExpandLess,
  MdExpandMore,
  MdMapsUgc,
  MdSupportAgent,
} from 'react-icons/md'
import { Tooltip } from '../tooltip'

export function SwitchModule() {
  const pathName = usePathname()
  const router = useRouter()
  const [selected, setSelected] = useState<string>()
  const [value, setValue] = useState<string | number>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const currentPath = pathName.split('/')
    setValue(`${currentPath[1]}/${currentPath[2]}`)
    setSelected(currentPath[2])
  }, [pathName])

  const { user } = useAuthContext()

  return (
    <div
      id="select-box"
      className="z-10 border bg-inherit relative border-zinc-500 w-full py-2 flex items-center justify-between rounded-xl"
    >
      <input
        name="module"
        value={value}
        checked={isOpen}
        onChange={() => setIsOpen((oldValue) => !oldValue)}
        type="checkbox"
        tabIndex={0}
        className="[all:unset] [inset:0] [position:absolute] focus:rounded-xl [z-index:30] [cursor:pointer] focus:outline focus:outline-blue-500"
      />
      <span className="line-clamp-1 text-ellipsis px-2">
        {selected || 'Selecione um módulo'}
      </span>
      <span className="px-2">
        {isOpen ? <MdExpandLess /> : <MdExpandMore />}
      </span>

      <ul
        className={`bg-inherit group/ul peer/ul shadow-xl z-30 border border-zinc-500 rounded-xl w-full divide-y top-full mt-2 bg-white dark:bg-zinc-950 absolute ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {user?.modules.map((moduleOption, index) => (
          <Tooltip
            key={index}
            title={
              moduleOption.type === 'ci'
                ? 'Com. Interna'
                : moduleOption.type === 'customer-service'
                ? 'S.A.C'
                : moduleOption.type === 'ombudsman'
                ? 'Ouvidoria'
                : 'Tipo desconhecido'
            }
          >
            <li
              onClick={() => {
                if (value !== `${moduleOption.type}/${moduleOption.title}`) {
                  setSelected(moduleOption.title)
                  setIsOpen(false)
                  router.push(
                    `/${moduleOption.type}/${moduleOption.title}/dashboard`,
                  )
                }
              }}
              value={`${moduleOption.type}/${moduleOption.title}`}
              role="option"
              aria-selected={
                value === `${moduleOption.type}/${moduleOption.title}`
              }
              autoFocus
              tabIndex={0}
              className="p-2 group/li cursor-pointer flex justify-between items-center hover:bg-blue-500 hover:text-white rounded-xl m-1"
            >
              <div className="flex items-center gap-2 line-clamp-1 text-ellipsis">
                <span className="text-2xl">
                  {moduleOption.type === 'ci' ? (
                    <MdConnectWithoutContact />
                  ) : moduleOption.type === 'customer-service' ? (
                    <MdMapsUgc />
                  ) : moduleOption.type === 'ombudsman' ? (
                    <MdSupportAgent />
                  ) : undefined}
                </span>
                <span className="font-semibold">{moduleOption.title}</span>
              </div>
              <span className="hidden group-aria-selected/li:block">
                <MdCheck />
              </span>
            </li>
          </Tooltip>
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
