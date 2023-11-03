'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface ItemLinkProps {
  href: string
  label: string
  icon: ReactNode
}

export function ItemLink(props: ItemLinkProps) {
  const pathName = usePathname()

  const selected = pathName.includes(props.href)

  return (
    <Link
      href={props.href}
      className={`text-zinc-600 ${
        selected && 'bg-blue-500'
      } dark:text-white transition-all flex w-full bg-opacity-50 dark:bg-opacity-50 h-12 rounded-xl hover:bg-opacity-30 outline-none dark:focus:bg-opacity-30 dark:hover:bg-opacity-30 focus:bg-opacity-30 focus:bg-blue-500 hover:bg-blue-500`}
    >
      <div className="flex items-center gap-2 p-2">
        <span className="text-2xl">{props.icon}</span>
        <span className="text-lg">{props.label}</span>
      </div>
    </Link>
  )
}
