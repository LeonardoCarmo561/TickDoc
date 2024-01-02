'use client'
import { ModuleData } from '@/@types'
import { LoadingScreen } from '@/components'
import { useAuthContext } from '@/utils/hooks'
import { usePathname } from 'next/navigation'
import { ReactNode, createContext, useLayoutEffect, useState } from 'react'

export const ModuleContext = createContext({} as ModuleData | undefined)

export function ModuleProvider({
  children,
  moduleTitle,
}: {
  children: ReactNode
  moduleTitle: string
}) {
  const { user } = useAuthContext()
  const pathName = usePathname()
  const [module, setModule] = useState<ModuleData>()

  useLayoutEffect(() => {
    const moduleType = pathName.split('/')[1]
    const findModule = user?.modules.find(
      (mdl) => mdl.type === moduleType && mdl.title === moduleTitle,
    )
    setModule(findModule)
  }, [moduleTitle, pathName, user])

  return module ? (
    <ModuleContext.Provider value={module}>{children}</ModuleContext.Provider>
  ) : (
    <LoadingScreen />
  )
}
