import { ReactNode } from 'react'
import { MdLogout, MdPersonOutline } from 'react-icons/md'

import { ItemLink } from './item-link'
import Image from 'next/image'
import Link from 'next/link'
import { LogoutButton } from '../logout-button'
import { DrawerOption, UserData } from '@/@types'
import { ToggleThemeSwitch } from '../toggle-theme-switch'

export function Drawer({
  children,
  options,
  user,
}: {
  children: ReactNode
  options: DrawerOption[]
  user: UserData | null
}) {
  return (
    <div className="flex flex-1 divide-none divide-black sm:divide-x-[1px] dark:divide-white sm:gap-2">
      <nav
        id="drawer-area"
        className="h-screen inset-0 overflow-hidden sm:w-56 sm:left-0 hidden sm:block bg-black sm:bg-transparent bg-opacity-0 transition-all absolute sm:relative box-border"
      >
        <div
          className="flex divide-y-[1px] divide-black dark:divide-white absolute flex-col w-56 bg-white dark:bg-zinc-900 h-screen box-border transition-all overflow-auto"
          id="nav-area"
        >
          <div className="flex h-52 flex-col items-center gap-[2px]">
            <span className="text-black dark:text-white">online: 0</span>
            <Link href={`/profile`}>
              {user?.profilePicture ? (
                <Image
                  alt="Profile Picture"
                  priority
                  src={user.profilePicture}
                  width={96}
                  height={96}
                />
              ) : (
                <div
                  tabIndex={0}
                  role="button"
                  title="Editar perfil"
                  className="w-24 h-24 focus:outline-1 hover:border-blue-400 focus:border-blue-400 focus:outline-blue-400 flex items-center justify-center text-[80px] dark:border-white border-black border-2 text-white bg-gray-400 rounded-full"
                >
                  <MdPersonOutline />
                </div>
              )}
            </Link>
            <span className="text-ellipsis flex-nowrap text-black dark:text-white">
              {user?.username}
            </span>
            <span className="text-black dark:text-white">
              {user?.modules[0].profile === 0
                ? 'Administrador'
                : user?.modules[0].profile === 1
                ? 'Auxiliar'
                : 'Ouvidor'}
            </span>
            <ToggleThemeSwitch />
          </div>
          <div className="flex flex-1 flex-col overflow-auto p-1 gap-1">
            {options.map((option, index) => (
              <ItemLink
                key={index}
                href={option.href}
                icon={<option.icon />}
                label={option.label}
              />
            ))}
          </div>
          <div className="flex box-border p-1">
            <LogoutButton className="text-black dark:text-white transition-all flex w-full h-12 rounded-xl hover:bg-opacity-30 outline-none focus:bg-opacity-30 focus:bg-blue-500 hover:bg-blue-500">
              <div className="flex items-center gap-2 p-2">
                <span className="text-2xl">
                  <MdLogout />
                </span>
                <span className="text-lg">Sair</span>
              </div>
            </LogoutButton>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden flex-col px-2 sm:px-0">
        {children}
      </div>
    </div>
  )
}
