import { ReactNode } from 'react'
import { MdDashboard, MdLogout, MdPersonOutline } from 'react-icons/md'

import { ItemLink } from './item-link'
import Image from 'next/image'
import Link from 'next/link'

export function Drawer({
  children,
  profilePicture,
}: {
  children: ReactNode
  profilePicture?: string
}) {
  return (
    <div className="flex w-screen h-screen box-border">
      <nav
        id="drawer-area"
        className="h-screen w-screen overflow-hidden sm:w-56 sm:left-0 hidden sm:block bg-black sm:bg-transparent bg-opacity-0 transition-all absolute sm:relative box-border"
      >
        <div
          className="flex divide-y-[1px] absolute flex-col w-56 bg-white h-screen box-border transition-all overflow-auto"
          id="nav-area"
        >
          <div className="flex h-52 flex-col items-center gap-1">
            <span>online: 0</span>
            <Link href={`/profile`}>
              {profilePicture ? (
                <Image
                  alt="Profile Picture"
                  src={profilePicture}
                  width={96}
                  height={96}
                />
              ) : (
                <div
                  tabIndex={0}
                  role="button"
                  title="Editar perfil"
                  className="w-24 h-24 focus:outline-1 hover:border-blue-400 focus:border-blue-400 focus:outline-blue-400 flex items-center justify-center text-[80px] border-black border-2 text-white bg-gray-400 rounded-full"
                >
                  <MdPersonOutline />
                </div>
              )}
            </Link>
          </div>
          <div className="flex flex-1 flex-col overflow-auto p-1 gap-1">
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
            <ItemLink href="/" icon={<MdDashboard />} label="Dashboard" />
          </div>
          <div className="flex box-border p-1">
            <button className="transition-all flex w-full h-12 rounded-xl hover:bg-opacity-30 outline-none focus:bg-opacity-30 focus:bg-blue-500 hover:bg-blue-500">
              <div className="flex items-center gap-2 p-2">
                <span className="text-2xl">
                  <MdLogout />
                </span>
                <span className="text-lg">Sair</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
