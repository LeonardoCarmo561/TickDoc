'use client'

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
            process.env.NODE_ENV === 'development'
              ? 'https://s3.amazonaws.com/static.tickdoc.com.br/Teste/logo/Logo.png'
              : currentModule.logo
          }
          className="sm:w-80 w-48"
          priority
        />
      </Link>
    )

  return null
}
