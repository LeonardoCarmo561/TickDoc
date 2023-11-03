import Link from 'next/link'
import { ReactNode } from 'react'

interface ItemLinkProps {
  href: string
  label: string
  icon: ReactNode
}

export function ItemLink(props: ItemLinkProps) {
  return (
    <Link
      href={props.href}
      className="transition-all flex w-full h-12 rounded-xl hover:bg-opacity-30 outline-none focus:bg-opacity-30 focus:bg-blue-500 hover:bg-blue-500"
    >
      <div className="flex items-center gap-2 p-2">
        <span className="text-2xl">{props.icon}</span>
        <span className="text-lg">{props.label}</span>
      </div>
    </Link>
  )
}
