'use client'
import { LoadingScreen } from '@/components/loading-screen'
import { DrawerProvider } from '@/contexts/drawer-context'
import { ModuleProvider } from '@/contexts/module-context'
import { useAuthContext } from '@/utils/hooks'
import { ReactNode } from 'react'

export default function OmbudsmanLayout({
  children,
  params,
}: {
  children: ReactNode
  params: {
    module_title: string
  }
}) {
  const { user, logout } = useAuthContext()

  if (user && user.modules.length === 0) {
    logout()
  } else if (
    user &&
    user.modules.find(
      (module) =>
        module.type === 'ombudsman' && module.title === params.module_title,
    ) === undefined
  ) {
    alert('Sem acesso ao módulo')
    window.location.href = `/${user.modules[0].type}/${user.modules[0].title}/dashboard`
  } else
    return (
      <ModuleProvider moduleTitle={params.module_title}>
        <DrawerProvider>{children}</DrawerProvider>
      </ModuleProvider>
    )

  return <LoadingScreen />
}
