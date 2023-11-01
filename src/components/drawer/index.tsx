'use client'

import Link from 'next/link'
import { ReactNode, useState } from 'react'

export function Drawer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex w-screen h-screen box-border">
      <nav
        className={`h-screen w-56 sm:left-0 transition-all absolute sm:relative box-border ${
          isOpen ? 'left-0' : 'left-[-225px]'
        }`}
      >
        <button onClick={() => setIsOpen((oldValue) => !oldValue)}>
          Toggle
        </button>
        <ul className="flex flex-col gap-1 p-2">
          <Link
            href="/"
            className="transition-all w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
          <Link
            href="/"
            className="w-full h-12 rounded-xl focus:bg-zinc-400 focus:outline-none hover:bg-zinc-400"
          >
            <div className="">
              <span>Opa</span>
            </div>
          </Link>
        </ul>
      </nav>
      {children}
    </div>
  )
}
