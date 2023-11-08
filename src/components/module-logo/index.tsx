'use client'

import { useModuleContext } from '@/utils/hooks'
import Image from 'next/image'

export function ModuleLogo() {
  const currentModule = useModuleContext()

  if (currentModule !== undefined)
    return (
      <Image
        width={300}
        height={150}
        alt={currentModule.title}
        src={currentModule.logo}
        className="sm:w-80 w-48"
        priority
      />
    )

  return null
}
