'use client'

import { Environment } from '@/utils'
import { useModuleContext } from '@/utils/hooks'
import Image from 'next/image'
import Link from 'next/link'

export function ModuleLogo() {
  const currentModule = useModuleContext()

  if (currentModule !== undefined)
    return (
      <Link href={`/${currentModule.type}/${currentModule.title}/dashboard`}>
        <Image
          width={300}
          height={150}
          alt={currentModule.title}
          src={
            Environment.NODE_ENV === 'development'
              ? `${Environment.URL_BASE}${currentModule.logo}`
              : currentModule.logo
          }
          className="sm:w-80 w-48"
          priority
        />
      </Link>
    )

  return null
}
